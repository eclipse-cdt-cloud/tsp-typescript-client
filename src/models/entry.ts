import { OutputElementStyle } from './styles';

/**
 * Basic entry interface
 */
export interface Entry {
    /**
     * Unique Id for the entry
     */
    id: number;

    /**
     * Array of string that represant the content of each column
     */
    labels: string[];

    /**
     * Parent entry Id. if unset, the entry does not have a parent
     */
    parentId?: number;

    /**
     * Indicate if the entry will have row data
     */
    hasData?: boolean;

    /**
     * Style key used to search for a The style map can be obtained by using the style endpoint.
     */
    style?: OutputElementStyle;
}

/**
 * Entry header
 */
export interface EntryHeader {
    /**
     * Displayed name
     */
    name: string
    /**
     * The description of this header field
     */
    tooltip: string
}

/**
 * Entry model that will be returned by the server
 */
export interface EntryModel<T extends Entry> {
    /**
     * Array of entry header
     */
    headers: EntryHeader[];

    /**
     * Array of entry
     */
    entries: T[];
}
