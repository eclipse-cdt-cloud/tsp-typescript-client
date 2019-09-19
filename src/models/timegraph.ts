import { Entry } from './entry';
import { OutputElementStyle } from './styles';

/**
 * Entry in a time graph
 */
export interface TimeGraphEntry extends Entry {
    /**
     * Type of the entry
     */
    type: string;

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
 * Time Graph model that will be returned by the server
 */
export interface TimeGraphModel {
    rows: TimeGraphRow[];
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
    duration: number;

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
     * Optional information on the style to format this state
     */
    style?: OutputElementStyle;
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
     * Optional information on the style to format this arrow
     */
    style?: OutputElementStyle;
}
