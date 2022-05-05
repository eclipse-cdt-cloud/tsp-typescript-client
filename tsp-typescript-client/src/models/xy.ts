import { array, assertNumber, createNormalizer, toBigInt } from '../protocol/serialization';
import { OutputElementStyle } from "./styles";

export const XYSeries = createNormalizer<XYSeries>({
    seriesId: assertNumber,
    xValues: array(toBigInt),
    yValues: array(assertNumber),
    tags: array(assertNumber),
    style: OutputElementStyle,
});

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
    xValues: bigint[];

    /**
     * Series' Y values
     */
    yValues: number[];

    /**
     * Array of tags for each XY value, used when a value passes a filter
     */
    tags?: number[];

    /**
     * Style of the series
     */
    style: OutputElementStyle;
}

export const XYModel = createNormalizer<XYModel>({
    series: array(XYSeries),
});

/**
 * Model of a XY chart, contains at least one XY series
 */
export interface XYModel {
    /**
     * Title of the model
     */
    title: string;

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
