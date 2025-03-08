'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.create = create;
exports.getByUserId = getByUserId;
exports.getByProductId = getByProductId;
exports.fetchProducts = fetchProducts;
exports.countProducts = countProducts;
exports.getAll = getAll;
const prisma_utils_1 = require('../utils/prisma.utils');
const logger_1 = __importDefault(require('$pkg/logger'));
const Service_1 = require('$entities/Service');
async function create(userId, productData) {
  const { name, price, stock } = productData;
  try {
    const result = await prisma_utils_1.prisma.products.create({
      data: {
        name,
        price,
        stock,
        userId,
      },
    });
    return { status: true, data: result };
  } catch (err) {
    logger_1.default.error(`ProductsService.createProduct : ${err}`);
    return Service_1.INTERNAL_SERVER_ERROR_SERVICE_RESPONSE;
  }
}
async function getByUserId(userId) {
  try {
    const products = await prisma_utils_1.prisma.products.findMany({
      where: { userId },
    });
    return { status: true, data: products };
  } catch (err) {
    logger_1.default.error(`ProductsService.getProductsByUserId : ${err}`);
    return Service_1.INTERNAL_SERVER_ERROR_SERVICE_RESPONSE;
  }
}
async function getByProductId(productId) {
  try {
    const products = await prisma_utils_1.prisma.products.findMany({
      where: { id: productId },
    });
    return { status: true, data: products };
  } catch (err) {
    logger_1.default.error(`ProductsService.getByProductId : ${err}`);
    return Service_1.INTERNAL_SERVER_ERROR_SERVICE_RESPONSE;
  }
}
async function fetchProducts(filters, page, rows) {
  const offset = (page - 1) * rows;
  const data = await prisma_utils_1.prisma.products.findMany({
    where: filters,
    skip: offset,
    take: rows,
  });
  return data;
}
async function countProducts(filters) {
  const count = await prisma_utils_1.prisma.products.count({
    where: filters,
  });
  return count;
}
async function getAll(query) {
  try {
    const filters = query.filters || {};
    const page = query.page || 1;
    const rows = query.rows || 10;
    const [data, totalCount] = await Promise.all([fetchProducts(filters, page, rows), countProducts(filters)]);
    return {
      status: true,
      data: { data, totalCount },
    };
  } catch (err) {
    logger_1.default.error(`ProductsService.getAll : ${err}`);
    return Service_1.INTERNAL_SERVER_ERROR_SERVICE_RESPONSE;
  }
}
