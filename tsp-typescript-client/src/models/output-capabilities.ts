/**
 * Capabilities class indicating capabilities of a data provider, such as
 * "canCreate" and "canDelete" capability.
 * 
 * "canCreate" indicates that a given data provider can create a derived data
 * provider. "canDelete" indicates that a given data provider can be deleted.
 * 
 * "selectionRange" indicates that a given data provider can use the selection
 * range to compute its data. Clients should include the selection range in
 * query parameters and refresh the data when the selection range changes.
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

    /**
     * Whether the data provider uses the selection range. 'false' if absent.
     */
    selectionRange?: boolean;
}
