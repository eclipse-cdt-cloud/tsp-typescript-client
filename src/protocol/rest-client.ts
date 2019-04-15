import fetch from 'node-fetch';
import { TspClientResponse } from './tsp-client-response';

/**
 * Rest client helper to make request.
 * Errors are thrown when the request response is not 200.
 */
export class RestClient {
    private static async performRequest<T>(verb: string, url: string, body?: any): Promise<TspClientResponse<T>> {
        const jsonBody: string = JSON.stringify(body);
        const response = await fetch(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: verb,
            body: jsonBody
        });
        const json = await response.json() as T;
        return new TspClientResponse(json, response.status, response.statusText);
    }

    /**
     * Perform GET
     * T is the expected type of the json object returned by this request
     * @param url URL to query without query parameters
     * @param parameters Query parameters. The string should be in this format: key1=value1&key2=value2
     */
    public static async get<T>(url: string, parameters?: string): Promise<TspClientResponse<T>> {
        const getUrl = parameters !== undefined && parameters.length > 0 ? url + '?' + parameters : url;
        return this.performRequest<T>('get', getUrl);
    }

    /**
     * Perform POST
     * T is the expected type of the json object returned by this request
     * @param url URL to query
     * @param body Query object as defined by the Query interface
     */
    public static async post<T>(url: string, body?: any): Promise<TspClientResponse<T>> {
        return this.performRequest<T>('post', url, body);
    }

    /**
     * Perform PUT
     * T is the expected type of the json object returned by this request
     * @param url URL to query
     * @param body Query object as defined by the Query interface
     */
    public static async put<T>(url: string, body?: any): Promise<TspClientResponse<T>> {
        return this.performRequest<T>('put', url, body);
    }

    /**
     * Perform DELETE
     * T is the expected type of the json object returned by this request
     * @param url URL to query without query parameters
     * @param parameters Query parameters. The string should be in this format: key1=value1&key2=value2
     */
    public static async delete<T>(url: string, parameters?: string): Promise<TspClientResponse<T>> {
        const deleteUrl = parameters !== undefined && parameters.length > 0 ? url + '?' + parameters : url;
        return this.performRequest<T>('delete', deleteUrl);
    }
}
