'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const bcrypt_1 = __importDefault(require('bcrypt'));
const Service_1 = require('../entities/Service');
const logger_1 = __importDefault(require('$pkg/logger'));
const jwt_utils_1 = require('$utils/jwt.utils');
const password_utils_1 = require('$utils/password.utils');
const AuthRepository_1 = __importDefault(require('../repositores/AuthRepository'));
async function register(userData) {
  try {
    const { fullName, password, email } = userData;
    const existingUser = await AuthRepository_1.default.getByEmail(email);
    if (existingUser) {
      return {
        status: false,
        err: { message: 'User already exists', code: 409 },
      };
    }
    const hashedPassword = await (0, password_utils_1.hashPassword)(password);
    const user = await AuthRepository_1.default.create({
      fullName,
      email,
      password: hashedPassword,
    });
    const result = {
      status: true,
      user: user,
    };
    return result;
  } catch (err) {
    // Logger.error(`register: ${err}`);
    return Service_1.INTERNAL_SERVER_ERROR_SERVICE_RESPONSE;
  }
}
async function login(input) {
  try {
    const { email, password } = input;
    const user = await AuthRepository_1.default.getByEmail(email);
    if (!user) {
      return {
        status: false,
        err: { message: 'Invalid email or password', code: 401 },
      };
    }
    const isMatch = await bcrypt_1.default.compare(password, user.password);
    if (!isMatch) {
      return {
        status: false,
        err: { message: 'Invalid email or password', code: 401 },
      };
    }
    const token = (0, jwt_utils_1.createAccessToken)({
      id: user.id,
      email: user.email,
    });
    const result = {
      status: true,
      data: { token },
    };
    return result;
  } catch (err) {
    logger_1.default.error(`login: ${err}`);
    return {
      ...Service_1.INTERNAL_SERVER_ERROR_SERVICE_RESPONSE,
      data: undefined,
    };
  }
}
// Me function
async function me(userId) {
  try {
    const user = await AuthRepository_1.default.me(userId);
    if (!user) {
      return {
        status: false,
        err: { message: 'User not found', code: 404 },
      };
    }
    const { password, ...userWithoutPassword } = user;
    const result = {
      status: true,
      data: userWithoutPassword,
    };
    return result;
  } catch (err) {
    logger_1.default.error(`me: ${err}`);
    return Service_1.INTERNAL_SERVER_ERROR_SERVICE_RESPONSE;
  }
}
const authService = { register, login, me };
exports.default = authService;
