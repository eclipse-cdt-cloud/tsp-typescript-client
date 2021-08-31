import fetch from 'node-fetch';
import { TspClientResponse } from '../tsp-client-response';

const response = {
  text: 'Test',
  status: 200,
  statusText: 'Success'
};

export class RestClient {
  private static async performRequest<T>(verb: string, url: string, body?: any): Promise<TspClientResponse<T>> {
    return new Promise((resolve, reject) => {
      let client: TspClientResponse<T> = new TspClientResponse(response.text, response.status, response.statusText);

      if (url.includes('traces')) {
        let ar = url.split('traces/');
        let i = url.indexOf('traces');
        let params = url.slice(i + 7);
        if (params.length > 0) {
          client = new TspClientResponse(params, response.status, response.statusText);
        }
      }

      resolve(client);
    });
  }

  /**
   * Perform GET
   * T is the expected type of the json object returned by this request
   * @param url URL to query without query parameters
   * @param parameters Query parameters. Map keys and values are used to build the final URL
   */
  public static async get<T>(url: string, parameters?: Map<string, string>): Promise<TspClientResponse<T>> {
    let getUrl = url;
    if (parameters) {
      const urlParameters = this.encodeURLParameters(parameters);
      getUrl = getUrl.concat(urlParameters);
    }
    return this.performRequest<T>('get', getUrl);
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
}
