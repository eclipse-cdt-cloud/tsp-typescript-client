import { TspClient } from './tsp-client';
import { TspClientResponse } from './tsp-client-response';
import { Trace } from '../models/trace';
import { Query } from '../models/query/query';
import { OutputDescriptor } from '../models/output-descriptor';

jest.mock('./rest-client');

const client = new TspClient('http://localhost');

describe('Tsp client tests', () => {
  it('Should fetch traces', async () => {
    const input = new TspClientResponse('Test', 200, 'Success');
    const response = await client.fetchTraces();

    expect(response).toEqual(input);
  });

  it('Should fetch a specific trace', async () => {
    const traceUUID = '123';
    const input = new TspClientResponse(traceUUID, 200, 'Success');
    const response = await client.fetchTrace(traceUUID);

    expect(response).toEqual(input);
  });

  it('Should open a trace in the server', async () => {
    const check = '123';
    const query = new Query({ test: check });
    const input = new TspClientResponse(check, 200, 'Success');
    const response = await client.openTrace(query);

    expect(response).toEqual(input);
  });

  it('Should delete a trace', async () => {
    const traceUUID = '123';
    const input = new TspClientResponse(traceUUID, 200, 'Success');
    const response = await client.deleteTrace(traceUUID);

    expect(response).toEqual(input);
  });

  it('Should fetch experiments', async () => {
    const input = new TspClientResponse('Test', 200, 'Success');
    const response = await client.fetchExperiments();

    expect(response).toEqual(input);
  });

  it('Should fetch an experiment', async () => {
    const expUUID = '123';
    const input = new TspClientResponse(expUUID, 200, 'Success');
    const response = await client.fetchExperiment(expUUID);

    expect(response).toEqual(input);
  });

  it('Should create an experiment on the server', async () => {
    const query = new Query({ test: 'Test' });
    const input = new TspClientResponse('Test', 200, 'Success');
    const response = await client.createExperiment(query);

    expect(response).toEqual(input);
  });

  it('Should update an experiment', async () => {
    const expUUID = '123';
    const query = new Query({ test: expUUID });
    const input = new TspClientResponse(expUUID, 200, 'Success');
    const response = await client.updateExperiment(expUUID, query);

    expect(response).toEqual(input);
  });

  it('Should delete an experiment', async () => {
    const expUUID = '123';
    const input = new TspClientResponse(expUUID, 200, 'Success');
    const response = await client.deleteExperiment(expUUID);

    expect(response).toEqual(input);
  });

  it('Should list all the outputs associated to this experiment', async () => {
    const expUUID = '123';
    const output: OutputDescriptor = {
      id: expUUID,
      name: 'Test',
      description: 'Test description',
      type: 'Test type',
      queryParameters: new Map([
        ['key1', 'value1'],
        ['key2', 'value2']
      ]),
      start: 1,
      end: 10,
      final: false,
      compatibleProviders: ['One', 'Two']
    };
    const input = new TspClientResponse(JSON.stringify([output]), 200, 'Success');
    const response = await client.experimentOutputs(expUUID);

    expect(response).toEqual(input);
  });
});
