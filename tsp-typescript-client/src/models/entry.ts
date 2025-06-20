import { array, assertNumber, createNormalizer, Normalizer } from '../protocol/serialization';
import { OutputElementStyle } from './styles';

export const Entry = createNormalizer<Entry>({
    id: assertNumber,
    parentId: assertNumber,
    style: {
        values: undefined,
    },
    metadata: undefined
});

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
     * Style key used to search for a style.
     * The style map can be obtained by using the style endpoint.
     */
    style?: OutputElementStyle;

    /**
     * Metadata
     */
    metadata?: { [key: string]: any };

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

    /**
     * The data type of the column. If undefined, default is DATA_TYPE.STRING.
     */
    dataType?: string
}

export function EntryModel<T extends Entry>(normalizer: Normalizer<T>): Normalizer<EntryModel<T>> {
    return createNormalizer<EntryModel<any>>({
        entries: array(normalizer),
        autoExpandLevel: assertNumber,
    });
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

    /**
     * Optional auto-expand level to be used for the input of the tree. If omitted value -1 is assumed.
     * 
     * Values:
     * - -1 → All subtrees should be expanded
     * - 0 → No auto-expand
     * - 1 → Top-level elements are expanded, but not their children
     * - 2 → Top-level elements and their children are expanded, but not grand-children
     */
    autoExpandLevel?: number;

}
