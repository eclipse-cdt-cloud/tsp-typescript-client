import { Schema } from 'when-json-met-bigint';
import { bigint } from '../protocol/serialization';

export const BookmarkSchema: Schema<Bookmark> = {
    endTime: bigint,
    startTime: bigint,
};

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
    startTime: bigint;

    /**
     * End time for the bookmark
     */
    endTime: bigint;

    /**
     * Type of the bookmark
     */
    type: string;
}
