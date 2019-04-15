/**
 * Trace Server Protocol response.
 * The response includes the response model from the server, the status code of the HTTP response and the message attached to this response.
 */
export class TspClientResponse<T> {
    private readonly responseModel: T;
    private readonly statusCode: number;
    private readonly statusMessage: string;

    /**
     * Constructor
     * @param responseModel Model of type T from the server
     * @param statusCode Status code from the HTTP response
     * @param statusMessage Status message from the HTTP response
     */
    constructor(responseModel: T, statusCode: number, statusMessage: string) {
        this.responseModel = responseModel;
        this.statusCode = statusCode;
        this.statusMessage = statusMessage;
    }

    /**
     * Get the model from the server
     */
    public getModel(): T {
        return this.responseModel;
    }

    /**
     * Get the HTTP status code
     */
    public getStatusCode(): number {
        return this.statusCode;
    }

    /**
     * Get the HTTP status code
     */
    public getStatusMessage(): string {
        return this.statusMessage;
    }

    public isOk(): boolean {
        // TODO Use a constant
        return this.statusCode === 200;
    }
}
