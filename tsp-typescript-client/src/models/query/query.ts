/**
 * Describes the parameter used in a request. A query contains all the parameters that need to be pass for a specific output.
 * Parameters can be found in the output descriptor. It also contains a list of filters to be applied on a specific output.
 * The output response will contain only elements that pass these filters.
 */
export class Query {

    /**
     * Map of parameters used for the query
     */
    // @ts-expect-error TS doesn't like unused private fields.
    private parameters: object;

    /**
     * Constructor
     * @param parameters Object use to send parameters to the server
     */
    constructor(parameters: object) {
        this.parameters = parameters;
    }
}
