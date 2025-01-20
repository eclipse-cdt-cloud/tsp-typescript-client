/**
 * Capabilities class indicating capabilities of a data provider, such as
 * "canCreate" and "canDelete" capability.
 * 
 * "canCreate" indicates that a given data provider can create a derived data
 * provider. "canDelete" indicates that a given data provider can be deleted.
 * 
 */
export class OutputCapabilities {
    /**
     * Whether the data provider can create derived data providers. 'false' if absent. 
     */
    canCreate?: boolean;

    /**
     * Whether the data provider can be deleted. 'false' if absent.
     */
    canDelete?: boolean;
}
