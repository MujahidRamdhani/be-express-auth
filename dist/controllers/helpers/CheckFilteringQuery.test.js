'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const CheckFilteringQuery_1 = require('./CheckFilteringQuery');
describe('checkFilteringQueryV2', () => {
  it('should correctly parse request query parameters into FilteringQueryV2 object', () => {
    const req = {
      query: {
        orderKey: 'someOrderKey',
        orderRule: 'asc',
        filters: JSON.stringify({ category: 'electronics' }),
        searchFilters: JSON.stringify({ name: 'phone' }),
        rangedFilters: JSON.stringify([{ field: 'price', min: 100, max: 500 }]),
        rows: '10',
        page: '2',
      },
    };
    const expectedFilter = {
      orderKey: 'someOrderKey',
      orderRule: 'asc',
      filters: { category: 'electronics' },
      searchFilters: { name: 'phone' },
      rangedFilters: [{ field: 'price', min: 100, max: 500 }],
      rows: 10,
      page: 2,
    };
    const result = (0, CheckFilteringQuery_1.checkFilteringQueryV2)(req);
    expect(result).toEqual(expectedFilter);
  });
  it('should correctly handle missing query parameters', () => {
    const req = {
      query: {},
    };
    const expectedFilter = {};
    const result = (0, CheckFilteringQuery_1.checkFilteringQueryV2)(req);
    expect(result).toEqual(expectedFilter);
  });
});
