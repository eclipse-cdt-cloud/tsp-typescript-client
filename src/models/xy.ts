/********************************************************************************
 * Copyright (C) 2018 Ericsson and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 ********************************************************************************/

/**
 * Model of a XY chart, contain at least one XY series
 */
export interface XYModel {
    /**
     * Title of the model
     */
    title: string;

    /**
     * Description of the X axis
     */
    xAxis: Axis;

    /**
     * Description of the Y axis
     */
    yAxis: Axis;

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
    seriesId: string;

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
