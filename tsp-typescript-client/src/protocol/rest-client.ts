import fetch from 'node-fetch';
import { Deserialized, Normalizer } from './serialization';
import { TspClientResponse } from './tsp-client-response';
import JSONBigConfig = require('json-bigint');

const JSONBig = JSONBigConfig({
    useNativeBigInt: true,
});

export interface HttpRequest {
    method: string,
    url: string,
    body?: string
    headers?: Record<string, string>
}

export interface HttpResponse {
    text: string
    status: number
    statusText: string
}

/**
 * Rest client helper to make request.
 * The request response status code indicates if the request is successful.
 * The json object in the response may be undefined when an error occurs.
 */
export class RestClient {

    static get<T>(url: string, parameters?: Map<string, string>): Promise<TspClientResponse<Deserialized<T>>>;
    static get<T>(url: string, parameters: Map<string, string> | undefined, normalizer: Normalizer<T>): Promise<TspClientResponse<T>>;
    /**
     * Perform GET
     * @template T is the expected type of the json object returned by this request
     * @param url URL to query without query parameters
     * @param parameters Query parameters. Mapped keys and values are used to build the final URL
     */
    static async get<T>(url: string, parameters?: Map<string, string>, normalizer?: Normalizer<T>) {
        let getUrl = url;
        if (parameters) {
            const urlParameters = this.encodeURLParameters(parameters);
            getUrl = getUrl.concat(urlParameters);
        }
        return this.performRequest('get', getUrl, undefined, normalizer);
    }

    static post<T>(url: string, body?: any): Promise<TspClientResponse<Deserialized<T>>>;
    static post<T>(url: string, body: any, normalizer: Normalizer<T>): Promise<TspClientResponse<T>>;
    /**
     * Perform POST
     * @template T is the expected type of the json object returned by this request
     * @param url URL to query
     * @param body Query object as defined by the Query interface
     */
    static async post<T>(url: string, body?: any, normalizer?: Normalizer<T>) {
        return this.performRequest<T>('post', url, body, normalizer);
    }

    static put<T>(url: string, body?: any): Promise<TspClientResponse<Deserialized<T>>>;
    static put<T>(url: string, body: any, normalizer: Normalizer<T>): Promise<TspClientResponse<T>>;
    /**
     * Perform PUT
     * @template T is the expected type of the json object returned by this request
     * @param url URL to query
     * @param body Query object as defined by the Query interface
     */
    static async put<T>(url: string, body?: any, normalizer?: Normalizer<T>) {
        return this.performRequest<T>('put', url, body, normalizer);
    }

    static delete<T>(url: string, parameters?: Map<string, string>): Promise<TspClientResponse<Deserialized<T>>>;
    static delete<T>(url: string, parameters: Map<string, string> | undefined, normalizer: Normalizer<T>): Promise<TspClientResponse<T>>;
    /**
     * Perform DELETE
     * @template T is the expected type of the json object returned by this request
     * @param url URL to query without query parameters
     * @param parameters Query parameters. Mapped keys and values are used to build the final URL
     */
    static async delete<T>(url: string, parameters?: Map<string, string>, normalizer?: Normalizer<T>) {
        let deleteUrl = url;
        if (parameters) {
            const urlParameters = this.encodeURLParameters(parameters);
            deleteUrl = deleteUrl.concat(urlParameters);
        }
        return this.performRequest<T>('delete', deleteUrl, undefined, normalizer);
    }

    protected static async performRequest<T>(
        method: string,
        url: string,
        body?: any,
        normalizer?: Normalizer<T>,
    ): Promise<TspClientResponse<Deserialized<T>>> {
        const response = await this.httpRequest({
            url,
            method,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: this.jsonStringify(body)
        });
        const parsed = this.jsonParse(response.text);
        const responseModel = normalizer ? normalizer(parsed) : parsed;
        return new TspClientResponse(response.text, response.status, response.statusText, responseModel);
    }

    protected static async httpRequest(req: HttpRequest): Promise<HttpResponse> {
        const { url, method, body, headers } = req;
        const response = await fetch(url, { method, headers, body });
        const text = await response.text();
        return {
            text,
            status: response.status,
            statusText: response.statusText,
        };
    }

    protected static encodeURLParameters(parameters: Map<string, string>): string {
        if (parameters.size) {
            let query = '?';
            for (const [key, value] of parameters) {
                query += `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
            }
            return query;
        }
        return '';
    }

    /**
     * Stringify JS objects. Can stringify `BigInt` values.
     */
     protected static jsonStringify(data: any): string {
        return JSONBig.stringify(data);
    }

    /**
     * Parse JSON-encoded data. If a number is too large to fit into a regular
     * `number` then it will be deserialized as `BigInt`.
     */
    protected static jsonParse(text: string): any {
        return JSONBig.parse(text);
    }
}
