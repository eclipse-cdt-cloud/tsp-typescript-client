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
     * Selected items key
     */
     public static readonly REQUESTED_ELEMENT_KEY: string = 'requested_element';

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
     * @param requestedTimes Array of requested times
     * @param additionalProperties Use this optional parameter to add custom properties to your query
     */
    public static timeQuery(requestedTimes: bigint[], additionalProperties?: { [key: string]: any }): Query {
        const timeObj = {
            [this.REQUESTED_TIMES_KEY]: requestedTimes
        };
        return new Query({ ...timeObj, ...additionalProperties });
    }

    /**
     * Build a simple time query with selected items
     * @param requestedTimes Array of requested times
     * @param items Array of item IDs
     * @param additionalProperties Use this optional parameter to add custom properties to your query
     */
    public static selectionTimeQuery(requestedTimes: bigint[], items: number[], additionalProperties?: { [key: string]: any }): Query {
        const selectionTimeObj = {
            [this.REQUESTED_TIMES_KEY]: requestedTimes,
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
     * @param nb Number of elements
     */
    public static splitRangeIntoEqualParts(start: bigint, end: bigint, nb: number): bigint[] {
        if (nb <= 0) {
            return [];
        }
        if (nb === 1) {
            return [start];
        }
        if (start > end) {
            const tmp = end;
            end = start;
            start = tmp;
        }
        nb = Math.min(nb, Number(end - start + BigInt(1)));
        const result: bigint[] = new Array(nb);
        const stepSize: number = Math.max(1, Number(end - start) / (nb - 1));
        for (let i = 0; i < nb; i++) {
            result[i] = start + BigInt(Math.floor(i * stepSize));
        }
        result[result.length - 1] = end;
        return result;
    }
}
