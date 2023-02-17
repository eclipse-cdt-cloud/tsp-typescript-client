export enum DataType {
    /** Data represent a decimal number */
    NUMBER = 'NUMBER',
    /** Binary data, where the size orders are powers of 2 */
    BINARY_NUMBER = 'NUMBER',
    /** Data represent a timestamp in nanoseconds, can be negative */
    TIMESTAMP = "TIMESTAMP",
    /** Data represents a duration in nanoseconds */
    DURATION = "DURATION",
    /** Data is textual data */
    STRING = "STRING",
    /** 
     * Data representing a time range of string: [start,end],
     * where `start` and `end` are timestamps in nanoseconds
     */
    TIME_RANGE = "TIME_RANGE"
}