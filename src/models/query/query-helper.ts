import { Query } from './query';

/**
 * Helper class to create query object
 */
export class QueryHelper {
    /**
     * Time requested key
     */
    public static readonly REQUESTED_TIMES_KEY: string = 'requested_times';

    /**
     * Selected items key
     */
    public static readonly REQUESTED_ITEMS_KEY: string = 'requested_items';

    /**
     * Starting index key
     */
    public static readonly REQUESTED_TABLE_INDEX_KEY: string = 'requested_table_index';

    /**
     * Key for the number of element to return
     */
    public static readonly REQUESTED_TABLE_COUNT_KEY: string = 'requested_table_count';

    /**
     * Table column IDs key
     */
    public static readonly REQUESTED_TABLE_COLUMN_IDS_KEY = 'requested_table_column_ids';

    /**
     * Build a simple query
     * @param additionalProperties Use this optional parameter to add custom properties to your query
     */
    public static query(additionalProperties?: { [key: string]: any }): Query {
        return new Query({ ...additionalProperties });
    }

    /**
     * Build a simple time query
     * @param timeRequested Array of requested times
     * @param additionalProperties Use this optional parameter to add custom properties to your query
     */
    public static timeQuery(timeRequested: number[], additionalProperties?: { [key: string]: any }): Query {
        const timeObj = {
            [this.REQUESTED_TIMES_KEY]: timeRequested
        };
        return new Query({ ...timeObj, ...additionalProperties });
    }

    /**
     * Build a simple time query with selected items
     * @param timeRequested Array of requested times
     * @param items Array of item IDs
     * @param additionalProperties Use this optional parameter to add custom properties to your query
     */
    public static selectionTimeQuery(timeRequested: number[], items: number[], additionalProperties?: { [key: string]: any }): Query {
        const selectionTimeObj = {
            [this.REQUESTED_TIMES_KEY]: timeRequested,
            [this.REQUESTED_ITEMS_KEY]: items
        };

        return new Query({ ...selectionTimeObj, ...additionalProperties });
    }

    /**
     * Build a simple table query
     * @param columnsId Desired columns
     * @param index Starting index to query
     * @param count Number of lines
     * @param additionalProperties Use this optional parameter to add custom properties to your query
     */
    public static tableQuery(columnsId: number[], index: number, count: number, additionalProperties?: { [key: string]: any }) {
        const tableObj = {
            [this.REQUESTED_TABLE_INDEX_KEY]: index,
            [this.REQUESTED_TABLE_COUNT_KEY]: count,
            [this.REQUESTED_TABLE_COLUMN_IDS_KEY]: columnsId
        };

        return new Query({ ...tableObj, ...additionalProperties });
    }

    /**
     * Split the range into equal parts
     * @param start Start time
     * @param end End time
     * @param nb Number of element or resolution
     */
    public static splitRangeIntoEqualParts(start: number, end: number, nb: number): number[] {
        const result: number[] = new Array(nb);
        if (nb === 1) {
            if (start === end) {
                result[0] = start;
                return result;
            }
        }

        const stepSize: number = Math.abs(end - start) / (nb - 1);
        for (let i = 0; i < nb; i++) {
            result[i] = Math.min(start, end) + Math.round(i * stepSize);
        }
        result[result.length - 1] = Math.max(start, end);
        return result;
    }
}
