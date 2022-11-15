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
     * Time range requested key
     */
    public static readonly REQUESTED_TIMERANGE_KEY: string = 'requested_timerange';

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
    public static readonly REQUESTED_TABLE_COLUMN_IDS_KEY: string = 'requested_table_column_ids';

    /**
     *Is Filtered Key
     */
    public static readonly IS_FILTERED_KEY: string = 'isFiltered';

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
     * Build a time range query
     * @param start Start time
     * @param end End time
     * @param additionalProperties Use this optional parameter to add custom properties to your query
     */
    public static timeRangeQuery(start: bigint, end: bigint, additionalProperties?: { [key: string]: any }): Query;

    /**
     * Build a sampled time range query
     * @param start Start time
     * @param end End time
     * @param nbTimes Number of time samples
     * @param additionalProperties Use this optional parameter to add custom properties to your query
     */
    public static timeRangeQuery(start: bigint, end: bigint, nbTimes?: number, additionalProperties?: { [key: string]: any }): Query;

    public static timeRangeQuery(start: bigint, end: bigint, third?: number | { [key: string]: any }, fourth?: { [key: string]: any }): Query {
        if (typeof third === 'number') {
            const nbTimes = third;
            const additionalProperties = fourth;
            const timeObj = {
                [this.REQUESTED_TIMERANGE_KEY]: { start, end, nbTimes }
            };
            return new Query({ ...timeObj, ...additionalProperties });
        }
        const additionalProperties = third;
        const timeObj = {
            [this.REQUESTED_TIMERANGE_KEY]: { start, end }
        };
        return new Query({ ...timeObj, ...additionalProperties });
    }

    /**
     * Build a time range query with selected items
     * @param start Start time
     * @param end End time
     * @param items Array of item IDs
     * @param additionalProperties Use this optional parameter to add custom properties to your query
     */
    public static selectionTimeRangeQuery(start: bigint, end: bigint, items: number[], additionalProperties?: { [key: string]: any }): Query

    /**
     * Build a sampled time range query with selected items
     * @param start Start time
     * @param end End time
     * @param nbTimes Number of time samples
     * @param items Array of item IDs
     * @param additionalProperties Use this optional parameter to add custom properties to your query
     */
    public static selectionTimeRangeQuery(start: bigint, end: bigint, nbTimes: number, items: number[], additionalProperties?: { [key: string]: any }): Query

    public static selectionTimeRangeQuery(start: bigint, end: bigint, third: number | number[], fourth: number[] | { [key: string]: any }, fifth?: { [key: string]: any }): Query {
        if (typeof third === 'number') {
            const nbTimes = third;
            const items = fourth;
            const additionalProperties = fifth;
            const selectionTimeObj = {
                [this.REQUESTED_TIMERANGE_KEY]: { start, end, nbTimes },
                [this.REQUESTED_ITEMS_KEY]: items
            };
            return new Query({ ...selectionTimeObj, ...additionalProperties });
        }
        const items = third;
        const additionalProperties = fourth;
        const selectionTimeObj = {
            [this.REQUESTED_TIMERANGE_KEY]: { start, end },
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
