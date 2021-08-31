import { QueryHelper } from './query-helper';
import { Query } from './query';

describe('Query helper tests', () => {
  it('Should build a simple query', () => {
    const content = {
      first: 1
    };
    const result = {
      parameters: content
    };
    const test = QueryHelper.query(content);

    expect(test).toEqual(result);
  });
});
