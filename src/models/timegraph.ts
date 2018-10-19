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

import { BasicEntry } from './tree';

/**
 * Entry in a time graph
 */
export interface TimeGraphEntry extends BasicEntry {
    /**
     * Start time of the entry
     */
    startTime: number;

    /**
     * End time of the entry
     */
    endTime: number;

    /**
     * Indicate if the entry will have row data
     */
    hasRowModel: boolean;
}

/**
 * Time graph row described by an array of states for a specific entry
 */
export interface TimeGraphRow {
    /**
     * Entry Id associated to the state array
     */
    entryId: number;

    /**
     * Array of states
     */
    states: TimeGraphState[];
}

/**
 * Time graph state
 */
export interface TimeGraphState {
    /**
     * Start time of the state
     */
    startTime: number;

    /**
     * End time of the state
     */
    endTime: number;

    /**
     * Label to apply to the state
     */
    label: string;

    /**
     * Values associated to the state
     */
    value: number;

    /**
     * Tags for the state, used when the state pass a filter
     */
    tags: number;

    /**
     * Optional class to refer to the css in order to format the state
     */
    cssClass: string;
}

/**
 * Arrow for time graph
 */
export interface TimeGraphArrow {
    /**
     * Source entry Id for the arrow
     */
    sourceId: number;

    /**
     * Destination entry Id for the arrow
     */
    destinationId: number;

    /**
     * Start time of the arrow
     */
    startTime: number;

    /**
     * Duration of the arrow
     */
    duration: number;

    /**
     * Value associated to the arrow
     */
    value: number;

    /**
     * Optional class to refer to the css in order to format the arrow
     */
    cssClass: string;
}
