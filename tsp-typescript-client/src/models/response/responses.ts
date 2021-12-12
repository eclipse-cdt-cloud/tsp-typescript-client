import { Schema } from 'when-json-met-bigint';

/**
 * Response status
 */
export enum ResponseStatus {
    /**
     * Model is partial, data provider is still computing. If this status is
     * returned, it's viewer responsability to request again the data provider after
     * waiting some time. Request data provider until COMPLETED status is received
     */
    RUNNING = 'RUNNING',
    /**
     * Model is complete, no need to request data provider again
     */
    COMPLETED = 'COMPLETED',
    /**
     * Error happened. Please see logs or detailed message of status.
     */
    FAILED = 'FAILED',
    /**
     * Task has been cancelled. Please see logs or detailed message of status.
     */
    CANCELLED = 'CANCELLED'
}

export const GenericResponseSchema = (schema: Schema): Schema => ({ model: schema });

/**
 * Generic response that contains a model
 */
export interface GenericResponse<T> {
    /**
     * Model of type T
     */
    model: T;

    /**
     * Response status as described by ResponseStatus
     */
    status: ResponseStatus;

    /**
     * Message associated with the response
     */
    statusMessage: string;
}
