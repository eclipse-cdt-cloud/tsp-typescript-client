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

import { Trace } from './trace';

/**
 * Model of an experiment that contain one or more traces
 */
export interface Experiment {
    /**
     * Experiment's unique identifier
     */
    UUID: string;

    /**
     * User defined name for the experiment
     */
    name: string;

    /**
     * Experiment's start time
     */
    start: number;

    /**
     * Experiment's end time
     */
    end: number;

    /**
     * Current number of events
     */
    nbEvents: number;

    /**
     * Indicate if the indexing of the experiment is completed or still running.
     * If it still running, the end time and number of events are not final
     */
    indexingStatus: string;

    /**
     * Array of all the Trace contained in the experiment
     */
    traces: Trace[];
}
