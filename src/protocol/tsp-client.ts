import { Query } from '../models/query/query';
import { GenericResponse } from '../models/response/responses';
import { XYModel } from '../models/xy';
import { TimeGraphArrow, TimeGraphModel } from '../models/timegraph';
import { TableModel } from '../models/table';
import { Trace } from '../models/trace';
import { RestClient } from './rest-client';
import { Experiment } from '../models/experiment';
import { OutputDescriptor } from '../models/output-descriptor';
import { EntryModel, Entry, EntryHeader } from '../models/entry';
import { TspClientResponse } from './tsp-client-response';

/**
 * Trace Server Protocol client
 */
export class TspClient {
    private baseUrl: string;

    /**
     * Constructor
     * @param baseUrl Base URL of the server (ex. https://localhost:8080/tsp/api)
     */
    public constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    /**
     * Fetch all available traces on the server
     * @returns List of Trace
     */
    public async fetchTraces(): Promise<TspClientResponse<Trace[]>> {
        const url = this.baseUrl + '/traces';
        return RestClient.get<Trace[]>(url);
    }

    /**
     * Fetch a specific trace information
     * @param traceUUID Trace UUID to fetch
     */
    public async fetchTrace(traceUUID: string): Promise<TspClientResponse<Trace>> {
        const url = this.baseUrl + '/traces/' + traceUUID;
        return RestClient.get<Trace>(url);
    }

    /**
     * Open a trace on the server
     * @param parameters Query object
     * @returns The opened trace
     */
    public async openTrace(parameters: Query): Promise<TspClientResponse<Trace>> {
        const url = this.baseUrl + '/traces';
        return RestClient.post<Trace>(url, parameters);
    }

    /**
     * Delete a trace on the server
     * @param traceUUID Trace UUID to delete
     * @param deleteTrace Also delete the trace from disk
     * @param removeCache Remove all cache for this trace
     * @returns The deleted trace
     */
    public async deleteTrace(traceUUID: string, deleteTrace?: boolean, removeCache?: boolean): Promise<TspClientResponse<Trace>> {
        const url = this.baseUrl + '/traces/' + traceUUID;
        // TODO: renable when we figure how to use URLSearchParams
        // const deleteParameters: URLSearchParams = new URLSearchParams();
        // if (deleteTrace !== undefined) {
        //     deleteParameters.set('deleteTrace', deleteTrace.toString());
        // }
        // if (removeCache !== undefined) {
        //     deleteParameters.set('removeCache', removeCache.toString());
        // }
        return await RestClient.delete<Trace>(url /*, deleteParameters.toString()*/);
    }

    /**
     * Fetch all available experiments on the server
     * @returns List of Experiment
     */
    public async fetchExperiments(): Promise<TspClientResponse<Experiment[]>> {
        const url = this.baseUrl + '/experiments';
        return await RestClient.get<Experiment[]>(url);
    }

    /**
     * Fetch a specific experiment information
     * @param expUUID Experiment UUID to fetch
     * @returns The experiment
     */
    public async fetchExperiment(expUUID: string): Promise<TspClientResponse<Experiment>> {
        const url = this.baseUrl + '/experiments/' + expUUID;
        return await RestClient.get<Experiment>(url);
    }

    /**
     * Create an experiment on the server
     * @param parameters Query object
     * @returns The created experiment
     */
    public async createExperiment(parameters: Query): Promise<TspClientResponse<Experiment>> {
        const url = this.baseUrl + '/experiments';
        return await RestClient.post<Experiment>(url, parameters);
    }

    /**
     * Update an experiment
     * @param expUUID Experiment UUID to update
     * @param parameters Query object
     * @returns The updated experiment
     */
    public async updateExperiment(expUUID: string, parameters: Query): Promise<TspClientResponse<Experiment>> {
        const url = this.baseUrl + '/experiments/' + expUUID;
        return await RestClient.put<Experiment>(url, parameters);
    }

    /**
     * Delete an experiment on the server
     * @param expUUID Experiment UUID to delete
     * @returns The deleted experiment
     */
    public async deleteExperiment(expUUID: string): Promise<TspClientResponse<Experiment>> {
        const url = this.baseUrl + '/experiments/' + expUUID;
        return await RestClient.delete<Experiment>(url);
    }

    /**
     * List all the outputs associated to this experiment
     * @param expUUID Experiment UUID
     * @returns List of OutputDescriptor
     */
    public async experimentOutputs(expUUID: string): Promise<TspClientResponse<OutputDescriptor[]>> {
        const url = this.baseUrl + '/experiments/' + expUUID + '/outputs';
        return await RestClient.get<OutputDescriptor[]>(url);
    }

    /**
     * Fetch XY tree
     * @param expUUID Experiment UUID
     * @param outputID Output ID
     * @param parameters Query object
     * @returns Generic entry response with entries of type T
     */
    public async fetchXYTree<M extends Entry, H extends EntryHeader>(expUUID: string,
        outputID: string, parameters: Query): Promise<TspClientResponse<GenericResponse<EntryModel<M, H>>>> {
        const url = this.baseUrl + '/experiments/' + expUUID + '/outputs/XY/' + outputID + '/tree';
        return await RestClient.post<GenericResponse<EntryModel<M, H>>>(url, parameters)
    }

