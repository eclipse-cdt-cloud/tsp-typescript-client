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
 * Model for bookmark
 */
export interface Bookmark {
    /**
     * Unique Id of the bookmark
     */
    UUID: string;

    /**
     * Name of the bookmark
     */
    name: string;

    /**
     * Start time for the bookmark
     */
    startTime: number;

    /**
     * End time for the bookmark
     */
    endTime: number;

    /**
     * Type of the bookmark
     */
    type: string;
}
