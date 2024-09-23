import { Headers } from 'node-fetch';
import { ConfigurationQuery, OutputConfigurationQuery, Query } from '../models/query/query';
import { HttpRequest, HttpResponse, RestClient } from './rest-client';
import { FixtureSet } from './test-utils';
import { HttpTspClient } from './http-tsp-client';
import { DataType } from '../models/data-type';
import { ConfigurationParameterDescriptor } from '../models/configuration-source';
import { QueryHelper } from '../models/query/query-helper';

describe('HttpTspClient Deserialization', () => {

  const client = new HttpTspClient('not-relevant');
  const httpRequestMock = jest.fn<Promise<HttpResponse>, [req: HttpRequest]>();

  let fixtures: FixtureSet;

  beforeAll(async () => {
    fixtures = await FixtureSet.fromFolder(__dirname, '../../fixtures/tsp-client');
    RestClient['httpRequest'] = httpRequestMock;
  });

  afterAll(() => {
    fixtures.assertUsedAllFixtures();
  });

  beforeEach(() => {
    httpRequestMock.mockReset();
    httpRequestMock.mockResolvedValue({ text: '', status: 404, statusText: 'Not found' });
  });

  it('checkHealth', async () => {
    httpRequestMock.mockReturnValueOnce(fixtures.asResponse('check-health-0.json'));
    const response = await client.checkHealth();
    const health = response.getModel()!;

    expect(health.status).toEqual('UP');
  });

  it('checkHealth-rejection', async () => {
    httpRequestMock.mockRejectedValueOnce(new TypeError('Failed to fetch'));
    const response = await client.checkHealth();

    expect(response.getStatusCode()).toEqual(503);
    expect(response.getStatusMessage()).toEqual('Service Unavailable');
    expect(response.getText()).toEqual('TypeError: Failed to fetch');
    expect(response.getModel()).toBeUndefined();
  });

  it('checkHealth-failure', async () => {
    httpRequestMock.mockResolvedValueOnce({ status: 502, statusText: 'Bad Gateway', text: 'Service Temporarily Overloaded', headers: new Headers({ 'Content-Type': 'text/plain' }) });
    const response = await client.checkHealth();

    expect(response.getStatusCode()).toEqual(502);
    expect(response.getStatusMessage()).toEqual('Bad Gateway');
    expect(response.getText()).toEqual('Service Temporarily Overloaded');
    expect(response.getModel()).toBeUndefined();
  });

  it('createExperiment', async () => {
    httpRequestMock.mockReturnValueOnce(fixtures.asResponse('create-experiment-0.json'));
    const response = await client.createExperiment(new Query({}));
    const experiment = response.getModel()!;

    expect(typeof experiment.end).toEqual('bigint');
    expect(typeof experiment.start).toEqual('bigint');
    expect(typeof experiment.nbEvents).toEqual('number');
  });

  it('createExperiment-invalidModel', async () => {
    const value = await fixtures.asResponse('create-experiment-0.json');
    value.text = 'Not a JSON string';
    httpRequestMock.mockResolvedValueOnce(value);
    const response = await client.createExperiment(new Query({}));
    const experiment = response.getModel()!;

    expect(response.getStatusCode()).toBe(200);
    expect(response.getText()).toBe('Not a JSON string');
    expect(experiment).toBeUndefined();
  });

  it('createExperiment-invalidBigInt', async () => {
    const value = await fixtures.asResponse('create-experiment-0.json');
    value.text = value.text.replace('1234567890123456789', '1.234567890123456789');
    httpRequestMock.mockResolvedValueOnce(value);
    const response = await client.createExperiment(new Query({}));
    const experiment = response.getModel()!;

    expect(response.getStatusCode()).toBe(200);
    expect(experiment).toBeUndefined();
  });

  it('createExperiment-invalidNumber', async () => {
    const value = await fixtures.asResponse('create-experiment-0.json');
    value.text = value.text.replace('999999', '9999999999999999999');
    httpRequestMock.mockResolvedValueOnce(value);
    const response = await client.createExperiment(new Query({}));
    const experiment = response.getModel()!;

    expect(response.getStatusCode()).toBe(200);
    expect(experiment).toBeUndefined();
  });

  it('deleteExperiment', async () => {
    httpRequestMock.mockReturnValueOnce(fixtures.asResponse('delete-experiment-0.json'));
    const response = await client.deleteExperiment('not-relevant');
    const experiment = response.getModel()!;

    expect(typeof experiment.end).toEqual('bigint');
    expect(typeof experiment.start).toEqual('bigint');
    expect(typeof experiment.nbEvents).toEqual('number');
  });

  it('deleteTrace', async () => {
    httpRequestMock.mockReturnValueOnce(fixtures.asResponse('delete-trace-0.json'));
    const response = await client.deleteTrace('not-relevant');
    const trace = response.getModel()!;

    expect(typeof trace.end).toEqual('bigint');
    expect(typeof trace.start).toEqual('bigint');
    expect(typeof trace.nbEvents).toEqual('number');
    expect(typeof trace.properties).toEqual('object');
  });

  it('experimentOutputs', async () => {
    httpRequestMock.mockReturnValueOnce(fixtures.asResponse('experiment-outputs-0.json'));
    const response = await client.experimentOutputs('not-relevant');
    const outputs = response.getModel()!;

    expect(outputs).toHaveLength(5);
  });

  it('fetchAnnotationsCategories', async () => {
    httpRequestMock.mockReturnValueOnce(fixtures.asResponse('fetch-annotation-categories-0.json'));
    const response = await client.fetchAnnotationsCategories('not-relevant', 'not-relevant');
    const categories = response.getModel()!;

    expect(categories.model.annotationCategories[0]).toEqual('Annotation category');
  });

  it('fetchAnnotations', async () => {
    httpRequestMock.mockReturnValueOnce(fixtures.asResponse('fetch-annotations-0.json'));
    const response = await client.fetchAnnotations('not-relevant', 'not-relevant', new Query({}));
    const genericResponse = response.getModel()!;
    const annotations = genericResponse.model.annotations['Annotation category'];

    expect(annotations).toHaveLength(1);
    for (const annotation of annotations) {
      expect(typeof annotation.time).toEqual('bigint');
      expect(typeof annotation.entryId).toEqual('number');
      expect(typeof annotation.time).toEqual('bigint');
    }
  });

  it('fetchExperiment', async () => {
    httpRequestMock.mockReturnValueOnce(fixtures.asResponse('fetch-experiment-0.json'));
    const response = await client.fetchExperiment('not-relevant');
    const experiment = response.getModel()!;

    expect(typeof experiment.end).toEqual('bigint');
    expect(typeof experiment.nbEvents).toEqual('number');
    expect(typeof experiment.start).toEqual('bigint');

    expect(experiment.traces).toHaveLength(1);
    for (const trace of experiment.traces) {
      expect(typeof trace.end).toEqual('bigint');
      expect(typeof trace.nbEvents).toEqual('number');
      expect(typeof trace.start).toEqual('bigint');
    }
  });

  it('fetchExperiments', async () => {
    httpRequestMock.mockReturnValueOnce(fixtures.asResponse('fetch-experiments-0.json'));
    const response = await client.fetchExperiments();
    const experiments = response.getModel()!;

    expect(experiments).toHaveLength(1);
    for (const experiment of experiments) {
      expect(typeof experiment.end).toEqual('bigint');
      expect(typeof experiment.nbEvents).toEqual('number');
      expect(typeof experiment.start).toEqual('bigint');
    }
  });

  it('fetchIdentifier' , async () => {
    httpRequestMock.mockReturnValueOnce(fixtures.asResponse('fetch-identifier-0.json'));
    const response = await client.fetchIdentifier();
    const identifier = response.getModel()!;

    expect(response.getStatusCode()).toEqual(200);
    expect(identifier.version).toBeDefined();
    expect(identifier.os).toBeDefined();
    expect(identifier.osArch).toBeDefined();
    expect(identifier.osVersion).toBeDefined();
    expect(identifier.cpuCount).toBeDefined();
    expect(identifier.maxMemory).toBeDefined();
    expect(identifier.productId).toBeDefined();
  });

  it('fetchMarkerSets', async () => {
    httpRequestMock.mockReturnValueOnce(fixtures.asResponse('fetch-marker-sets-0.json'));
    const response = await client.fetchMarkerSets('not-relevant');
    const genericResponse = response.getModel()!;
    const markerSets = genericResponse.model;

    expect(markerSets).toHaveLength(1);
  });

  it('fetchStyles', async () => {
    httpRequestMock.mockReturnValueOnce(fixtures.asResponse('fetch-styles-0.json'));
    const response = await client.fetchStyles('not-relevant', 'not-relevant', new Query({}));
    const genericResponse = response.getModel()!;
    const testStyle = genericResponse.model.styles['Style key'];

    expect(typeof testStyle.values.height).toEqual('number');
    expect(typeof testStyle.values.opacity).toEqual('number');
  });

  it('fetchTableColumns', async () => {
    httpRequestMock.mockReturnValueOnce(fixtures.asResponse('fetch-table-columns-0.json'));
    const response = await client.fetchTableColumns('not-relevant', 'not-relevant', new Query({}));
    const genericResponse = response.getModel()!;
    const tableColumns = genericResponse.model;

    expect(tableColumns).toHaveLength(3);
    for (const tableColumn of tableColumns) {
      expect(typeof tableColumn.id).toEqual('number');
    }
  });

  it('fetchTableLines', async () => {
    httpRequestMock.mockReturnValueOnce(fixtures.asResponse('fetch-table-lines-0.json'));
    const response = await client.fetchTableLines('not-relevant', 'not-relevant', new Query({}));
    const genericResponse = response.getModel()!;
    const model = genericResponse.model;

    expect(typeof model.size).toEqual('number');
    expect(typeof model.lowIndex).toEqual('number');
    expect(model.lines).toHaveLength(2);
    for (const line of model.lines) {
      expect(typeof line.index).toEqual('number');
    }
  });

  it('fetchTimeGraphArrows', async () => {
    httpRequestMock.mockReturnValueOnce(fixtures.asResponse('fetch-timegraph-arrows-0.json'));
    const response = await client.fetchTimeGraphArrows('not-relevant', 'not-relevant', new Query({}));
    const genericResponse = response.getModel()!;
    const arrows = genericResponse.model;

    expect(arrows).toHaveLength(1);
    for (const arrow of arrows) {
      expect(typeof arrow.end).toEqual('bigint');
      expect(typeof arrow.sourceId).toEqual('number');
      expect(typeof arrow.start).toEqual('bigint');
      expect(typeof arrow.targetId).toEqual('number');
    }
  });

  it('fetchTimeGraphStates', async () => {
    httpRequestMock.mockReturnValueOnce(fixtures.asResponse('fetch-timegraph-states-0.json'));
    const response = await client.fetchTimeGraphStates('not-relevant', 'not-relevant', new Query({}));
    const genericResponse = response.getModel()!;
    const rows = genericResponse.model.rows;

    expect(rows).toHaveLength(1);
    for (const row of rows) {
      expect(typeof row.entryId).toEqual('number');
      for (const state of row.states) {
        expect(typeof state.end).toEqual('bigint');
        expect(typeof state.start).toEqual('bigint');
        if (state.tags !== undefined) {
          expect(typeof state.tags).toEqual('number');
        }
      }
    }
  });

  it('fetchTimeGraphTooltip', async () => {
    httpRequestMock.mockReturnValueOnce(fixtures.asResponse('fetch-timegraph-tooltip-0.json'));
    const response = await client.fetchTimeGraphTooltip('not-relevant', 'not-relevant', new Query({}));
    const genericResponse = response.getModel()!;
    const tooltips = genericResponse.model;

    expect(tooltips.key).toEqual('value');
  });

  it('fetchTimeGraphTree', async () => {
    httpRequestMock.mockReturnValueOnce(fixtures.asResponse('fetch-timegraph-tree-0.json'));
    const response = await client.fetchTimeGraphTree('not-relevant', 'not-relevant', new Query({}));
    const genericResponse = response.getModel()!;
    const model = genericResponse.model;

    expect(model.entries).toHaveLength(1);
    expect(model.headers).toHaveLength(0);
    for (const entry of model.entries) {
      expect(typeof entry.end).toEqual('bigint');
      expect(typeof entry.id).toEqual('number');
      expect(typeof entry.start).toEqual('bigint');
      const metadata = entry.metadata;
      expect(metadata).toBeDefined();
      const pids = metadata?.pid;
      expect(pids).toBeDefined();
      expect(pids).toHaveLength(2);
      expect(typeof pids[0]).toEqual('number');
      expect(typeof pids[1]).toEqual('number');
      expect(pids[0]).toEqual(1234)
      expect(pids[1]).toEqual(7777)
      const tids = metadata?.tid;
      expect(tids).toBeDefined();
      expect(tids).toHaveLength(1);
      expect(typeof tids[0]).toEqual('number');
      expect(tids[0]).toEqual(5678)
      const exec = metadata?.exec_name;
      expect(exec).toBeDefined();
      expect(exec).toHaveLength(1);
      expect(typeof exec[0]).toEqual('string');
      expect(exec[0]).toEqual('name')
    }
  });

  it('fetchXY', async () => {
    httpRequestMock.mockReturnValueOnce(fixtures.asResponse('fetch-xy-0.json'));

    // To throw or not to throw?
    // The `fetch-xy-0.json` fixture contains values too big for JS `number`
    // type, but the current implementation lossly converts those.
    // return expect(client.fetchXY('not-relevant', 'not-relevant', new Query({}))).rejects.toBe(Error);

    const response = await client.fetchXY('not-relevant', 'not-relevant', new Query({}));
    const genericResponse = response.getModel()!;
    const xy = genericResponse.model;

    expect(xy.series).toHaveLength(1);
    for (const serie of xy.series) {
      expect(typeof serie.seriesId).toEqual('number');
      expect(serie.xValues).toHaveLength(3);
      expect(serie.yValues).toHaveLength(3);
      for (const xValue of serie.xValues) {
        expect(typeof xValue).toEqual('bigint');
      }
      for (const yValue of serie.yValues) {
        expect(typeof yValue).toEqual('number');
      }
    }
  });

  it('fetchDataTree', async () => {
    httpRequestMock.mockReturnValueOnce(fixtures.asResponse('fetch-data-tree-0.json'));
    const response = await client.fetchDataTree('not-relevant', 'not-relevant', new Query({}));
    const genericResponse = response.getModel()!;
    const model = genericResponse.model;

    const EXPECTED_TRACE_MAX_RANGE = "[1571171542231247219,1571171543252848866]";
    const EXPECTED_HEADERS = [ { name: 'Label', tooltip: '' },
                               { name: 'Minimum', tooltip: '' },
                               { name: 'Maximum', tooltip: '' },
                               { name: 'Average', tooltip: '' },
                               { name: 'Std Dev', tooltip: '' },
                               { name: 'Count', tooltip: '', },
                               { name: 'Total', tooltip: '', },
                               { name: 'Min Time Range', tooltip: '', dataType: DataType.TIME_RANGE },
                               { name: 'Max Time Range', tooltip: '', dataType: DataType.TIME_RANGE }];

    expect(model.entries).toHaveLength(4);
    expect(model.headers).toHaveLength(9);

    let i = 0;
    for (const header of model.headers) {
        expect(header.name).toEqual(EXPECTED_HEADERS[i].name);
        expect(header.tooltip).toEqual(EXPECTED_HEADERS[i].tooltip);
        if (EXPECTED_HEADERS[i].dataType) {
          expect(header.dataType).toEqual(EXPECTED_HEADERS[i].dataType);
        }
        i++;
    }
    for (const entry of model.entries) {
      expect(typeof entry.id).toEqual('number');
    }
    const len = model.entries[0].labels.length;
    expect(model.entries[0].labels[len - 1]).toEqual(EXPECTED_TRACE_MAX_RANGE);
  });

  it('fetchXYTree', async () => {
    httpRequestMock.mockReturnValueOnce(fixtures.asResponse('fetch-xy-tree-0.json'));
    const response = await client.fetchXYTree('not-relevant', 'not-relevant', new Query({}));
    const genericResponse = response.getModel()!;
    const model = genericResponse.model;

    expect(model.entries).toHaveLength(1);
    expect(model.headers).toHaveLength(4);
    for (const entry of model.entries) {
      expect(typeof entry.id).toEqual('number');
    }
  });

  it('openTrace', async () => {
    httpRequestMock.mockReturnValueOnce(fixtures.asResponse('open-trace-0.json'));
    const response = await client.openTrace(new Query({}));
    const trace = response.getModel()!;

    expect(typeof trace.end).toEqual('bigint');
    expect(typeof trace.nbEvents).toEqual('number');
    expect(typeof trace.start).toEqual('bigint');
    expect(typeof trace.properties).toEqual('object');
  });

  it('configurationSourceTypes', async () => {
    httpRequestMock.mockReturnValueOnce(fixtures.asResponse('fetch-configuration-sources-0.json'));
    const response = await client.fetchConfigurationSourceTypes();
    const sourceTypes = response.getModel()!;

    expect(sourceTypes).toHaveLength(2);
    expect(sourceTypes[0].name).toEqual('My configuration source 1');
    expect(sourceTypes[0].description).toEqual('My configuration source 1 description');
    expect(sourceTypes[0].id).toEqual('my-source-type-1-id');
    
    expect(sourceTypes[0].parameterDescriptors).toBeDefined();
    const paramDesc: ConfigurationParameterDescriptor[] = sourceTypes[0].parameterDescriptors ?? [];
    expect(paramDesc).toHaveLength(2);

    expect(paramDesc[0].keyName).toEqual('path');
    expect(paramDesc[0].description).toEqual('path description');
    expect(paramDesc[0].dataType).toEqual('STRING');
    expect(paramDesc[0].isRequired).toBeTruthy();

    expect(paramDesc[1].keyName).toEqual('test1');
    expect(paramDesc[1].description).toBeUndefined();
    expect(paramDesc[1].dataType).toBeUndefined();
    expect(paramDesc[1].isRequired).toBeUndefined();
    expect(sourceTypes[0].schema).toBeUndefined();

    expect(sourceTypes[1].parameterDescriptors).toBeUndefined();
    expect(sourceTypes[1].schema).toBeDefined();
    const schema: {} = sourceTypes[1].schema ?? {}
    const schemaString: string = JSON.stringify(schema);
    expect(schemaString).toBeDefined();

    // check some scheme content
    expect(schema['$schema']).toBeDefined();
    expect(schema['$schema']).toEqual('https://json-schema.org/draft/2020-12/schema')

    expect(schema['$id']).toBeDefined();
    expect(schema['$id']).toEqual('https://org.eclipse.tracecompass/custom-execution-analysis.json')
  });

  it('configurations', async () => {
    httpRequestMock.mockReturnValueOnce(fixtures.asResponse('fetch-configurations-0.json'));
    const response = await client.fetchConfigurations("my-config-1-id");
    const configs = response.getModel()!;

    expect(configs).toHaveLength(2);
    expect(configs[0].name).toEqual('My configuration 1');
    expect(configs[0].description).toEqual('My configuration 1 description');
    expect(configs[0].id).toEqual('my-config-1-id');
    expect(configs[0].parameters).toBeDefined();
    expect(configs[0].parameters?.path).toBeDefined();
    expect(configs[0].parameters?.path).toEqual('/home/user/tmp');

    expect(configs[1].name).toEqual('My configuration 2');
    expect(configs[1].description).toBeUndefined()
    expect(configs[1].id).toEqual('my-config-2-id');
    expect(configs[1].parameters).toBeUndefined();
  });

  it('configuration', async () => {
    httpRequestMock.mockReturnValueOnce(fixtures.asResponse('configuration-0.json'));
    const response = await client.fetchConfiguration("my-source-type-1-id", "my-config-1-id");
    const config = response.getModel()!;
    
    expect(config.name).toEqual('My configuration 1');
    expect(config.description).toEqual('My configuration 1 description');
    expect(config.id).toEqual('my-config-1-id');
    expect(config.parameters).toBeDefined();
    expect(config.parameters?.path).toBeDefined();
    expect(config.parameters?.path).toEqual('/home/user/tmp');
  });

  it('createConfiguration', async () => {
    httpRequestMock.mockReturnValueOnce(fixtures.asResponse('configuration-0.json'));
    const response = await client.createConfiguration("my-source-type-1-id", new ConfigurationQuery('', undefined, {}));
    const config = response.getModel()!;

    expect(config.name).toEqual('My configuration 1');
    expect(config.description).toEqual('My configuration 1 description');
    expect(config.id).toEqual('my-config-1-id');
    expect(config.parameters).toBeDefined();
    expect(config.parameters?.path).toBeDefined();
    expect(config.parameters?.path).toEqual('/home/user/tmp');
  });

  it('updateConfiguration', async () => {
    httpRequestMock.mockReturnValueOnce(fixtures.asResponse('configuration-0.json'));
    const response = await client.updateConfiguration("my-source-type-1-id", "my-config-1-id", new ConfigurationQuery('', undefined, {}));
    const config = response.getModel()!;

    expect(config.name).toEqual('My configuration 1');
    expect(config.description).toEqual('My configuration 1 description');
    expect(config.id).toEqual('my-config-1-id');
    expect(config.parameters).toBeDefined();
    expect(config.parameters?.path).toBeDefined();
    expect(config.parameters?.path).toEqual('/home/user/tmp');
  });

  it('deleteConfiguration', async () => {
    httpRequestMock.mockReturnValueOnce(fixtures.asResponse('configuration-0.json'));
    const response = await client.deleteConfiguration("my-source-type-1-id", "my-config-1-id");
    const config = response.getModel()!;

    expect(config.name).toEqual('My configuration 1');
    expect(config.description).toEqual('My configuration 1 description');
    expect(config.id).toEqual('my-config-1-id');
    expect(config.parameters).toBeDefined();
    expect(config.parameters?.path).toBeDefined();
    expect(config.parameters?.path).toEqual('/home/user/tmp');
  });

  it('createOutputConfiguration', async () => {
    httpRequestMock.mockReturnValueOnce(fixtures.asResponse('output-configuration-0.json'));
    const config: OutputConfigurationQuery = QueryHelper.outputConfigurationQuery(
      'My new InAndOut',
      'org.eclipse.tracecompass.incubator.internal.inandout.core.config',
      'My special configuration',
      {
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
      }
    );

    const response = await client.createDerivedOutput(
      'd280b5ab-b0ff-38cf-b3e1-d33a0d56d1a3',
      'org.eclipse.tracecompass.incubator.inandout.core.analysis.inAndOutDataProviderFactory',
      config);

    const output = response.getModel()!;
    expect(output.name).toEqual('InAndOut Analysis (My new InAndOut)');
    expect(output.description).toEqual('Custom InAndOut analysis configured by "My new InAndOut"');
    expect(output.id).toEqual('org.eclipse.tracecompass.incubator.inandout.analysis85eec6d6-bea0-3680-84b6-f1a200e852d1');
    expect(output.parentId).toBeDefined();
    expect(output.parentId).toEqual('org.eclipse.tracecompass.incubator.inandout.core.analysis.inAndOutDataProviderFactory');
    expect(output.configuration).toBeDefined();
  });

  it('deleteOutputConfiguration', async () => {
    httpRequestMock.mockReturnValueOnce(fixtures.asResponse('output-configuration-0.json'));
    const response = await client.deleteDerivedOutput(
      'd280b5ab-b0ff-38cf-b3e1-d33a0d56d1a3',
      'org.eclipse.tracecompass.incubator.inandout.core.analysis.inAndOutdataProviderFactory',
      'org.eclipse.tracecompass.incubator.inandout.analysis85eec6d6-bea0-3680-84b6-f1a200e852d1');

    const output = response.getModel()!;
    expect(output).toBeDefined();
  });
});
