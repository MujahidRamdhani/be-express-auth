'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.register = register;
exports.login = login;
exports.me = me;
const response_utils_1 = require('../../utils/response.utils');
const AuthSevice_1 = __importDefault(require('$services/AuthSevice'));
async function register(req, res) {
  const { fullName, email, password } = req.body;
  const serviceResponse = await AuthSevice_1.default.register({ fullName, password, email });
  if (!serviceResponse.status) {
    return (0, response_utils_1.handleServiceErrorWithResponse)(res, serviceResponse);
  }
  return (0, response_utils_1.response_success)(res, serviceResponse.data, 'Registration successful!');
}
async function login(req, res) {
  const { email, password } = req.body;
  const serviceResponse = await AuthSevice_1.default.login({ email, password });
  if (!serviceResponse.status) {
    return (0, response_utils_1.handleServiceErrorWithResponse)(res, serviceResponse);
  }
  return (0, response_utils_1.response_success)(res, serviceResponse.data, 'Login successful!');
}
async function me(req, res) {
  const { id } = req.user;
  const userId = id;
  const serviceResponse = await AuthSevice_1.default.me(userId);
  if (!serviceResponse.status) {
    return (0, response_utils_1.handleServiceErrorWithResponse)(res, serviceResponse);
  }
  return (0, response_utils_1.response_success)(res, serviceResponse.data, 'User profile fetched successfully!');
}
