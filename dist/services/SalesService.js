'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.create = create;
exports.getSalesByUserId = getSalesByUserId;
exports.fetchSalesAll = fetchSalesAll;
exports.countSales = countSales;
exports.getAll = getAll;
const Service_1 = require('$entities/Service');
const logger_1 = __importDefault(require('$pkg/logger'));
const prisma_utils_1 = require('$utils/prisma.utils');
async function create(userId, salesData) {
  try {
    const { productId, quantity } = salesData;
    const product = await prisma_utils_1.prisma.products.findUnique({ where: { id: productId } });
    if (!product || product.stock < quantity) {
      return { status: false, message: 'Product not available or insufficient stock.' };
    }
    const totalPrice = product.price * quantity;
    const [sales] = await Promise.all([
      prisma_utils_1.prisma.sales.create({
        data: {
          productId,
          quantity,
          totalPrice,
          userId,
        },
      }),
      prisma_utils_1.prisma.products.update({
        where: { id: productId },
        data: { stock: product.stock - quantity },
      }),
    ]);
    return { status: true, data: sales };
  } catch (err) {
    logger_1.default.error(`ProductsService.createProduct : ${err}`);
    return Service_1.INTERNAL_SERVER_ERROR_SERVICE_RESPONSE;
  }
}
async function getSalesByUserId(userId) {
  try {
    const sales = await prisma_utils_1.prisma.sales.findMany({
      where: { userId },
      include: { products: true },
    });
    if (sales.length === 0) {
      return { status: false, message: 'No sales found for this user.' };
    }
    return { status: true, data: sales };
  } catch (err) {
    console.error(err);
    return { status: false, message: 'Error fetching sales.' };
  }
}
async function fetchSalesAll(filters, page, rows) {
  const offset = (page - 1) * rows;
  const sales = await prisma_utils_1.prisma.sales.findMany({
    where: filters,
    skip: offset,
    take: rows,
    include: { products: true },
  });
  return sales;
}
async function countSales(filters) {
  const count = await prisma_utils_1.prisma.sales.count({
    where: filters,
  });
  return count;
}
async function getAll(query) {
  try {
    const filters = query.filters || {};
    const page = query.page || 1;
    const rows = query.rows || 10;
    const [sales, totalCount] = await Promise.all([fetchSalesAll(filters, page, rows), countSales(filters)]);
    return {
      status: true,
      data: { data: sales, totalCount },
    };
  } catch (err) {
    logger_1.default.error(`SalesService.getAll : ${err}`);
    return Service_1.INTERNAL_SERVER_ERROR_SERVICE_RESPONSE;
  }
}
