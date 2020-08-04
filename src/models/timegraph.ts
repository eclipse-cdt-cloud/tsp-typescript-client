import { Entry } from './entry';
import { OutputElementStyle } from './styles';

/**
 * Entry in a time graph
 */
export interface TimeGraphEntry extends Entry {
    /**
     * Start time of the entry
     */
    start: number;

    /**
     * End time of the entry
     */
    end: number;
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
    start: number;

    /**
     * End time of the state
     */
    end: number;

    /**
     * Label to apply to the state
     */
    label?: string;

    /**
     * Tags for the state, used when the state pass a filter
     */
    tags?: number;

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
    targetId: number;

    /**
     * Start time of the arrow
     */
    start: number;

    /**
     * Duration of the arrow
     */
    end: number;

    /**
     * Optional information on the style to format this arrow
     */
    style?: OutputElementStyle;
}
