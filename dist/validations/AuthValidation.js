'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.meValidation = exports.loginValidation = exports.registerValidation = void 0;
const joi_1 = __importDefault(require('joi'));
const registerValidation = joi_1.default.object({
  nama: joi_1.default.string().max(200).required(),
  alamat: joi_1.default.string().required(),
  nomorTelepon: joi_1.default.string().required(),
  email: joi_1.default.string().email().max(200).required(),
  password: joi_1.default.string().max(200).required(),
  nik: joi_1.default.string().max(200).required(),
});
exports.registerValidation = registerValidation;
const loginValidation = joi_1.default.object({
  email: joi_1.default.string().email().max(200).required(),
  password: joi_1.default.string().max(200).required(),
});
exports.loginValidation = loginValidation;
const meValidation = joi_1.default.string().email().max(200).required();
exports.meValidation = meValidation;
