/**
 * Model of a XY chart, contain at least one XY series
 */
export interface XYModel {
    /**
     * Title of the model
     */
    title: string;

    /**
     * Indicate if all the Y values are using the same X axis
     */
    commonXAxis: boolean;

    /**
     * Array of XY series
     */
    series: { [key: string]: XYSeries };
}

/**
 * Represent a XY series and its values
 */
export interface XYSeries {
    /**
     * Name of the series
     */
    name: string;

    /**
     * Ìd of the series
     */
    id: string;

    /**
     * Description of the X axis
     */
    xAxis: Axis;

    /**
     * Description of the Y axis
     */
    yAxis: Axis;

    /**
     * Series' X values
     */
    xValues: number[];

    /**
     * Series' Y values
     */
    yValues: number[];

    /**
     * Array of tags for each XY values, used when a value pass a filter
     */
    tags: number[];
}

/**
 * Description of an axis for XY chart
 */
export interface Axis {
    /**
     * Label of the axis
     */
    label: string;

    /**
     * Type of units used for the axis
     */
    unit: string;
}
