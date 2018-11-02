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
 * Basic entry interface
 */
export interface BasicEntry {
    /**
     * Unique Id for the entry
     */
    id: number;

    /**
     * Parent entry Id, or -1 if the entry does not have a parent
     */
    parentId: number;

    /**
     * Array of string that represant the content of each column
     */
    name: string[];
}

/**
 * Entry header
 */
export interface EntryHeader {
    /**
     * Displayed name
     */
    name: string
}
