/**
 * Model of a filter
 */
export interface Filter {
    /**
     * Unique Id of the filter
     */
    id: string;

    /**
     * Human readable name
     */
    name: string;

    /**
     * Start time of the filter
     */
    startTime: bigint;

    /**
     * End time of the filter
     */
    endTime: bigint;

    /**
     * Expression from the filtering language
     */
    expression: string;

    /**
     * Tags to be applied on elements that pass the filter
     */
    tags: number;
}
