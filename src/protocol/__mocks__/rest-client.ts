import fetch from 'node-fetch';
import { TspClientResponse } from '../tsp-client-response';
import { OutputDescriptor } from '../../models/output-descriptor';

const response = {
  text: 'Test',
  status: 200,
  statusText: 'Success'
};

const output: OutputDescriptor = {
  id: 'One',
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

export class RestClient {
  private static async performRequest<T>(verb: string, url: string, body?: any): Promise<TspClientResponse<T>> {
    return new Promise((resolve, reject) => {
      let client: TspClientResponse<T> = new TspClientResponse(response.text, response.status, response.statusText);

      if (verb === 'get') {
        // In case a GET request contains parameters in the URL, extract them
        let params = this.extractParameters(url);
        if (params.length > 0) {
          if (params.includes('output')) {
            params = params.slice(0, params.indexOf('/'));
            let ar = [output];
            ar[0].id = params;
            client = new TspClientResponse(JSON.stringify(ar), response.status, response.statusText);
          } else {
            client = new TspClientResponse(params, response.status, response.statusText);
          }
        }
      } else if (verb === 'post') {
        // Check if POST request contains parameters in body
        if (typeof body === 'object' && body.parameters !== null) {
          const result = body.parameters.test;
          client = new TspClientResponse(result, response.status, response.statusText);
        } else {
          reject();
        }
      } else if (verb === 'delete' || verb === 'put') {
        const params = this.extractParameters(url);
        if (params.length > 0) {
          client = new TspClientResponse(params, response.status, response.statusText);
        } else {
          reject();
        }
      }

      resolve(client);
    });
  }

  public static async get<T>(url: string, parameters?: Map<string, string>): Promise<TspClientResponse<T>> {
    let getUrl = url;
    if (parameters) {
      const urlParameters = this.encodeURLParameters(parameters);
      getUrl = getUrl.concat(urlParameters);
    }
    return this.performRequest<T>('get', getUrl);
  }

  public static async post<T>(url: string, body?: any): Promise<TspClientResponse<T>> {
    return this.performRequest<T>('post', url, body);
  }

  public static async put<T>(url: string, body?: any): Promise<TspClientResponse<T>> {
    return this.performRequest<T>('put', url, body);
  }

  public static async delete<T>(url: string, parameters?: Map<string, string>): Promise<TspClientResponse<T>> {
    let deleteUrl = url;
    if (parameters) {
      const urlParameters = this.encodeURLParameters(parameters);
      deleteUrl = deleteUrl.concat(urlParameters);
    }
    return this.performRequest<T>('delete', deleteUrl);
  }

  private static encodeURLParameters(parameters: Map<string, string>): string {
    if (parameters.size) {
      const urlParameters: string = '?';
      const parametersArray: string[] = [];
      parameters.forEach((value, key) => {
        parametersArray.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
      });
      return urlParameters.concat(parametersArray.join('&'));
    }
    return '';
  }

  public static extractParameters(url: string): string {
    const topic = url.includes('traces') ? 'traces' : 'experiments';
    const ar = url.split(topic + '/');
    return url.slice(url.indexOf(topic) + topic.length + 1);
  }
}
