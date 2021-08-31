import { TspClient } from './tsp-client';
import { TspClientResponse } from './tsp-client-response';
import { Trace } from '../models/trace';

jest.mock('./rest-client');

const client = new TspClient('http://localhost');

describe('Tsp client tests', () => {
  it('Should fetch traces', async () => {
    const response = await client.fetchTraces();
    const check = {
      text: 'Test',
      statusCode: 200,
      statusMessage: 'Success'
    };

    expect(response).toEqual(check);
  });

  it('Should fetch a specific trace', async () => {
    const traceUUID = '123';
    const response = await client.fetchTrace(traceUUID);
    const check = {
      text: traceUUID,
      statusCode: 200,
      statusMessage: 'Success',
      responseModel: +traceUUID
    };

    expect(response).toEqual(check);
  });
});
