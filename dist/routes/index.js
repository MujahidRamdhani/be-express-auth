'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const response_utils_1 = require('$utils/response.utils');
const express_1 = require('express');
const registry_1 = __importDefault(require('./registry'));
const router = (0, express_1.Router)();
router.get('/', (req, res) => {
  return (0, response_utils_1.response_success)(res, 'main routes!');
});
router.get('/robots.txt', function (req, res) {
  res.type('text/plain');
  res.send(`User-agent: *\nAllow: /`);
});
router.get('/ping', (req, res) => {
  return (0, response_utils_1.response_success)(res, 'pong!');
});
router.use('/example', registry_1.default.ExampleRoutes);
router.all('*', (req, res) => {
  return (0, response_utils_1.response_not_found)(res);
});
exports.default = router;
