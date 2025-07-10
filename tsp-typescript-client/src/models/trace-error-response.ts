import { ErrorResponse } from "./error-response";
import { Trace } from "./trace";

/**
 * Model of an error response
 */
export interface TraceErrorResponse extends ErrorResponse {
    /**
     * The trace that this error corresponds to.
     */
    trace: Trace;
}
