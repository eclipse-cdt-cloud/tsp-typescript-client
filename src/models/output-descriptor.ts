/**
 * Descriptor of a specific output provider
 */
export interface OutputDescriptor {
    /**
     * Output provider's ID
     */
    id: string;

    /**
     * Human readable name
     */
    name: string;

    /**
     * Description of the output provider
     */
    description: string;

    /**
     * Type of data returned by this output.
     * Serve as a hint to determine what kind of view should be use for this output (ex. XY, Time Graph, Table, etc..)
     */
    type: string;

    /**
     * Map of query parameters that the provider accept
     */
    queryParameters: Map<string, any>;

    /**
     * Start time
     */
    start: bigint;

    /**
     * End time
     */
    end: bigint;

    /**
     * Indicate if the start, end times and current model are final,
     * or if they will need to be refreshed later to represent a more up to date version
     */
    final: boolean;

    /**
     * List of compatible outputs that can be used in the same view (ex. as overlay)
     */
    compatibleProviders: string[];
}
