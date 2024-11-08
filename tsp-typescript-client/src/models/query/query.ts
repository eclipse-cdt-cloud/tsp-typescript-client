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
export class ConfigurationQuery extends Query {
    /**
     * Name of the configuration
     */
    // @ts-expect-error TS doesn't like unused private fields.
    private name: string;

    /**
     * The optional description of configuration
     */
    // @ts-expect-error TS doesn't like unused private fields.
    private description?: string;

    /**
     * Constructor
     * @param name Name of the configuration
     * @param parameters Object used to send parameters to the server
     * @param description Optional description of the configuraiton
     */
    constructor(name: string, descripion: string | undefined, parameters: Object) {
        super(parameters);
        this.name = name;
        this.description = descripion;
    }
}
export class OutputConfigurationQuery extends ConfigurationQuery {
    /**
     * The configuration source type ID
     */
    // @ts-expect-error TS doesn't like unused private fields.
    private sourceTypeId: string;

    /**
     * Constructor
     * @param name Name of the configuration
     * @param description Optional description of the configuraiton
     * @param sourceTypeId The ID of the configuration source type
     * @param parameters Object used to send parameters to the server
     */
    constructor(name: string, description: string | undefined, sourceTypeId: string, parameters: Object) {
        super(name, description, parameters);
        this.sourceTypeId = sourceTypeId;
    }
}