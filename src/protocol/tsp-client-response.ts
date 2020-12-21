/**
 * Trace Server Protocol response.
 * The response includes the response model from the server if available,
 * the status code and message of the HTTP response, and the plain text attached to this response.
 */
export class TspClientResponse<T> {
    private readonly responseModel: T | undefined;
    private readonly statusCode: number;
    private readonly statusMessage: string;
    private readonly text: string;

    /**
     * Constructor
     * @param text Plain text of the response from the server
     * @param statusCode Status code from the HTTP response
     * @param statusMessage Status message from the HTTP response
     */
    constructor(text: string, statusCode: number, statusMessage: string) {
        this.text = text;
        this.statusCode = statusCode;
        this.statusMessage = statusMessage;
        try {
            this.responseModel = JSON.parse(text) as T;
        } catch (error) {
        }
    }

    /**
     * Get the model from the server, or undefined
     */
    public getModel(): T | undefined {
        return this.responseModel;
    }

    /**
     * Get the HTTP status code
     */
    public getStatusCode(): number {
        return this.statusCode;
    }

    /**
     * Get the HTTP status message
     */
    public getStatusMessage(): string {
        return this.statusMessage;
    }

    /**
     * Get the plain text of the response from the server
     */
    public getText(): string {
        return this.text;
    }

    /**
     * Check if the status code is 200
     */
    public isOk(): boolean {
        // TODO Use a constant
        return this.statusCode === 200;
    }
}
