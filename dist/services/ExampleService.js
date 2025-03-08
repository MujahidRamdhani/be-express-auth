'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.get = get;
const Service_1 = require('$entities/Service');
const logger_1 = __importDefault(require('$pkg/logger'));
async function get() {
  try {
    return {
      status: true,
      data: {},
    };
  } catch (err) {
    logger_1.default.error(`ExampleService.get : ${err}`);
    return Service_1.INTERNAL_SERVER_ERROR_SERVICE_RESPONSE;
  }
}
