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

import { Query } from '../models/query';
import { GenericEntryResponse } from '../models/response/entry-response';
import { BasicEntry, EntryHeader } from '../models/entry';
import { GenericResponse } from '../models/response/responses';
import { XYModelResponse, XYEntryResponse } from '../models/response/xy-response';
import { XYModel } from '../models/xy';
import { TimeGraphEntryResponse } from '../models/response/timegraph-response';
import { TimeGraphEntry, TimeGraphRow, TimeGraphArrow } from '../models/timegraph';
import { ColumnHeaderEntry, Table } from '../models/table';
import { Trace } from '../models/trace';
import { RestClient } from './rest-client';
import { Experiment } from '../models/experiment';
import { OutputDescriptor } from '../models/output-descriptor';

/**
 * Trace Server Protocol client
 */
export class TspClient {
    private baseUrl: string;

    /**
     * Constructor
     * @param baseUrl Base URL of the server (ex. https://localhost:8080/tsp/api)
     */
    public TspClient(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    /**
     * Fetch all available traces on the server
     * @returns List of Trace
     */
    public async fetchTraces(): Promise<Trace[]> {
        const url = '${this.baseUrl}/traces';
        return await RestClient.get(url) as Trace[];
    }

    /**
     * Open a trace on the server
     * @param parameters Query object
     * @returns The opened trace
     */
    public async openTrace(parameters: Query): Promise<Trace> {
        const url = '${this.baseUrl}/traces';
        return await RestClient.post(url, parameters) as Trace;
    }

    /**
     * Delete a trace on the server
     * @param traceUUID Trace UUID to delete
     * @param deleteTrace Also delete the trace from disk
     * @param removeCache Remove all cache for this trace
     * @returns The deleted trace
     */
    public async deleteTrace(traceUUID: string, deleteTrace?: boolean, removeCache?: boolean): Promise<Trace> {
        const url = '${this.baseUrl}/traces/${traceUUID}';
        const deleteParameters: URLSearchParams = new URLSearchParams();
        if (deleteTrace !== undefined) {
            deleteParameters.set('deleteTrace', deleteTrace.toString());
        }
        if (removeCache !== undefined) {
            deleteParameters.set('removeCache', removeCache.toString());
        }
        return await RestClient.delete(url, deleteParameters.toString()) as Trace;
    }

    /**
     * Fetch all available experiments on the server
     * @returns List of Experiment
     */
    public async fetchExperiments(): Promise<Experiment[]> {
        const url = '${this.baseUrl}/experiments';
        return await RestClient.get(url) as Experiment[];
    }

    /**
     * Fetch a specif experiment
     * @param expUUID Experiment UUID to fetch
     * @returns The experiment
     */
    public async fetchExperiment(expUUID: string): Promise<Experiment> {
        const url = '${this.baseUrl}/experiments/${expUUID}';
        return await RestClient.get(url) as Experiment;
    }

    /**
     * Create an experiment on the server
     * @param parameters Query object
     * @returns The created experiment
     */
    public async createExperiment(parameters: Query): Promise<Experiment> {
        const url = '${this.baseUrl}/experiments';
        return await RestClient.post(url, parameters) as Experiment;
    }

    /**
     * Update an experiment
     * @param expUUID Experiment UUID to update
     * @param parameters Query object
     * @returns The updated experiment
     */
    public async updateExperiment(expUUID: string, parameters: Query): Promise<Experiment> {
        const url = '${this.baseUrl}/experiments/${expUUID}';
        return await RestClient.put(url, parameters) as Experiment;
    }

    /**
     * Delete an experiment on the server
     * @param expUUID Experiment UUID to delete
     * @returns The deleted experiment
     */
    public async deleteExperiment(expUUID: string): Promise<Experiment> {
        const url = '${this.baseUrl}/experiments/${expUUID}';
        return await RestClient.delete(url) as Experiment;
    }

    /**
     * List all the outputs associated to this experiment
     * @param expUUID Experiment UUID
     * @returns List of OutputDescriptor
     */
    public async experimentOutputs(expUUID: string): Promise<OutputDescriptor[]> {
        const url = '${this.baseUrl}/experiments/${expUUID}/outputs';
        return await RestClient.get(url) as OutputDescriptor[];
    }

    /**
     * Fetch XY tree
     * @param expUUID Experiment UUID
     * @param outputID Output ID
     * @param parameters Query object
     * @returns Generic entry response with entries of type T
     */
    public async fetchXYTree<T extends BasicEntry, U extends EntryHeader>(expUUID: string, outputID: string, parameters: Query): Promise<XYEntryResponse<T, U>> {
        const url = '${this.baseUrl}/experiments/${expUUID}/outputs/XY/${outputID}/tree';
        return await RestClient.post(url, parameters) as XYEntryResponse<T, U>;
    }

    /**
     * Fetch XY
     * @param expUUID Experiment UUID
     * @param outputID Output ID
     * @param parameters Query object
     * @returns XY model response with the model of type T
     */
    public async fetchXY<T extends XYModel>(expUUID: string, outputID: string, parameters: Query): Promise<XYModelResponse<T>> {
        const url = '${this.baseUrl}/experiments/${expUUID}/outputs/XY/${outputID}/xy';
        return await RestClient.post(url, parameters) as XYModelResponse<T>;
    }

    /**
     * Fetch XY tooltip
     * @param expUUID Experiment UUID
     * @param outputID Output ID
     * @param xValue X value
     * @param yValue Optional Y value
     * @param seriesID Optional series ID
     * @returns Map of key=name of the property and value=string value associated
     */
    public async fetchXYToolTip(expUUID: string, outputID: string, xValue: number, yValue?: number, seriesID?: string): Promise<Map<string, string>> {
        const url = '${this.baseUrl}/experiments/${expUUID}/outputs/XY/${outputID}/tooltip';
        const xyTooltipParameters: URLSearchParams = new URLSearchParams();
        xyTooltipParameters.set('xValue', xValue.toString());
        if (yValue !== undefined) {
            xyTooltipParameters.set('yValue', yValue.toString());
        }
        if (seriesID !== undefined) {
            xyTooltipParameters.set('seriesID', seriesID);
        }
        return await RestClient.get(url, xyTooltipParameters.toString()) as Map<string, string>;
    }

    /**
     * Fetch Time Graph tree
     * @param expUUID Experiment UUID
     * @param outputID Output ID
     * @param parameters Query object
     * @returns Time graph entry response with entries of type T and headers of type U
     */
    public async fetchTimeGraphTree<T extends TimeGraphEntry, U extends EntryHeader>(expUUID: string, outputID: string, parameters: Query): Promise<TimeGraphEntryResponse<T, U>> {
        const url = '${this.baseUrl}/experiments/${expUUID}/outputs/timeGraph/${outputID}/tree';
        return await RestClient.post(url, parameters) as TimeGraphEntryResponse<T, U>;
    }

    /**
     * Fetch Time Graph states
     * @param expUUID Experiment UUID
     * @param outputID Output ID
     * @param parameters Query object
     * @returns Generic response with the model of type T
     */
    public async fetchTimeGraphStates<T extends TimeGraphRow>(expUUID: string, outputID: string, parameters: Query): Promise<GenericResponse<T>> {
        const url = '${this.baseUrl}/experiments/${expUUID}/outputs/timeGraph/${outputID}/states';
        return await RestClient.post(url, parameters) as GenericResponse<T>;
    }

    /**
     * Fetch Time Graph arrows
     * @param expUUID Experiment UUID
     * @param outputID Output ID
     * @param parameters Query object
     * @returns Generic response with the model of type T
     */
    public async fetchTimeGraphArrows<T extends TimeGraphArrow>(expUUID: string, outputID: string, parameters: Query): Promise<GenericResponse<T>> {
        const url = '${this.baseUrl}/experiments/${expUUID}/outputs/timeGraph/${outputID}/arrows';
        return await RestClient.post(url, parameters) as GenericResponse<T>;
    }

    /**
     * Fetch Time Graph tooltip for states and arrows
     * @param expUUID Experiment UUID
     * @param outputID Output ID
     * @param time X value
     * @param entryID Entry ID to identify precisely the states
     * @param targetID Optional target ID in case the tooltip is for an arrow
     * @returns Map of key=name of the property and value=string value associated
     */
    public async fetchTimeGraphToolTip(expUUID: string, outputID: string, time: number, entryID?: string, targetID?: string): Promise<Map<string, string>> {
        const url = '${this.baseUrl}/experiments/${expUUID}/outputs/timeGraph/${outputID}/tooltip';
        const statesTooltipParameters: URLSearchParams = new URLSearchParams();
        statesTooltipParameters.set('time', time.toString());
        if (entryID !== undefined) {
            statesTooltipParameters.set('entryID', entryID.toString());
        }
        if (targetID !== undefined) {
            statesTooltipParameters.set('targetID', targetID.toString());
        }
        return await RestClient.get(url, statesTooltipParameters.toString()) as Map<string, string>;
    }

    /**
     * Fetch Table columns
     * @param expUUID Experiment UUID
     * @param outputID Output ID
     * @param parameters Query object
     * @returns Generic entry response with entries of type T
     */
    public async fetchTableColumns<T extends ColumnHeaderEntry>(expUUID: string, outputID: string, parameters: Query): Promise<GenericEntryResponse<T>> {
        const url = '${this.baseUrl}/experiments/${expUUID}/outputs/table/${outputID}/columns';
        return await RestClient.post(url, parameters) as GenericEntryResponse<T>;
    }

    /**
     * Fetch Table lines
     * @param expUUID Experiment UUID
     * @param outputID Output ID
     * @param parameters Query object
     * @returns Generic response with the model of type T
     */
    public async fetchTableLines<T extends Table>(expUUID: string, outputID: string, parameters: Query): Promise<GenericResponse<T>> {
        const url = '${this.baseUrl}/experiments/${expUUID}/outputs/table/${outputID}/lines';
        return await RestClient.post(url, parameters) as GenericResponse<T>;
    }
}
