import { QueryHelper } from './query-helper';
import { Query } from './query';

describe('Query helper tests', () => {
  it('Should build a simple query', () => {
    const content = {
      first: 1
    };
    const query = new Query(content);
    const test = QueryHelper.query(content);

    expect(test).toEqual(query);
  });

  it('Should build a simple time query', () => {
    const array = [1, 2, 3];
    const query = new Query({ [QueryHelper.REQUESTED_TIMES_KEY]: array });
    const test = QueryHelper.timeQuery(array);

    expect(test).toEqual(query);
  });

  it('Should build a simple time query with selected items', () => {
    const times = [1, 2, 3];
    const items = [4, 5, 6];
    const query = new Query({
      [QueryHelper.REQUESTED_TIMES_KEY]: times,
      [QueryHelper.REQUESTED_ITEMS_KEY]: items
    });
    const test = QueryHelper.selectionTimeQuery(times, items);

    expect(test).toEqual(query);
  });

  it('Should build a simple table query', () => {
    const columnIds = [1, 2, 3];
    const index = 2;
    const count = 1;
    const query = new Query({
      [QueryHelper.REQUESTED_TABLE_INDEX_KEY]: index,
      [QueryHelper.REQUESTED_TABLE_COUNT_KEY]: count,
      [QueryHelper.REQUESTED_TABLE_COLUMN_IDS_KEY]: columnIds
    });
    const test = QueryHelper.tableQuery(columnIds, index, count);

    expect(test).toEqual(query);
  });

  it('Should split the range into equal parts', () => {
    const start = 10;
    const end = 20;
    const parts = 3;
    const array = [10, 15, 20];
    const test = QueryHelper.splitRangeIntoEqualParts(start, end, parts);

    expect(test).toEqual(array);
  });
});
