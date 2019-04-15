import { Query } from './query';

/**
 * Helper class to create query object
 */
export class QueryHelper {
    /**
     * Time requested key
     */
    public static TIME_REQUESTED: string = 'timeRequested';

    /**
     * Selected items key
     */
    public static SELECTED_ITEMS: string = 'items';

    /**
     * Starting index key
     */
    public static INDEX: string = 'index';

    /**
     * Key for the number of element to return
     */
    public static COUNT: string = 'count';

    /**
     * Table column IDs key
     */
    public static SELECTED_COLUMNS = 'columnId';

    /**
     * Build a simple time query
     * @param timeRequested Array of requested times
     * @param filters Array of filter IDs
     * @param additionalProperties Use this optional parameter to add custom properties to your query
     */
    public static timeQuery(timeRequested: number[], filters?: number[], additionalProperties?: { [key: string]: any }): Query {
        const timeObj = {
            [this.TIME_REQUESTED]: timeRequested
        };
        return new Query({ ...timeObj, ...additionalProperties }, filters);
    }

    /**
     * Build a simple time query with selected items
     * @param timeRequested Array of requested times
     * @param items Array of item IDs
     * @param filters Array of filter IDs
     * @param additionalProperties Use this optional parameter to add custom properties to your query
     */
    public static selectionTimeQuery(timeRequested: number[], items: number[], filters?: number[], additionalProperties?: { [key: string]: any }): Query {
        const selectionTimeObj = {
            [this.TIME_REQUESTED]: timeRequested,
            [this.SELECTED_ITEMS]: items
        };

        return new Query({ ...selectionTimeObj, ...additionalProperties }, filters);
    }

    /**
     * Build a simple table query
     * @param columnsId Desired columns
     * @param index Starting index to query
     * @param count Number of lines
     * @param filters Array of filter IDs
     * @param additionalProperties Use this optional parameter to add custom properties to your query
     */
    public static tableQuery(columnsId: number[], index: number, count: number, filters?: number[], additionalProperties?: { [key: string]: any }) {
        const tableObj = {
            [this.INDEX]: index,
            [this.COUNT]: count,
            [this.SELECTED_COLUMNS]: columnsId
        };

        return new Query({ ...tableObj, ...additionalProperties }, filters);
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
