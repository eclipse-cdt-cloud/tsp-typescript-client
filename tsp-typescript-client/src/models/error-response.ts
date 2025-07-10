/**
 * Model of an error response
 */
export interface ErrorResponse {
    /**
     * The short, human-readable description of the error.
     */
    title: string;

    /**
     * The optional human-readable explanation of the error with details helping the client to correct the error.
     */
    details?: string;
}
