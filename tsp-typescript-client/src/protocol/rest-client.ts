import fetch from 'node-fetch';
import { TspClientResponse } from './tsp-client-response';

/**
 * Rest client helper to make request.
 * The request response status code indicates if the request is successful.
 * The json object in the response may be undefined when an error occurs.
 */
export class RestClient {
    private static readonly BIGINT_FIELDS = ['start', 'end', 'time', 'duration', 'startTime', 'endTime'];

    private static async performRequest<T>(verb: string, url: string, body?: any): Promise<TspClientResponse<T>> {
        /*
         * To avoid loss of precision, bigint values are replaced by quoted strings before
         * serialization and then replaced by an unquoted number in the JSON request.
         *
         * In JSON responses, large numbers are replaced by quoted strings before parsing,
         * and then replaced by either a bigint or number value depending on the field.
         * Finally for bigint fields, small numbers are replaced by their bigint value.
         */

        // 1234567890123456789n => "1234567890123456789n"
        /*
         * A custom BigInt.prototype.toJSON can be implemented by users,
         * which will take precedence over the replacer. Meaning the
         * value passed in the replacer is the result of toJSON but NOT
         * the original BigInt. As a workaround, we force our implementation
         * instead of using replacer.
         */
        // @ts-expect-error not declare toJSON to avoid poluting user's type
        const toJSON = BigInt.prototype.toJSON;
        // @ts-expect-error not declare toJSON to avoid poluting user's type
        BigInt.prototype.toJSON = function () {
            return this.toString() + 'n';
        };
        let jsonBody: string = JSON.stringify(body);
        // @ts-expect-error not declare toJSON to avoid poluting user's type
        BigInt.prototype.toJSON = toJSON;
        if (jsonBody) {
            // {"key":"1234567890123456789n"} => {"key":1234567890123456789}
            jsonBody = jsonBody.replace(/"(-?\d+)n"/g, '$1');
        }
        const response = await fetch(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: verb,
            body: jsonBody
        });
        let text = await response.text();

        if (text) {
            // {key1:123,key2:1234567890123456789} => {key1:123,key2:"1234567890123456789n"}
            text = text.replace(/:(-?\d{16,})([,}])/g, ':\"$1n\"$2');
        }
        const reviver = (key, value) => {
            if (typeof value === 'string') {
                const matchArray = value.match(/(-?\d{16,})n/);
                if (matchArray) {
                    if (RestClient.BIGINT_FIELDS.includes(key)) {
                        // "1234567890123456789n" => 1234567890123456789n
                        return BigInt(matchArray[1]);
                    } else {
                        // "1234567890123456789n" => 1234567890123456900
                        return Number(matchArray[1]);
                    }
                }
            } else if (typeof value === 'number' && RestClient.BIGINT_FIELDS.includes(key)) {
                // 123 => 123n
                return BigInt(value);
            }
            return value;
        };
        return new TspClientResponse(text, response.status, response.statusText, reviver);
    }

    /**
     * Perform GET
     * T is the expected type of the json object returned by this request
     * @param url URL to query without query parameters
     * @param parameters Query parameters. Mapped keys and values are used to build the final URL
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
     * @param parameters Query parameters. Mapped keys and values are used to build the final URL
     */
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
}
