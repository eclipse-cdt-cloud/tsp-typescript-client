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
  start: BigInt(1),
  end: BigInt(10),
  final: false,
  compatibleProviders: ['One', 'Two']
};

export class RestClient {
  /**
   * Perform request
   * Mocks the request call without calling the real backend.
   * @param verb RestAPI verb
   * @param url URL to query
   * @param body Query object as defined by the Query interface
   * @return A TspClientResponse object
   */
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
            const replacer = (_key, value) => (typeof value === 'bigint') ? value.toString() + 'n' : value;
            const reviver = (_key, value) => (typeof value === 'string' && value.match(/(-?\d+)n/)) ? BigInt(value.slice(0, -1)) : value;
            client = new TspClientResponse(JSON.stringify(ar, replacer), response.status, response.statusText, reviver);
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

  /**
   * Perform GET
   * T is the expected type of the json object returned by this request
   * @param url URL to query without query parameters
   * @param parameters Query parameters. Mapped keys and values are used to build the final URL
   * @return A TspClientResponse object
   */
  public static async get<T>(url: string, parameters?: Map<string, string>): Promise<TspClientResponse<T>> {
    let getUrl = url;
    if (parameters) {
      const urlParameters = this.encodeURLParameters(parameters);
      getUrl = getUrl.concat(urlParameters);
    }
    return this.performRequest<T>('get', getUrl);
  }

  /**
   * Perform POST
   * T is the expected type of the json object returned by this request
   * @param url URL to query
   * @param body Query object as defined by the Query interface
   * @return A TspClientResponse object
   */
  public static async post<T>(url: string, body?: any): Promise<TspClientResponse<T>> {
    return this.performRequest<T>('post', url, body);
  }

  /**
   * Perform PUT
   * T is the expected type of the json object returned by this request
   * @param url URL to query
   * @param body Query object as defined by the Query interface
   * @return A TspClientResponse object
   */
  public static async put<T>(url: string, body?: any): Promise<TspClientResponse<T>> {
    return this.performRequest<T>('put', url, body);
  }

  /**
   * Perform DELETE
   * T is the expected type of the json object returned by this request
   * @param url URL to query without query parameters
   * @param parameters Query parameters. Mapped keys and values are use to build the final URL
   * @return A TspClientResponse object
   */
  public static async delete<T>(url: string, parameters?: Map<string, string>): Promise<TspClientResponse<T>> {
    let deleteUrl = url;
    if (parameters) {
      const urlParameters = this.encodeURLParameters(parameters);
      deleteUrl = deleteUrl.concat(urlParameters);
    }
    return this.performRequest<T>('delete', deleteUrl);
  }

  /**
   * Encode URL parameters
   * @param parameters Query parameters. Mapped keys and values are used to build the final URL
   * @return Encoded string
   */
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

  /**
    * Extract parameters
    * @param url URL string
    * @return String containing the parameters extracted from the url
    */
  public static extractParameters(url: string): string {
    const topic = url.includes('traces') ? 'traces' : 'experiments';
    const ar = url.split(topic + '/');
    return url.slice(url.indexOf(topic) + topic.length + 1);
  }
}
