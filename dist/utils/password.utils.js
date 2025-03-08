'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.hashPassword = hashPassword;
const bcrypt_1 = __importDefault(require('bcrypt'));
const logger_1 = __importDefault(require('../pkg/logger'));
const SALT_ROUNDS = 10;
// Hash password function
async function hashPassword(password) {
  try {
    const salt = await bcrypt_1.default.genSalt(SALT_ROUNDS);
    return await bcrypt_1.default.hash(password, salt);
  } catch (err) {
    logger_1.default.error(`hashPassword: Failed to hash password - ${err}`);
    throw new Error('Failed to hash password');
  }
}
