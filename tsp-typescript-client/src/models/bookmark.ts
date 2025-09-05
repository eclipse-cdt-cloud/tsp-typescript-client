import { createNormalizer } from '../protocol/serialization';

export const Bookmark = createNormalizer<Bookmark>({
    end: BigInt,
    start: BigInt,
});

/**
 * Model for bookmark
 */
export interface Bookmark {
    /**
     * Unique Id of the bookmark
     */
    UUID: string;

    /**
     * Name of the bookmark
     */
    name: string;

    /**
     * Start time for the bookmark
     */
    start: bigint;

    /**
     * End time for the bookmark
     */
    end: bigint;
}
