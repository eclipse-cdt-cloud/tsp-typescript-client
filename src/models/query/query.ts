/**
 * Describes the parameter used in a request. A query contains all the parameters that need to be pass for a specific output.
 * Parameters can be found in the output descriptor. It also contains a list of filters to be applied on a specific output.
 * The output response will contain only elements that pass these filters.
 */
export class Query {
    /**
     * Map of parameters used for the query
     */
    private parameters: object;

    /**
     * Array of filter Ids to apply
     */
    private filters: number[] = new Array<number>();

    /**
     * Constructor
     * @param parameters Object use to send parameters to the server
     * @param filters Optional array of filter IDs to apply
     */
    constructor(parameters: object, filters?: number[]) {
        this.parameters = parameters;
        if (filters) {
            this.filters = filters;
        }
    }
}
