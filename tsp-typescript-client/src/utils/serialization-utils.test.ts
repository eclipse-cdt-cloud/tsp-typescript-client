// tslint:disable: no-unused-expression

import { Query } from '../models/query/query';
import { HttpRequest, HttpResponse, RestClient } from '../protocol/rest-client';
import { FixtureSet } from '../protocol/test-utils';
import { TspClient } from '../protocol/tsp-client';
import { SerializationUtil } from './serialization-utils';
import { Experiment } from '../models/experiment';

describe('SerializationUtils tests', () => {

  const client = new TspClient('not-relevant');
  const httpRequestMock = jest.fn<Promise<HttpResponse>, [req: HttpRequest]>();

  let fixtures: FixtureSet;

  beforeAll(async () => {
    fixtures = await FixtureSet.fromFolder(__dirname, '../../fixtures/tsp-client');
    RestClient['httpRequest'] = httpRequestMock;
  });

  beforeEach(() => {
    httpRequestMock.mockReset();
    httpRequestMock.mockResolvedValue({ text: '', status: 404, statusText: 'Not found' });
  });

  it('testSerializationUtil', async () => {
    httpRequestMock.mockReturnValueOnce(fixtures.asResponse('create-experiment-0.json'));
    const response = await client.createExperiment(new Query({}));
    const experiment = response.getModel()!;

    const input = SerializationUtil.serialize(experiment);
    const experiment2 = SerializationUtil.deserialize(input, Experiment);

    expect(experiment).toEqual(experiment2);
  });

  it('testSerializationUtil-no-normalizer', async () => {
    const inputObj = 'hallo';
    const input = SerializationUtil.serialize(inputObj);
    const output = SerializationUtil.deserialize<string>(input);
    expect(typeof output).toEqual('string');

    let bigIntObj = BigInt("1234567890123456789");
    const bigIntInput = SerializationUtil.serialize(bigIntObj);
    const bigIntOutput = SerializationUtil.deserialize<bigint>(bigIntInput);
    expect(typeof bigIntOutput).toEqual('bigint');
  });
});
