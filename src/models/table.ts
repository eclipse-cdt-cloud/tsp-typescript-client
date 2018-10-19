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
 * Column header
 */
export interface ColumnHeaderEntry {
    /**
     * Unique ID
     */
    id: number;

    /**
     * Displayed name for this column
     */
    name: string;

    /**
     * Description of the column
     */
    columnDescription: string;

    /**
     * Hint on the Type of data associated to the column
     */
    columnType: string;
}

/**
 * Line of a table
 */
export interface Line {
    /**
     * Index of the line
     */
    index: number;

    /**
     * Array of cells that compose the line
     */
    cells: Cell[];

    /**
     * Tag associated to the line, used when the line pass a filter
     */
    tags: number;
}

/**
 * Cell inside a table line
 */
export interface Cell {
    /**
     * Content of the cell, can use markdown for formatting
     */
    content: string;

    /**
     * Tag associated to the cell, used when the cell pass a filter
     */
    tags: number;
}

/**
 * Model of a table
 */
export interface Table {
    /**
     * Index of the first returned line
     */
    lowIndex: number;

    /**
     * Number of lines
     */
    size: number;

    /**
     * Columns of the table represented by their respective Id
     */
    columnId: number[];

    /**
     * Lines
     */
    lines: Line[];
}
