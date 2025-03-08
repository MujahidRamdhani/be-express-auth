'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.create = create;
exports.getByUserId = getByUserId;
const prisma_utils_1 = require('../utils/prisma.utils');
const logger_1 = __importDefault(require('$pkg/logger'));
const Service_1 = require('$entities/Service');
async function create(userId, fileData) {
  try {
    const result = await prisma_utils_1.prisma.file.create({
      data: {
        url: fileData.url,
        userId,
      },
    });
    return { status: true, data: result };
  } catch (err) {
    logger_1.default.error(`FileService.create : ${err}`);
    return Service_1.INTERNAL_SERVER_ERROR_SERVICE_RESPONSE;
  }
}
async function getByUserId(userId) {
  try {
    const files = await prisma_utils_1.prisma.file.findMany({
      where: { userId },
    });
    return { status: true, data: files };
  } catch (err) {
    logger_1.default.error(`FileService.getByUserId : ${err}`);
    return Service_1.INTERNAL_SERVER_ERROR_SERVICE_RESPONSE;
  }
}
