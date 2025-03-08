'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.checkFilteringQuery = checkFilteringQuery;
exports.checkFilteringQueryV2 = checkFilteringQueryV2;
function checkFilteringQuery(req) {
  let filter = {};
  if (req.query.orderKey) {
    filter = { ...filter, orderKey: req.query.orderKey.toString() };
  }
  if (req.query.orderRule) {
    filter = { ...filter, orderRule: req.query.orderRule.toString() };
  }
  if (req.query.filters) {
    filter = {
      ...filter,
      filters: JSON.parse(req.query.filters.toString()),
    };
  }
  if (req.query.searchValue && req.query.searchKey) {
    filter = {
      ...filter,
      searchKey: req.query.searchKey.toString(),
      searchValue: req.query.searchValue.toString(),
    };
  }
  if (req.query.rows) {
    filter = {
      ...filter,
      // page: Number(req.query.page),
      rows: Number(req.query.rows),
    };
  }
  if (req.query.cursor) {
    filter = {
      ...filter,
      cursor: req.query.cursor.toString(),
    };
    if (req.query.cursorDirection) {
      filter = {
        ...filter,
        cursorDirection: req.query.cursorDirection?.toString(),
      };
    }
  }
  if (req.query.page) {
    filter = {
      ...filter,
      page: Number(req.query.page),
    };
  }
  if (req.query.startRange && req.query.endRange) {
    filter = {
      ...filter,
      startRange: req.query.startRange.toString(),
      endRange: req.query.endRange.toString(),
    };
  }
  return filter;
}
/*

Legacy V1 Above

Please use V2 :)

*/
function checkFilteringQueryV2(req) {
  let filter = {};
  if (req.query.orderKey) {
    filter.orderKey = req.query.orderKey.toString();
  }
  if (req.query.orderRule) {
    filter.orderRule = req.query.orderRule.toString();
  }
  if (req.query.filters) {
    filter.filters = JSON.parse(req.query.filters.toString());
  }
  if (req.query.searchFilters) {
    filter.searchFilters = JSON.parse(req.query.searchFilters.toString());
  }
  if (req.query.rangedFilters) {
    filter.rangedFilters = JSON.parse(req.query.rangedFilters.toString());
  }
  if (req.query.rows) {
    filter = {
      ...filter,
      // page: Number(req.query.page),
      rows: Number(req.query.rows),
    };
  }
  if (req.query.page) {
    filter = {
      ...filter,
      page: Number(req.query.page),
    };
  }
  return filter;
}
