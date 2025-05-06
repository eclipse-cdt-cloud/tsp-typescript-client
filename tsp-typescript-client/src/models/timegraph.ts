import { array, assertNumber, createNormalizer } from '../protocol/serialization';
import { Entry } from './entry';
import { OutputElementStyle } from './styles';

export const TimeGraphEntry = createNormalizer<TimeGraphEntry>({
    end: BigInt,
    id: assertNumber,
    parentId: assertNumber,
    start: BigInt,
    style: OutputElementStyle,
    metadata: undefined,
});

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

const TimeGraphState = createNormalizer<TimeGraphState>({
    end: BigInt,
    start: BigInt,
    label: assertNumber,
    tags: assertNumber,
    style: assertNumber,
});

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
    label?: number;

    /**
     * Tags for the state, used when the state pass a filter
     */
    tags?: number;

    /**
     * Optional information on the style to format this state
     */
    style?: number;
}

export const TimeGraphRow = createNormalizer<TimeGraphRow>({
    styles: array(OutputElementStyle),
    entryId: assertNumber,
    startTime: BigInt,
    states: array(TimeGraphState),
});

/**
 * Time graph row described by an array of states for a specific entry
 */
export interface TimeGraphRow {
    /**
     * Labels for the row
     */
    labels: string[];

    /**
     * Styles for the row
     */
    styles: OutputElementStyle[]
    
    /**
     * Entry Id associated to the state array
     */
    entryId: number;

    /**
     * Start time of the row
     */
    startTime: bigint;

    /**
     * Array of states
     */
    states: TimeGraphState[];
}

export const TimeGraphModel = createNormalizer<TimeGraphModel>({
    rows: array(TimeGraphRow),
});

/**
 * Time Graph model that will be returned by the server
 */
export interface TimeGraphModel {
    rows: TimeGraphRow[];
}

export const TimeGraphArrow = createNormalizer<TimeGraphArrow>({
    end: BigInt,
    sourceId: assertNumber,
    start: BigInt,
    targetId: assertNumber,
    style: OutputElementStyle,
});

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
