/********************************************************************************
 * Copyright (C) 2018 Ericsson and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 ********************************************************************************/

import fetch from 'node-fetch';

/**
 * Rest client helper to make request.
 * Errors are thrown when the request response is not 200.
 */
export class RestClient {
    private static async performRequest(verb: string, url: string, body?: any) {
        const response = await fetch(url, {
            method: verb,
            body: body
        });

        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response.json();
    }

    /**
     * Perform GET
     * @param url URL to query without query parameters
     * @param parameters Query parameters. The string should be in this format: key1=value1&key2=value2
     */
    public static async get(url: string, parameters?: string): Promise<any> {
        const getUrl = parameters !== undefined && parameters.length > 0 ? url + '?' + parameters : url;
        return this.performRequest('get', getUrl);
    }

    /**
     * Perform POST
     * @param url URL to query
     * @param body Query object as defined by the Query interface
     */
    public static async post(url: string, body?: any): Promise<any> {
        return this.performRequest('post', url, body);
    }

    /**
     * Perform PUT
     * @param url URL to query
     * @param body Query object as defined by the Query interface
     */
    public static async put(url: string, body?: any): Promise<any> {
        return this.performRequest('put', url, body);
    }

    /**
     * Perform DELETE
     * @param url URL to query without query parameters
     * @param parameters Query parameters. The string should be in this format: key1=value1&key2=value2
     */
    public static async delete(url: string, parameters?: string): Promise<any> {
        const deleteUrl = parameters !== undefined && parameters.length > 0 ? url + '?' + parameters : url;
        return this.performRequest('delete', deleteUrl);
    }
}
