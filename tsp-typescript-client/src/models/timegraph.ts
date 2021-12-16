import { Schema } from 'when-json-met-bigint';
import { assertNumber, bigint } from '../protocol/serialization';
import { Entry } from './entry';
import { OutputElementStyle } from './styles';

export const TimeGraphEntrySchema: Schema<TimeGraphEntry> = {
    end: bigint,
    id: assertNumber,
    parentId: assertNumber,
    start: bigint,
};

/**
 * Entry in a time graph
 */
export interface TimeGraphEntry extends Entry {
    /**
     * Start time of the entry
     */
    start: bigint;

    /**
     * End time of the entry
     */
    end: bigint;
}

const TimeGraphStateSchema: Schema<TimeGraphState> = {
    end: bigint,
    start: bigint,
    tags: assertNumber,
};

/**
 * Time graph state
 */
export interface TimeGraphState {
    /**
     * Start time of the state
     */
    start: bigint;

    /**
     * End time of the state
     */
    end: bigint;

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

export const TimeGraphRowSchema: Schema<TimeGraphRow> = {
    entryId: assertNumber,
    states: [TimeGraphStateSchema],
};

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

export const TimeGraphModelSchema: Schema<TimeGraphModel> = {
    rows: [TimeGraphRowSchema],
};

/**
 * Time Graph model that will be returned by the server
 */
export interface TimeGraphModel {
    rows: TimeGraphRow[];
}

export const TimeGraphArrowSchema: Schema<TimeGraphArrow> = {
    end: bigint,
    sourceId: assertNumber,
    start: bigint,
    targetId: assertNumber,
};

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
    start: bigint;

    /**
     * Duration of the arrow
     */
    end: bigint;

    /**
     * Optional information on the style to format this arrow
     */
    style?: OutputElementStyle;
}
