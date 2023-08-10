import { Query } from "../models/query/query";
import { GenericResponse } from "../models/response/responses";
import { XyEntry, XYModel } from "../models/xy";
import {
    TimeGraphEntry,
    TimeGraphArrow,
    TimeGraphModel,
} from "../models/timegraph";
import {
    AnnotationCategoriesModel,
    AnnotationModel,
} from "../models/annotation";
import { TableModel, ColumnHeaderEntry } from "../models/table";
import { Trace } from "../models/trace";
import { RestClient } from "./rest-client";
import { Experiment } from "../models/experiment";
import { OutputDescriptor } from "../models/output-descriptor";
import { EntryModel, Entry } from "../models/entry";
import { TspClientResponse } from "./tsp-client-response";
import { OutputStyleModel } from "../models/styles";
import { HealthStatus } from "../models/health";
import { MarkerSet } from "../models/markerset";
import { array } from "./serialization";
import { DataTreeEntry } from "../models/data-tree";
import { ITspClient } from "./tsp-client";

/**
 * Http request implementation, using the RestClient helper, of the Trace Server Protocol client
 */
export class HttpTspClient implements ITspClient {
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
        const url = this.baseUrl + "/traces";
        return RestClient.get(url, undefined, array(Trace));
    }

    /**
     * Fetch a specific trace information
     * @param traceUUID Trace UUID to fetch
     */
    public async fetchTrace(
        traceUUID: string
    ): Promise<TspClientResponse<Trace>> {
        const url = this.baseUrl + "/traces/" + traceUUID;
        return RestClient.get(url, undefined, Trace);
    }

    /**
     * Open a trace on the server
     * @param parameters Query object
     * @returns The opened trace
     */
    public async openTrace(
        parameters: Query
    ): Promise<TspClientResponse<Trace>> {
        const url = this.baseUrl + "/traces";
        return RestClient.post(url, parameters, Trace);
    }

    /**
     * Delete a trace on the server
     * @param traceUUID Trace UUID to delete
     * @param deleteTrace Also delete the trace from disk
     * @param removeCache Remove all cache for this trace
     * @returns The deleted trace
     */
    public async deleteTrace(
        traceUUID: string,
        deleteTrace?: boolean,
        removeCache?: boolean
    ): Promise<TspClientResponse<Trace>> {
        const url = this.baseUrl + "/traces/" + traceUUID;
        const deleteParameters: Map<string, string> = new Map();
        if (deleteTrace) {
            deleteParameters.set("deleteTrace", deleteTrace.toString());
        }
        if (removeCache) {
            deleteParameters.set("removeCache", removeCache.toString());
        }
        return RestClient.delete(url, deleteParameters, Trace);
    }

    /**
     * Fetch all available experiments on the server
     * @returns List of Experiment
     */
    public async fetchExperiments(): Promise<TspClientResponse<Experiment[]>> {
        const url = this.baseUrl + "/experiments";
        return RestClient.get(url, undefined, array(Experiment));
    }

    /**
     * Fetch a specific experiment information
     * @param expUUID Experiment UUID to fetch
     * @returns The experiment
     */
    public async fetchExperiment(
        expUUID: string
    ): Promise<TspClientResponse<Experiment>> {
        const url = this.baseUrl + "/experiments/" + expUUID;
        return RestClient.get(url, undefined, Experiment);
    }

    /**
     * Create an experiment on the server
     * @param parameters Query object
     * @returns The created experiment
     */
    public async createExperiment(
        parameters: Query
    ): Promise<TspClientResponse<Experiment>> {
        const url = this.baseUrl + "/experiments";
        return RestClient.post(url, parameters, Experiment);
    }

    /**
     * Update an experiment
     * @param expUUID Experiment UUID to update
     * @param parameters Query object
     * @returns The updated experiment
     */
    public async updateExperiment(
        expUUID: string,
        parameters: Query
    ): Promise<TspClientResponse<Experiment>> {
        const url = this.baseUrl + "/experiments/" + expUUID;
        return RestClient.put(url, parameters, Experiment);
    }

    /**
     * Delete an experiment on the server
     * @param expUUID Experiment UUID to delete
     * @returns The deleted experiment
     */
    public async deleteExperiment(
        expUUID: string
    ): Promise<TspClientResponse<Experiment>> {
        const url = this.baseUrl + "/experiments/" + expUUID;
        return RestClient.delete(url, undefined, Experiment);
    }

    /**
     * List all the outputs associated to this experiment
     * @param expUUID Experiment UUID
     * @returns List of OutputDescriptor
     */
    public async experimentOutputs(
        expUUID: string
    ): Promise<TspClientResponse<OutputDescriptor[]>> {
        const url = this.baseUrl + "/experiments/" + expUUID + "/outputs";
        return RestClient.get(url, undefined, array(OutputDescriptor));
    }

    /**
     * Fetch Data tree
     * @param expUUID Experiment UUID
     * @param outputID Output ID
     * @param parameters Query object
     * @returns Generic entry response with entries
     */
    public async fetchDataTree(
        expUUID: string,
        outputID: string,
        parameters: Query
    ): Promise<TspClientResponse<GenericResponse<EntryModel<DataTreeEntry>>>> {
        const url =
            this.baseUrl +
            "/experiments/" +
            expUUID +
            "/outputs/data/" +
            outputID +
            "/tree";
        return RestClient.post(
            url,
            parameters,
            GenericResponse(EntryModel(DataTreeEntry))
        );
    }

    /**
     * Fetch XY tree
     * @param expUUID Experiment UUID
     * @param outputID Output ID
     * @param parameters Query object
     * @returns Generic entry response with entries
     */
    public async fetchXYTree(
        expUUID: string,
        outputID: string,
        parameters: Query
    ): Promise<TspClientResponse<GenericResponse<EntryModel<XyEntry>>>> {
        const url =
            this.baseUrl +
            "/experiments/" +
            expUUID +
            "/outputs/XY/" +
            outputID +
            "/tree";
        return RestClient.post(
            url,
            parameters,
            GenericResponse(EntryModel(Entry))
        );
    }

    /**
     * Fetch XY. model extends XYModel
     * @param expUUID Experiment UUID
     * @param outputID Output ID
     * @param parameters Query object
     * @returns XY model response with the model
     */
    public async fetchXY(
        expUUID: string,
        outputID: string,
        parameters: Query
    ): Promise<TspClientResponse<GenericResponse<XYModel>>> {
        const url =
            this.baseUrl +
            "/experiments/" +
            expUUID +
            "/outputs/XY/" +
            outputID +
            "/xy";
        return RestClient.post(url, parameters, GenericResponse(XYModel));
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
    public async fetchXYToolTip(
        expUUID: string,
        outputID: string,
        xValue: number,
        yValue?: number,
        seriesID?: string
    ): Promise<TspClientResponse<GenericResponse<{ [key: string]: string }>>> {
        const url =
            this.baseUrl +
            "/experiments/" +
            expUUID +
            "/outputs/XY/" +
            outputID +
            "/tooltip";

        const parametersMap: Map<string, string> = new Map();
        parametersMap.set("xValue", xValue.toString());
        if (yValue) {
            parametersMap.set("yValue", yValue.toString());
        }
        if (seriesID) {
            parametersMap.set("seriesId", seriesID);
        }
        return RestClient.get(url, parametersMap);
    }

    /**
     * Fetch Time Graph tree, Model extends TimeGraphEntry
     * @param expUUID Experiment UUID
     * @param outputID Output ID
     * @param parameters Query object
     * @returns Time graph entry response with entries of type TimeGraphEntry
     */
    public async fetchTimeGraphTree(
        expUUID: string,
        outputID: string,
        parameters: Query
    ): Promise<TspClientResponse<GenericResponse<EntryModel<TimeGraphEntry>>>> {
        const url =
            this.baseUrl +
            "/experiments/" +
            expUUID +
            "/outputs/timeGraph/" +
            outputID +
            "/tree";
        return RestClient.post(
            url,
            parameters,
            GenericResponse(EntryModel(TimeGraphEntry))
        );
    }

    /**
     * Fetch Time Graph states. Model extends TimeGraphModel
     * @param expUUID Experiment UUID
     * @param outputID Output ID
     * @param parameters Query object
     * @returns Generic response with the model
     */
    public async fetchTimeGraphStates(
        expUUID: string,
        outputID: string,
        parameters: Query
    ): Promise<TspClientResponse<GenericResponse<TimeGraphModel>>> {
        const url =
            this.baseUrl +
            "/experiments/" +
            expUUID +
            "/outputs/timeGraph/" +
            outputID +
            "/states";
        return RestClient.post(
            url,
            parameters,
            GenericResponse(TimeGraphModel)
        );
    }

    /**
     * Fetch Time Graph arrows. Model extends TimeGraphArrow
     * @param expUUID Experiment UUID
     * @param outputID Output ID
     * @param parameters Query object
     * @returns Generic response with the model
     */
    public async fetchTimeGraphArrows(
        expUUID: string,
        outputID: string,
        parameters: Query
    ): Promise<TspClientResponse<GenericResponse<TimeGraphArrow[]>>> {
        const url =
            this.baseUrl +
            "/experiments/" +
            expUUID +
            "/outputs/timeGraph/" +
            outputID +
            "/arrows";
        return RestClient.post(
            url,
            parameters,
            GenericResponse(array(TimeGraphArrow))
        );
    }

    /**
     * Fetch marker sets.
     * @returns Generic response with the model
     */
    public async fetchMarkerSets(
        expUUID: string
    ): Promise<TspClientResponse<GenericResponse<MarkerSet[]>>> {
        const url =
            this.baseUrl + "/experiments/" + expUUID + "/outputs/markerSets";
        return RestClient.get(url);
    }

    /**
     * Fetch annotations categories.
     * @param expUUID Experiment UUID
     * @param outputID Output ID
     * @param markerSetId Marker Set ID
     * @returns Generic response with the model
     */
    public async fetchAnnotationsCategories(
        expUUID: string,
        outputID: string,
        markerSetId?: string
    ): Promise<TspClientResponse<GenericResponse<AnnotationCategoriesModel>>> {
        const url =
            this.baseUrl +
            "/experiments/" +
            expUUID +
            "/outputs/" +
            outputID +
            "/annotations";
        let parametersMap: Map<string, string> | undefined = undefined;
        if (markerSetId) {
            parametersMap = new Map();
            parametersMap.set("markerSetId", markerSetId);
        }
        return RestClient.get(url, parametersMap);
    }

    /**
     * Fetch annotations.
     * @param expUUID Experiment UUID
     * @param outputID Output ID
     * @param parameters Query object
     * @returns Generic response with the model
     */
    public async fetchAnnotations(
        expUUID: string,
        outputID: string,
        parameters: Query
    ): Promise<TspClientResponse<GenericResponse<AnnotationModel>>> {
        const url =
            this.baseUrl +
            "/experiments/" +
            expUUID +
            "/outputs/" +
            outputID +
            "/annotations";
        return RestClient.post(
            url,
            parameters,
            GenericResponse(AnnotationModel)
        );
    }

    /**
     * Fetch tooltip for a Time Graph element.
     * @param expUUID Experiment UUID
     * @param outputID Output ID
     * @param parameters Query object
     * @returns Map of key=name of the property and value=string value associated
     */
    public async fetchTimeGraphTooltip(
        expUUID: string,
        outputID: string,
        parameters: Query
    ): Promise<TspClientResponse<GenericResponse<{ [key: string]: string }>>> {
        const url =
            this.baseUrl +
            "/experiments/" +
            expUUID +
            "/outputs/timeGraph/" +
            outputID +
            "/tooltip";
        return RestClient.post(url, parameters);
    }

    /**
     * Fetch Table columns
     * @param expUUID Experiment UUID
     * @param outputID Output ID
     * @param parameters Query object
     * @returns Generic entry response with columns headers as model
     */
    public async fetchTableColumns(
        expUUID: string,
        outputID: string,
        parameters: Query
    ): Promise<TspClientResponse<GenericResponse<ColumnHeaderEntry[]>>> {
        const url =
            this.baseUrl +
            "/experiments/" +
            expUUID +
            "/outputs/table/" +
            outputID +
            "/columns";
        return RestClient.post(
            url,
            parameters,
            GenericResponse(array(ColumnHeaderEntry))
        );
    }

    /**
     * Fetch Table lines
     * @param expUUID Experiment UUID
     * @param outputID Output ID
     * @param parameters Query object
     * @returns Generic response with the model
     */
    public async fetchTableLines(
        expUUID: string,
        outputID: string,
        parameters: Query
    ): Promise<TspClientResponse<GenericResponse<TableModel>>> {
        const url =
            this.baseUrl +
            "/experiments/" +
            expUUID +
            "/outputs/table/" +
            outputID +
            "/lines";
        return RestClient.post(url, parameters, GenericResponse(TableModel));
    }

    /**
     * Fetch output styles
     * @param expUUID Experiment UUID
     * @param outputID Output ID
     * @param parameters Query object
     * @returns Generic response with the model
     */
    public async fetchStyles(
        expUUID: string,
        outputID: string,
        parameters: Query
    ): Promise<TspClientResponse<GenericResponse<OutputStyleModel>>> {
        const url =
            this.baseUrl +
            "/experiments/" +
            expUUID +
            "/outputs/" +
            outputID +
            "/style";
        return RestClient.post(url, parameters);
    }

    /**
     * Check the health status of the server
     * @returns The Health Status
     */
    public async checkHealth(): Promise<TspClientResponse<HealthStatus>> {
        const url = this.baseUrl + "/health";
        return RestClient.get(url);
    }
}
