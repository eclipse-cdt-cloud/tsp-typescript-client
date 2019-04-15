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
    startTime: number;

    /**
     * End time for the bookmark
     */
    endTime: number;

    /**
     * Type of the bookmark
     */
    type: string;
}
