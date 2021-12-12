import { Schema } from 'when-json-met-bigint';
import { assertNumber } from '../protocol/serialization';

export const ColumnHeaderEntrySchema: Schema = {
    id: assertNumber,
};

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
    description: string;

    /**
     * Hint on the Type of data associated to the column
     */
    type: string;
}

export const CellSchema: Schema = {
    tags: assertNumber,
};

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
    tags?: number;
}

export const LineSchema = {
    cells: [CellSchema],
    index: assertNumber,
    tags: assertNumber,
};

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
    tags?: number;
}

export const TableModelSchema = {
    columnIds: [assertNumber],
    lines: [LineSchema],
    lowIndex: assertNumber,
    size: assertNumber,
};

/**
 * Model of a table
 */
export interface TableModel {
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
    columnIds: number[];

    /**
     * Lines
     */
    lines: Line[];
}
