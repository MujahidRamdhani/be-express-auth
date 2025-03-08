'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const FilterQueryV2_1 = require('./FilterQueryV2');
describe('test buildFilterQueryLimitOffsetV2', () => {
  const singleValueSearchAndFilters = {
    filters: {
      category: 'Food',
    },
    searchFilters: {
      country: 'Ita',
    },
  };
  const multiValueSearchAndFilters = {
    filters: {
      category: ['Food', 'Products'],
      country: ['Italy', 'Germany'],
    },
    searchFilters: {
      name: 'test',
      description: 'test',
    },
  };
  test('should return correct filter for single value filter and search', () => {
    const result = (0, FilterQueryV2_1.buildFilterQueryLimitOffsetV2)(singleValueSearchAndFilters);
    const expectedWhereResult = {
      where: {
        AND: [
          { category: 'Food' },
          {
            country: {
              contains: 'Ita',
            },
          },
        ],
      },
    };
    expect(result).toMatchObject(expectedWhereResult);
  });
  test('should return correct filter for multi value filter and search', () => {
    const result = (0, FilterQueryV2_1.buildFilterQueryLimitOffsetV2)(multiValueSearchAndFilters);
    const expectedWhereResult = {
      where: {
        AND: [
          {
            OR: [{ category: 'Food' }, { category: 'Products' }],
          },
          {
            OR: [{ country: 'Italy' }, { country: 'Germany' }],
          },
          {
            OR: [
              {
                name: {
                  contains: 'test',
                },
              },
              {
                description: {
                  contains: 'test',
                },
              },
            ],
          },
        ],
      },
    };
    expect(result).toMatchObject(expectedWhereResult);
  });
  test('should return correct filter for filters with page and rows argument', () => {
    multiValueSearchAndFilters.page = 2;
    multiValueSearchAndFilters.rows = 50;
    const result = (0, FilterQueryV2_1.buildFilterQueryLimitOffsetV2)(multiValueSearchAndFilters);
    const expectedWhereResult = {
      where: {
        AND: [
          {
            OR: [{ category: 'Food' }, { category: 'Products' }],
          },
          {
            OR: [{ country: 'Italy' }, { country: 'Germany' }],
          },
          {
            OR: [
              {
                name: {
                  contains: 'test',
                },
              },
              {
                description: {
                  contains: 'test',
                },
              },
            ],
          },
        ],
      },
      take: 50,
      skip: 50,
    };
    expect(result).toMatchObject(expectedWhereResult);
  });
  test('should return correct filter for filters with order argument', () => {
    multiValueSearchAndFilters.orderKey = 'name';
    multiValueSearchAndFilters.orderRule = 'asc';
    const result = (0, FilterQueryV2_1.buildFilterQueryLimitOffsetV2)(multiValueSearchAndFilters);
    const expectedWhereResult = {
      where: {
        AND: [
          {
            OR: [{ category: 'Food' }, { category: 'Products' }],
          },
          {
            OR: [{ country: 'Italy' }, { country: 'Germany' }],
          },
          {
            OR: [
              {
                name: {
                  contains: 'test',
                },
              },
              {
                description: {
                  contains: 'test',
                },
              },
            ],
          },
        ],
      },
      orderBy: {
        name: 'asc',
      },
    };
    expect(result).toMatchObject(expectedWhereResult);
  });
  test('should return correct filter for rangedFilters', () => {
    multiValueSearchAndFilters.rangedFilters = [
      {
        key: 'price',
        start: 50000,
        end: 60000,
      },
    ];
    const result = (0, FilterQueryV2_1.buildFilterQueryLimitOffsetV2)(multiValueSearchAndFilters);
    const expectedWhereResult = {
      where: {
        AND: [
          {
            OR: [{ category: 'Food' }, { category: 'Products' }],
          },
          {
            OR: [{ country: 'Italy' }, { country: 'Germany' }],
          },
          {
            OR: [
              {
                name: {
                  contains: 'test',
                },
              },
              {
                description: {
                  contains: 'test',
                },
              },
            ],
          },
          {
            price: {
              gte: 50000,
              lte: 60000,
            },
          },
        ],
      },
    };
    expect(result).toMatchObject(expectedWhereResult);
  });
});
