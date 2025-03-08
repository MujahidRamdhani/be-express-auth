'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.parseQueryParam = parseQueryParam;
exports.buildFilters = buildFilters;
function parseQueryParam(param, parser, defaultValue) {
  return param ? parser(param) : defaultValue;
}
function buildFilters(query, filtersFromQuery) {
  const userId = parseQueryParam(query.userId, parseInt, null);
  const productId = parseQueryParam(query.productId, parseInt, null);
  return {
    ...filtersFromQuery,
    ...(userId ? { userId } : {}),
    ...(productId ? { productId } : {}),
  };
}
