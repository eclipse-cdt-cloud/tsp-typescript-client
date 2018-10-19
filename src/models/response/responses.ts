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

/**
 * Response status
 */
export enum ResponseStatus {
    /**
     * Model is partial, data provider is still computing. If this status is
     * returned, it's viewer responsability to request again the data provider after
     * waiting some time. Request data provider until COMPLETED status is received
     */
    RUNNING = 'RUNNING',
    /**
     * Model is complete, no need to request data provider again
     */
    COMPLETED = 'COMPLETED',
    /**
     * Error happened. Please see logs or detailed message of status.
     */
    FAILED = 'FAILED',
    /**
     * Task has been cancelled. Please see logs or detailed message of status.
     */
    CANCELLED = 'CANCELLED'
}

/**
 * Generic response that contains a model
 */
export interface GenericResponse<T> {
    /**
     * Model of type T
     */
    model: T;

    /**
     * Output descriptor
     */
    output: OutputDescriptor;

    /**
     * Response status as described by ResponseStatus
     */
    status: ResponseStatus;

    /**
     * Message associated with the response
     */
    statusMessage: string;
}
