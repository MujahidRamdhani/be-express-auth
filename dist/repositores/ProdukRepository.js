'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.fetchProducts = fetchProducts;
exports.countProducts = countProducts;
const prisma_utils_1 = require('../utils/prisma.utils');
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
