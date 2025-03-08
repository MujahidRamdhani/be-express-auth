'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.parseQueryParam = parseQueryParam;
exports.buildProductFilters = buildProductFilters;
function parseQueryParam(param, parser, defaultValue) {
  return param ? parser(param) : defaultValue;
}
function buildProductFilters(query, filtersFromQuery) {
  const userId = parseQueryParam(query.userId, parseInt, null);
  return {
    ...filtersFromQuery,
    ...(userId ? { userId } : {}),
  };
}
