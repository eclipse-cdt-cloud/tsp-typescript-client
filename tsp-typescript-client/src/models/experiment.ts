import { Schema } from 'when-json-met-bigint';
import { assertNumber, bigint } from '../protocol/serialization';
import { TraceSchema, Trace } from './trace';

export const ExperimentSchema: Schema<Experiment> = {
    end: bigint,
    nbEvents: assertNumber,
    start: bigint,
    traces: [TraceSchema],
};

/**
 * Model of an experiment that contain one or more traces
 */
export interface Experiment {
    /**
     * Experiment's unique identifier
     */
    UUID: string;

    /**
     * User defined name for the experiment
     */
    name: string;

    /**
     * Experiment's start time
     */
    start: bigint;

    /**
     * Experiment's end time
     */
    end: bigint;

    /**
     * Current number of events
     */
    nbEvents: number;

    /**
     * Indicate if the indexing of the experiment is completed or still running.
     * If it still running, the end time and number of events are not final
     */
    indexingStatus: string;

    /**
     * Array of all the Trace contained in the experiment
     */
    traces: Trace[];
}
