import { array, assertNumber, createNormalizer, toBigInt } from '../protocol/serialization';
import { AxisDomain } from './axis-domain';
import { DataType } from './data-type';
import { Entry } from './entry';
import { StartEndRange } from './sampling';
import { OutputElementStyle } from "./styles";

export const XYAxisDescription = createNormalizer<XYAxisDescription>({
  axisDomain: AxisDomain,
});

export const XYSeries = createNormalizer<XYSeries>({
    seriesId: assertNumber,
    xValues: array(toBigInt),
    xRanges: array(StartEndRange),
    yValues: array(assertNumber),
    tags: array(assertNumber),
    style: OutputElementStyle,
    xValuesDescription: XYAxisDescription,
    yValuesDescription: XYAxisDescription,
});

export interface XyEntry extends Entry {
    /**
     * Flag whether or not the entry is a default entry and its xy data should be fetched by default
     */
    isDefault?: boolean;
}

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
    xValuesDescription: XYAxisDescription;

    /**
     * Description of the Y axis
     */
    yValuesDescription: XYAxisDescription;

    /**
     * Series' X values
     */
    xValues?: bigint[];

    xRanges?: StartEndRange[];

    xCategories?: string[];
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
export interface XYAxisDescription {
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
    dataType: DataType;

    /**
     * Selection range for this axis
     */
    axisDomain?: AxisDomain;
}
