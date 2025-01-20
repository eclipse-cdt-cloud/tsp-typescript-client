import { createNormalizer } from '../protocol/serialization';
import { Configuration } from './configuration';
import { OutputCapabilities } from './output-capabilities';

export const OutputDescriptor = createNormalizer<OutputDescriptor>({
    end: BigInt,
    queryParameters: undefined,
    start: BigInt,
    configuration: Configuration
});

/**
 * Provider type 
 */
export enum ProviderType {
    /**
     * A provider for a table data structure implemented as virtual table.
     */
    TABLE = 'TABLE',
    /**
     * A provider for a tree, whose entries have XY series. The x-series is time.
     */
    TREE_TIME_XY = 'TREE_TIME_XY',
    /**
     * A provider for a Time Graph model, which has entries with a start and end
     * time, each entry has a series of states, arrows link from one series to
     * another
     */
    TIME_GRAPH = 'TIME_GRAPH',
    /**
     * A provider for a data tree, which has entries (rows) and columns.
     */
    DATA_TREE = 'DATA_TREE',
    /**
     * A provider with no data. Can be used for grouping purposes and/or as data provider configurator.
     */
    NONE = 'NONE'
}

/**
 * Descriptor of a specific output provider
 */
export interface OutputDescriptor {
    /**
     * Output provider's parent ID
     */
    parentId?: string;

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
     * 
     * See {@link ProviderType} for supported strings.
     */
    type: string;

    /**
     * Map of query parameters that the provider accept
     */
    queryParameters?: Record<string, any>;

    /**
     * Start time
     */
    start?: bigint;

    /**
     * End time
     */
    end?: bigint;

    /**
     * Indicate if the start, end times and current model are final,
     * or if they will need to be refreshed later to represent a more up to date version
     */
    final?: boolean;

    /**
     * List of compatible outputs that can be used in the same view (ex. as overlay)
     */
    compatibleProviders?: string[];

    /**
     * Configuration used to create this data provider.
     */
    configuration?: Configuration;

    /**
     * The output (data provider) capabilities instance. If absent all capabilities are false.
     */
    capabilities?: OutputCapabilities;
}
