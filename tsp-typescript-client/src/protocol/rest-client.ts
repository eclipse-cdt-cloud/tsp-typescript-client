import fetch from 'node-fetch';
import { TspClientResponse } from './tsp-client-response';
import { JSONB as JSONBig, Schema } from "when-json-met-bigint";

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

    static get<T>(url: string, parameters?: Map<string, string>): Promise<TspClientResponse<T>>;
    static get<T>(url: string, parameters: Map<string, string> | undefined, schema: Schema): Promise<TspClientResponse<T>>;
    /**
     * Perform GET
     * @template T is the expected type of the json object returned by this request
     * @param url URL to query without query parameters
     * @param parameters Query parameters. Mapped keys and values are used to build the final URL
     */
    static async get<T>(url: string, parameters?: Map<string, string>, schema?: Schema) {
        let getUrl = url;
        if (parameters) {
            const urlParameters = this.encodeURLParameters(parameters);
            getUrl = getUrl.concat(urlParameters);
        }
        return this.performRequest('get', getUrl, undefined, schema);
    }

    static post<T>(url: string, body?: any): Promise<TspClientResponse<T>>;
    static post<T>(url: string, body: any, schema: Schema): Promise<TspClientResponse<T>>;
    /**
     * Perform POST
     * @template T is the expected type of the json object returned by this request
     * @param url URL to query
     * @param body Query object as defined by the Query interface
     */
    static async post<T>(url: string, body?: any, schema?: Schema) {
        return this.performRequest<T>('post', url, body, schema);
    }

    static put<T>(url: string, body?: any): Promise<TspClientResponse<T>>;
    static put<T>(url: string, body: any, schema: Schema): Promise<TspClientResponse<T>>;
    /**
     * Perform PUT
     * @template T is the expected type of the json object returned by this request
     * @param url URL to query
     * @param body Query object as defined by the Query interface
     */
    static async put<T>(url: string, body?: any, schema?: Schema) {
        return this.performRequest<T>('put', url, body, schema);
    }

    static delete<T>(url: string, parameters?: Map<string, string>): Promise<TspClientResponse<T>>;
    static delete<T>(url: string, parameters: Map<string, string> | undefined, schema: Schema): Promise<TspClientResponse<T>>;
    /**
     * Perform DELETE
     * @template T is the expected type of the json object returned by this request
     * @param url URL to query without query parameters
     * @param parameters Query parameters. Mapped keys and values are used to build the final URL
     */
    static async delete<T>(url: string, parameters?: Map<string, string>, schema?: Schema) {
        let deleteUrl = url;
        if (parameters) {
            const urlParameters = this.encodeURLParameters(parameters);
            deleteUrl = deleteUrl.concat(urlParameters);
        }
        return this.performRequest<T>('delete', deleteUrl, undefined, schema);
    }

    protected static async performRequest<T>(
        method: string,
        url: string,
        body?: any,
        schema?: Schema,
    ): Promise<TspClientResponse<T>> {
        const response = await this.httpRequest({
            url,
            method,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSONBig.stringify(body)
        });
        return new TspClientResponse(response.text, response.status, response.statusText, JSONBig.parse(response.text, null, schema));
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
            return '?' + Array.from(
                parameters,
                ([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
            ).join('&');
        }
        return '';
    }
}
