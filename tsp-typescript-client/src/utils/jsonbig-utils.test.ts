// tslint:disable: no-unused-expression

import { Experiment } from '../models/experiment';
import { Identifier } from '../models/identifier';
import { Query } from '../models/query/query';
import { HttpRequest, HttpResponse, RestClient } from '../protocol/rest-client';
import { FixtureSet } from '../protocol/test-utils';
import { TspClient } from '../protocol/tsp-client';
import { JSONBigUtils } from './jsonbig-utils';

describe('JSONBigUtils tests', () => {

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

  it('testJSONBigUtils-with-normalizer', async () => {
    httpRequestMock.mockReturnValueOnce(fixtures.asResponse('create-experiment-0.json'));
    const response = await client.createExperiment(new Query({}));
    const experiment = response.getModel()!;

    const input = JSONBigUtils.stringify(experiment);
    const experiment2: Experiment = JSONBigUtils.parse(input, Experiment);

    expect(experiment).toEqual(experiment2);
  });

  it('testJSONBigUtils-no-normalizer', async () => {
    const inputObj = 'hallo';
    const input = JSONBigUtils.stringify(inputObj);
    const output = JSONBigUtils.parse<string>(input);
    expect(typeof output).toEqual('string');

    let bigIntObj = BigInt("1234567890123456789");
    const bigIntInput = JSONBigUtils.stringify(bigIntObj);
    const bigIntOutput = JSONBigUtils.parse<bigint>(bigIntInput);
    expect(typeof bigIntOutput).toEqual('bigint');

    const idObj: Identifier = {
      version: "version",
      buildTime: "buildTime",
      os: "os",
      osArch: "osArch",
      osVersion: "osVersion",
      cpuCount: "cpuCount",
      maxMemory: "maxMemory",
      launcherName: "launcherName",
      productId: "productId"
    };
    const idInput = JSONBigUtils.stringify(idObj);
    const idOutput: Identifier = JSONBigUtils.parse<Identifier>(idInput);
    expect(typeof idOutput).toEqual('object');
    expect(idOutput).toEqual(idObj);
  });
});
