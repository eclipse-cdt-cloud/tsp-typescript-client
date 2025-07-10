import { ErrorResponse } from "./error-response";
import { Experiment } from "./experiment";

/**
 * Model of an error response
 */
export interface TraceErrorResponse extends ErrorResponse {
    /**
     * The experiment that this error corresponds to.
     */
    experiment: Experiment;
}
