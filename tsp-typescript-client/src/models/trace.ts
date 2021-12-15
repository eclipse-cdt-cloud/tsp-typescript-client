import { Schema } from 'when-json-met-bigint';
import { assertNumber, bigint } from '../protocol/serialization';

export const TraceSchema: Schema<Trace> = {
    end: bigint,
    nbEvents: assertNumber,
    start: bigint,
};

/**
 * Model of a single trace
 */
export interface Trace {
    /**
     * Trace's unique identifier
     */
    UUID: string;

    /**
     * User defined name for the trace
     */
    name: string;

    /**
     * Trace's start time
     */
    start: bigint;

    /**
     * Trace's end time
     */
    end: bigint;

    /**
     * URI of the trace
     */
    path: string;

    /**
     * Current number of events
     */
    nbEvents: number;

    /**
     * Indicate if the indexing of the trace is completed or still running.
     * If it still running, the end time and number of events are not final
     */
    indexingStatus: string;
}
