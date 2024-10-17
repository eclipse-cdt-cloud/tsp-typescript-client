import { createNormalizer } from "../protocol/serialization";

export const Configuration = createNormalizer<Configuration>({
    parameters: undefined
});

/**
 * Model of a configuration instance
 */
export interface Configuration {
    /**
     * Unique identifier of the configuration
     */
    id: string;

    /**
     * The name of the configuration
     */
    name: string;

    /**
     * A short description of this configuration
     */
    description?: string;

    /**
     * the configuration source type ID
     */
    sourceTypeId: string;

    /**
     * Optional informational map of parameters to return. 
     * Can be used to show more details to users of the configuration instance.
     */
    parameters?: Record<string, any>;
}

/**
 * Model of a configuration parameter descriptor
 */
export interface ConfigParamDescriptor {
    /**
     * The unique name of the key
     */
    keyName: string;

    /**
     * A short description.
     */
    description?: string;

    /**
     * The data type string, e.g. use NUMBER for numbers, or STRING as strings
     */
    dataType?: string;

    /**
     * If parameter needs to in the query parameters or not. Default is false. 
     */
    isRequired?: boolean;
}
