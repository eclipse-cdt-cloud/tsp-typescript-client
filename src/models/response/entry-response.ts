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

import { OutputDescriptor } from '../output-descriptor';
import { ResponseStatus } from './responses';

/**
 * Generic entry/tree response
 */
export interface GenericEntryResponse<T> {
    /**
     * Output descriptor
     */
    output: OutputDescriptor;

    /**
     * Array of entries of type T
     */
    entries: T[];

    /**
     * Number of entries in the model
     */
    size: number;

    /**
     * Response status as described by ResponseStatus
     */
    status: ResponseStatus;

    /**
     * Message associated with the response
     */
    statusMessage: string;
}
