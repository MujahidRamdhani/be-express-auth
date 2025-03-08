'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.prisma = exports.PrismaInstance = void 0;
const client_1 = require('@prisma/client');
const prismaLogOptsNonProd = [
  {
    emit: 'stdout',
    level: 'query',
  },
  {
    emit: 'stdout',
    level: 'error',
  },
  {
    emit: 'stdout',
    level: 'info',
  },
  {
    emit: 'stdout',
    level: 'warn',
  },
];
const prismaLogOptsProd = [
  {
    emit: 'stdout',
    level: 'error',
  },
  {
    emit: 'stdout',
    level: 'warn',
  },
];
const prismaLogOpts = process.env.ENVIRONMENT === 'production' ? prismaLogOptsProd : prismaLogOptsNonProd;
class PrismaInstance {
  static instance;
  prisma;
  constructor() {
    this.prisma = new client_1.PrismaClient({
      log: prismaLogOpts,
    });
  }
  static getInstance() {
    if (!PrismaInstance.instance) {
      PrismaInstance.instance = new PrismaInstance();
    }
    return PrismaInstance.instance;
  }
  getPrismaClient() {
    return this.prisma;
  }
}
exports.PrismaInstance = PrismaInstance;
exports.prisma = PrismaInstance.getInstance().getPrismaClient();
