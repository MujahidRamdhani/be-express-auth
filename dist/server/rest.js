'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.default = createRestServer;
const express_1 = __importDefault(require('express'));
const index_1 = __importDefault(require('$routes/index'));
const cors_1 = __importDefault(require('cors'));
const morganMiddleware_1 = __importDefault(require('$middlewares/morganMiddleware'));
const AuthRoute_1 = __importDefault(require('$routes/AuthRoute'));
const ProductRoute_1 = __importDefault(require('$routes/ProductRoute'));
const FileRoute_1 = __importDefault(require('$routes/FileRoute'));
const SalesRoute_1 = __importDefault(require('$routes/SalesRoute'));
const authMiddlerware_1 = require('$middlewares/authMiddlerware');
function createRestServer() {
  let allowedOrigins = ['*'];
  let corsOptions = {};
  if (process.env.ENVIRONMENT != 'dev') {
    allowedOrigins = process.env.ALLOWED_ORIGINS.split(',');
    corsOptions.origin = allowedOrigins;
  }
  const app = (0, express_1.default)();
  app.use((0, cors_1.default)(corsOptions));
  app.use(morganMiddleware_1.default);
  app.use(express_1.default.json());
  app.use('/auth', AuthRoute_1.default);
  app.use(authMiddlerware_1.authenticate);
  app.use('/products', ProductRoute_1.default);
  app.use('/file', FileRoute_1.default);
  app.use('/sales', SalesRoute_1.default);
  app.use(index_1.default);
  // app.use(AuthRoutes);
  return app;
}
