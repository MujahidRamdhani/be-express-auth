'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const instance_1 = __importDefault(require('$server/instance'));
const logger_1 = __importDefault(require('$pkg/logger'));
const startRestApp = () => {
  logger_1.default.info('Starting App : rest');
  const app = instance_1.default.restServer();
  const PORT = Number(process.env.NODE_LOCAL_PORT) || 3010;
  return app.listen(PORT, () => {
    logger_1.default.info(`Rest App is Running at Port ${PORT}`);
  });
};
exports.default = startRestApp;
