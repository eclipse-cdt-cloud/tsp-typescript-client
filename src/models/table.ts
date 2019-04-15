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

export interface ColumnsModel {
    columns: ColumnHeaderEntry[];
}

/**
 * Model of a table
 */
export interface TableModel {
    /**
     * Index of the first returned line
     */
    index: number;

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
