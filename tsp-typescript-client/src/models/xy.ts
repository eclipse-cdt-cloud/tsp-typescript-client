import { Schema } from 'when-json-met-bigint';
import { assertNumber, number } from '../protocol/serialization';

export const XYSeriesSchema: Schema = {
    seriesId: assertNumber,
    xValues: [number], // lossy conversion if too big
    yValues: [assertNumber],
    tags: [assertNumber],
};

/**
 * Represent a XY series and its values
 */
export interface XYSeries {
    /**
     * Name of the series
     */
    seriesName: string;

    /**
     * Ìd of the series
     */
    seriesId: number;

    /**
     * Description of the X axis
     */
    xAxis: XYAxis;

    /**
     * Description of the Y axis
     */
    yAxis: XYAxis;

    /**
     * Series' X values
     */
    xValues: number[];

    /**
     * Series' Y values
     */
    yValues: number[];

    /**
     * Array of tags for each XY value, used when a value passes a filter
     */
    tags?: number[];
}

export const XYModelSchema: Schema = {
    series: [XYSeriesSchema],
};

/**
 * Model of a XY chart, contains at least one XY series
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
    series: XYSeries[];
}

/**
 * Description of an axis for XY chart
 */
export interface XYAxis {
    /**
     * Label of the axis
     */
    label: string;

    /**
     * The units used for the axis, to be appended to the numbers
     */
    unit: string;

    /**
     * Type of data for this axis, to give hint on number formatting
     */
    dataType: string;
}
