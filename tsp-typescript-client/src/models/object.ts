import { createNormalizer } from '../protocol/serialization';

export const ObjectModel = createNormalizer<ObjectModel>({
    object: undefined,
    next: undefined,
    previous: undefined
});

/**
 * Object model that will be returned by the server
 */
export interface ObjectModel {
    /**
     * Generic object
     */
    object: any;

    /**
     * Next navigation parameter object
     */
    next?: any;

    /**
     * Previous navigation parameter object
     */
    previous?: any;
}
