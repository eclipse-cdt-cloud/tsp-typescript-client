// tslint:disable: no-unused-expression

import { URLSearchParams } from 'url';
import { RestClient } from './rest-client';

describe('RestClient', () => {

  it('RestClient.encodeURLParameters', async () => {
    const parameters = new Map<string, string>();
    parameters.set('a b c', 'value 1');
    parameters.set('d', 'value 2');
    const query = RestClient['encodeURLParameters'](parameters);

    const parsed = new URLSearchParams(query);
    expect(parsed.get('a b c')).toEqual('value 1');
    expect(parsed.get('d')).toEqual('value 2');
  });
});
