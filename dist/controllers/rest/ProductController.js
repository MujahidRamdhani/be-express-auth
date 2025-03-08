'use strict';
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ('get' in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = {
            enumerable: true,
            get: function () {
              return m[k];
            },
          };
        }
        Object.defineProperty(o, k2, desc);
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, 'default', { enumerable: true, value: v });
      }
    : function (o, v) {
        o['default'] = v;
      });
var __importStar =
  (this && this.__importStar) ||
  (function () {
    var ownKeys = function (o) {
      ownKeys =
        Object.getOwnPropertyNames ||
        function (o) {
          var ar = [];
          for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
          return ar;
        };
      return ownKeys(o);
    };
    return function (mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== 'default') __createBinding(result, mod, k[i]);
      __setModuleDefault(result, mod);
      return result;
    };
  })();
Object.defineProperty(exports, '__esModule', { value: true });
exports.create = create;
exports.getByUserId = getByUserId;
exports.getAll = getAll;
const ProductService = __importStar(require('$services/ProductService'));
const response_utils_1 = require('$utils/response.utils');
const query_utils_1 = require('$utils/query.utils');
async function create(req, res) {
  const { id } = req.user;
  const userId = id;
  const productData = req.body;
  const serviceResponse = await ProductService.create(userId, productData);
  if (!serviceResponse.status) return (0, response_utils_1.handleServiceErrorWithResponse)(res, serviceResponse);
  return (0, response_utils_1.response_success)(res, serviceResponse.data, 'Product created successfully!');
}
async function getByUserId(req, res) {
  const { id } = req.user;
  const userId = id;
  const serviceResponse = await ProductService.getByUserId(userId);
  if (!serviceResponse.status) return (0, response_utils_1.handleServiceErrorWithResponse)(res, serviceResponse);
  return (0, response_utils_1.response_success)(res, serviceResponse.data, 'Products retrieved successfully!');
}
async function getAll(req, res) {
  const filtersFromQuery = req.query.filters ? JSON.parse(req.query.filters) : {};
  const filters = (0, query_utils_1.buildFilters)(req.query, filtersFromQuery);
  const query = {
    filters,
    page: (0, query_utils_1.parseQueryParam)(req.query.page, parseInt, 1),
    rows: (0, query_utils_1.parseQueryParam)(req.query.rows, parseInt, 10),
  };
  const serviceResponse = await ProductService.getAll(query);
  if (!serviceResponse.status) {
    return (0, response_utils_1.handleServiceErrorWithResponse)(res, serviceResponse);
  }
  return (0, response_utils_1.response_success)(res, serviceResponse.data, 'Products retrieved successfully!');
}
