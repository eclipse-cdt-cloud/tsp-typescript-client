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

/**
 * Descriptor of a specific output provider
 */
export interface OutputDescriptor {
    /**
     * Output provider's ID
     */
    ID: string;

    /**
     * Human readable name
     */
    name: string;

    /**
     * Description of the output provider
     */
    description: string;

    /**
     * Type of data returned by this output.
     * Serve as a hint to determine what kind of view should be use for this output (ex. XY, Time Graph, Table, etc..)
     */
    responseType: string;

    /**
     * Map of query parameters that the provider accept
     */
    queryParameters: Map<string, any>;

    /**
     * Start time
     */
    start: number;

    /**
     * End time
     */
    end: number;

    /**
     * Indicate if the start, end times and current model are final,
     * or if they will need to be refreshed later to represent a more up to date version
     */
    final: boolean;

    /**
     * List of compatible outputs that can be used in the same view (ex. as overlay)
     */
    compatibleProviders: string[];
}
