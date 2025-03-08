'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const prisma_utils_1 = require('../utils/prisma.utils');
async function create(user) {
  const result = await prisma_utils_1.prisma.user.create({ data: user });
  return result;
}
async function getByEmail(email) {
  const result = prisma_utils_1.prisma.user.findUnique({ where: { email } });
  return result;
}
async function me(userId) {
  const result = await prisma_utils_1.prisma.user.findUnique({ where: { id: userId } });
  return result;
}
const authRepository = {
  create,
  me,
  getByEmail,
};
exports.default = authRepository;
