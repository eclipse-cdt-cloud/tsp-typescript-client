import { QueryHelper } from './query-helper';
import { ConfigurationQuery, OutputConfigurationQuery, Query } from './query';

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
    const array = [BigInt(1), BigInt(2), BigInt(3)];
    const query = new Query({ [QueryHelper.REQUESTED_TIMES_KEY]: array });
    const test = QueryHelper.timeQuery(array);

    expect(test).toEqual(query);
  });

  it('Should build a simple time query with selected items', () => {
    const times = [BigInt(1), BigInt(2), BigInt(3)];
    const items = [4, 5, 6];
    const query = new Query({
      [QueryHelper.REQUESTED_TIMES_KEY]: times,
      [QueryHelper.REQUESTED_ITEMS_KEY]: items
    });
    const test = QueryHelper.selectionTimeQuery(times, items);

    expect(test).toEqual(query);
  });

  it('Should build a time range query', () => {
    const requestedTimeRange = { start: BigInt(1000), end: BigInt(2000) };
    const query = new Query({ [QueryHelper.REQUESTED_TIMERANGE_KEY]: requestedTimeRange });
    const test = QueryHelper.timeRangeQuery(BigInt(1000), BigInt(2000));

    expect(test).toEqual(query);
  });

  it('Should build a sampled time range query', () => {
    const requestedTimeRange = { start: BigInt(1000), end: BigInt(2000), nbTimes: 10 };
    const query = new Query({ [QueryHelper.REQUESTED_TIMERANGE_KEY]: requestedTimeRange });
    const test = QueryHelper.timeRangeQuery(BigInt(1000), BigInt(2000), 10);

    expect(test).toEqual(query);
  });

  it('Should build a time range query with selected items', () => {
    const requestedTimeRange = { start: BigInt(1000), end: BigInt(2000) };
    const items = [4, 5, 6];
    const query = new Query({
      [QueryHelper.REQUESTED_TIMERANGE_KEY]: requestedTimeRange,
      [QueryHelper.REQUESTED_ITEMS_KEY]: items
    });
    const test = QueryHelper.selectionTimeRangeQuery(BigInt(1000), BigInt(2000), items);

    expect(test).toEqual(query);
  });

  it('Should build a sampled time range query with selected items', () => {
    const requestedTimeRange = { start: BigInt(1000), end: BigInt(2000), nbTimes: 10 };
    const items = [4, 5, 6];
    const query = new Query({
      [QueryHelper.REQUESTED_TIMERANGE_KEY]: requestedTimeRange,
      [QueryHelper.REQUESTED_ITEMS_KEY]: items
    });
    const test = QueryHelper.selectionTimeRangeQuery(BigInt(1000), BigInt(2000), 10, items);

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
    const start = BigInt(10);
    const end = BigInt(20);
    const parts = 3;
    const array = [BigInt(10), BigInt(15), BigInt(20)];
    const test = QueryHelper.splitRangeIntoEqualParts(start, end, parts);

    expect(test).toEqual(array);
  });

  it('Should split the range into equal parts without duplicates', () => {
    const start = BigInt('1234567890123456781');
    const end = BigInt('1234567890123456785');
    const parts = 20;
    const array = [BigInt('1234567890123456781'), BigInt('1234567890123456782'), BigInt('1234567890123456783'), BigInt('1234567890123456784'), BigInt('1234567890123456785')];
    const test = QueryHelper.splitRangeIntoEqualParts(start, end, parts);

    expect(test).toEqual(array);
  });

  it('Should create a configuration query', () => {
    const param = {
      cpu: 0,
      thread: "myThread"
    };

    const test = QueryHelper.configurationQuery(
      'My Config',
      'My special configuration', 
      param);

    const query = new ConfigurationQuery('My Config',
      'My special configuration',
      param);
    
    expect(test).toEqual(query);
  });

  it('Should create a output configuration query', () => {
    const param = {
      specifiers: [
        {
         label: 'latency',
         inRegex: '(\\S*)_entry',
          outRegex: '(\\S*)_exit',
         contextInRegex: '(\\S*)_entry',
         contextOutRegex: '(\\S*)_exit',
          classifier: 'CPU'
        }
      ]
    };

  const test = QueryHelper.outputConfigurationQuery(
    'My new InAndOut',
    'org.eclipse.tracecompass.incubator.internal.inandout.core.config',
    'My special configuration', 
    param);

    const query = new OutputConfigurationQuery('My new InAndOut',
      'org.eclipse.tracecompass.incubator.internal.inandout.core.config',
      'My special configuration', 
      param);

    expect(test).toEqual(query);
  });
});