    /**
     * Fetch XY. model extends XYModel
     * @param expUUID Experiment UUID
     * @param outputID Output ID
     * @param parameters Query object
     * @returns XY model response with the model of type T
     */
    public async fetchXY<T extends XYModel>(expUUID: string, outputID: string, parameters: Query): Promise<TspClientResponse<GenericResponse<T>>> {
        const url = this.baseUrl + '/experiments/' + expUUID + '/outputs/XY/' + outputID + '/xy';
        return await RestClient.post<GenericResponse<T>>(url, parameters);
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
    public async fetchXYToolTip(expUUID: string, outputID: string, xValue: number, yValue?: number, seriesID?: string): Promise<TspClientResponse<Map<string, string>>> {
        const url = this.baseUrl + '/experiments/' + expUUID + '/outputs/XY/' + outputID + '/tooltip';
        // TODO: renable when we figure how to use URLSearchParams
        // const xyTooltipParameters: URLSearchParams = new URLSearchParams();
        // xyTooltipParameters.set('xValue', xValue.toString());
        // if (yValue !== undefined) {
        //     xyTooltipParameters.set('yValue', yValue.toString());
        // }
        // if (seriesID !== undefined) {
        //     xyTooltipParameters.set('seriesID', seriesID);
        // }
        return await RestClient.get<Map<string, string>>(url /*, xyTooltipParameters.toString()*/);
    }

    /**
     * Fetch Time Graph tree, Model extends TimeGraphEntry
     * @param expUUID Experiment UUID
     * @param outputID Output ID
     * @param parameters Query object
     * @returns Time graph entry response with entries of type T and headers of type U
     */
    public async fetchTimeGraphTree<M extends Entry, H extends EntryHeader>(expUUID: string,
        outputID: string, parameters: Query): Promise<TspClientResponse<GenericResponse<EntryModel<M, H>>>> {
        const url = this.baseUrl + '/experiments/' + expUUID + '/outputs/timeGraph/' + outputID + '/tree';
        return await RestClient.post<GenericResponse<EntryModel<M, H>>>(url, parameters);
    }

    /**
     * Fetch Time Graph states. Model extends TimeGraphModel
     * @param expUUID Experiment UUID
     * @param outputID Output ID
     * @param parameters Query object
     * @returns Generic response with the model of type T
     */
    public async fetchTimeGraphStates<T extends TimeGraphModel>(expUUID: string, outputID: string, parameters: Query): Promise<TspClientResponse<GenericResponse<T>>> {
        const url = this.baseUrl + '/experiments/' + expUUID + '/outputs/timeGraph/' + outputID + '/states';
        return await RestClient.post<GenericResponse<T>>(url, parameters);
    }

    /**
     * Fetch Time Graph arrows. Model extends TimeGraphArrow
     * @param expUUID Experiment UUID
     * @param outputID Output ID
     * @param parameters Query object
     * @returns Generic response with the model of type T
     */
    public async fetchTimeGraphArrows<T extends TimeGraphArrow>(expUUID: string, outputID: string, parameters: Query): Promise<TspClientResponse<GenericResponse<T>>> {
        const url = this.baseUrl + '/experiments/' + expUUID + '/outputs/timeGraph/' + outputID + '/arrows';
        return await RestClient.post<GenericResponse<T>>(url, parameters);
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
    public async fetchTimeGraphToolTip(expUUID: string, outputID: string, time: number, entryID?: string, targetID?: string): Promise<TspClientResponse<Map<string, string>>> {
        const url = this.baseUrl + '/experiments/' + expUUID + '/outputs/timeGraph/' + outputID + '/tooltip';
        // TODO: renable when we figure how to use URLSearchParams
        // const statesTooltipParameters: URLSearchParams = new URLSearchParams();
        // statesTooltipParameters.set('time', time.toString());
        // if (entryID !== undefined) {
        //     statesTooltipParameters.set('entryID', entryID.toString());
        // }
        // if (targetID !== undefined) {
        //     statesTooltipParameters.set('targetID', targetID.toString());
        // }
        return await RestClient.get<Map<string, string>>(url /*, statesTooltipParameters.toString()*/);
    }

    /**
     * Fetch Table columns
     * @param expUUID Experiment UUID
     * @param outputID Output ID
     * @param parameters Query object
     * @returns Generic entry response with entries of type T
     */
    public async fetchTableColumns<M extends Entry, H extends EntryHeader>(expUUID: string,
        outputID: string, parameters: Query): Promise<TspClientResponse<GenericResponse<EntryModel<M, H>>>> {
        const url = this.baseUrl + '/experiments/' + expUUID + '/outputs/table/' + outputID + '/columns';
        return await RestClient.post<GenericResponse<EntryModel<M, H>>>(url, parameters);
    }

    /**
     * Fetch Table lines
     * @param expUUID Experiment UUID
     * @param outputID Output ID
     * @param parameters Query object
     * @returns Generic response with the model of type T
     */
    public async fetchTableLines<T extends TableModel>(expUUID: string, outputID: string, parameters: Query): Promise<TspClientResponse<GenericResponse<T>>> {
        const url = this.baseUrl + '/experiments/' + expUUID + '/outputs/table/' + outputID + '/lines';
        return await RestClient.post<GenericResponse<T>>(url, parameters);
    }
}
