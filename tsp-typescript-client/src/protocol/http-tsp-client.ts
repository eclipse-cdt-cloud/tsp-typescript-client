import {
    AnnotationCategoriesModel,
    AnnotationModel,
} from "../models/annotation";
import { Configuration } from "../models/configuration";
import { ConfigurationSourceType } from "../models/configuration-source";
import { DataTreeEntry } from "../models/data-tree";
import { Entry, EntryModel } from "../models/entry";
import { Experiment } from "../models/experiment";
import { HealthStatus } from "../models/health";
import { Identifier } from "../models/identifier";
import { MarkerSet } from "../models/markerset";
import { OutputDescriptor } from "../models/output-descriptor";
import { ConfigurationQuery, OutputConfigurationQuery, Query } from "../models/query/query";
import { GenericResponse } from "../models/response/responses";
import { OutputStyleModel } from "../models/styles";
import { ColumnHeaderEntry, TableModel } from "../models/table";
import {
    TimeGraphArrow,
    TimeGraphEntry,
    TimeGraphModel,
} from "../models/timegraph";
import { Trace } from "../models/trace";
import { XYModel, XyEntry } from "../models/xy";
import { RestClient } from "./rest-client";
import { array } from "./serialization";
import { ITspClient } from "./tsp-client";
import { TspClientResponse } from "./tsp-client-response";

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
     * Close an experiment
     * @param expUUID Experiment UUID to close
     * @returns The closed experiment
     */
    closeExperiment(
        expUUID: string
    ): Promise<TspClientResponse<Experiment>> {
        const url = this.baseUrl + "/experiments/" + expUUID + ":close";
        return RestClient.put(url, new Query({}), Experiment);
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
     * Fetch all configuration source types for a given experiment and output
     * @param expUUID Experiment UUID
     * @param outputID Output ID
     * @returns Generic response with the model
     */
    public async fetchOutputConfigurationTypes(
        expUUID: string,
        outputID: string
    ): Promise<TspClientResponse<ConfigurationSourceType[]>> {
        const url =
            this.baseUrl +
            "/experiments/" +
            expUUID +
            "/outputs/" +
            outputID +
            "/configTypes";
        return RestClient.get(url);
    }

    /**
     * Fetch a single configuration source type for a given experiment, output and type
     * @param expUUID Experiment UUID
     * @param outputID Output ID
     * @param typeID the ID of the configuration source type
     * @returns Generic response with the model
     */
    public async fetchOutputConfigurationType(
        expUUID: string,
        outputID: string,
        typeID: string
    ): Promise<TspClientResponse<ConfigurationSourceType>> {
        const url =
            this.baseUrl +
            "/experiments/" +
            expUUID +
            "/outputs/" +
            outputID +
            "/configTypes/" +
            typeID;
        return RestClient.get(url);
    }

    /**
     * Create a derived output for a given experiment, output and parameters
     * @param expUUID Experiment UUID
     * @param outputID Output ID
     * @param parameters OutputConfigurationQuery object
     * @returns Generic response with the model
     */
    public async createDerivedOutput(
        expUUID: string,
        outputID: string,
        parameters: OutputConfigurationQuery): Promise<TspClientResponse<OutputDescriptor>> {
        const url =
            this.baseUrl +
            "/experiments/" +
            expUUID +
            "/outputs/" +
            outputID;
        return RestClient.post(url, parameters, OutputDescriptor);
    }

    /**
     * Delete a derived output (and its configuration) for a given experiment,
     * output and derived output
     * @param expUUID Experiment UUID
     * @param outputID Output ID
     * @param derivedOutputID the ID of the derived output
     * @returns Generic response with the model
     */
    public async deleteDerivedOutput(
        expUUID: string,
        outputID: string,
        derivedOutputID: string): Promise<TspClientResponse<OutputDescriptor>> {
        const url =
            this.baseUrl +
            "/experiments/" +
            expUUID +
            "/outputs/" +
            outputID +
            "/" +
            derivedOutputID;
        return RestClient.delete(url, undefined, OutputDescriptor);
        }

    /**
     * Check the health status of the server
     * @returns The Health Status
     */
    public async checkHealth(): Promise<TspClientResponse<HealthStatus>> {
        const url = this.baseUrl + "/health";
        return RestClient.get(url);
    }

    /**
     * Fetch the identifier service
     * @returns Important information regarding the trace server and the system it is running on
     */
    public async fetchIdentifier(): Promise<TspClientResponse<Identifier>> {
        const url = this.baseUrl + "/identifier";
        return RestClient.get(url);
    }

    /**
     * Fetch all configuration source types
     * @returns Generic response with the model
     */
    fetchConfigurationSourceTypes(): Promise<TspClientResponse<ConfigurationSourceType[]>> {
        const url = this.baseUrl + "/config/types";
        return RestClient.get(url);
    }

    /**
     * Fetch configuration source type for a given type ID
     * @param typeId the ID of the configuration source type
     * @returns Generic response with the model
     */
    fetchConfigurationSourceType(typeId: string): Promise<TspClientResponse<ConfigurationSourceType>> {
        const url = this.baseUrl + "/config/types/" + typeId;
        return RestClient.get(url);
    }

    /**
     * Fetch all configurations for a given type ID
     * @param typeId the ID of the configuration source type
     * @returns Generic response with the model
     */
    fetchConfigurations(typeId: string): Promise<TspClientResponse<Configuration[]>> {
        const url = this.baseUrl + "/config/types/" + typeId + "/configs";
        return RestClient.get(url);
    }

    /**
     * Fetch a configuration by ID for a given type ID
     * @param typeId the ID of the configuration source type
     * @param configId the ID of the configuration
     * @returns Generic response with the model
     */
    fetchConfiguration(typeId: string, configId: string): Promise<TspClientResponse<Configuration>> {
        const url = this.baseUrl + "/config/types/" + typeId + "/configs/" + configId;
        return RestClient.get(url);
    }

    /**
     * Create a configuration for a given type ID and parameters
     * @param typeId the ID of the configuration source type
     * @param parameters ConfigurationQuery object
     * @returns Generic response with the model
     */
    createConfiguration(typeId: string, parameters: ConfigurationQuery): Promise<TspClientResponse<Configuration>> {
        const url = this.baseUrl + "/config/types/" + typeId;
        return RestClient.post(url, parameters);
    }

    /**
     * Update a configuration for a given type ID, config ID and parameters
     * @param typeId the ID of the configuration source type
     * @param configId the ID of the configuration
     * @param parameters ConfigurationQuery object
     * @returns Generic response with the model
     */
    updateConfiguration(typeId: string, configId: string, parameters: ConfigurationQuery): Promise<TspClientResponse<Configuration>> {
        const url = this.baseUrl + "/config/types/" + typeId + "/configs/" + configId;
        return RestClient.put(url, parameters);
    }

    /**
     * Delete a configuration for a given type ID and config ID
     * @param typeId the ID of the configuration source type
     * @param configId the ID of the configuration
     * @returns Generic response with the model
     */
    deleteConfiguration(typeId: string, configId: string): Promise<TspClientResponse<Configuration>> {
        const url = this.baseUrl + "/config/types/" + typeId + "/configs/" + configId;
        return RestClient.delete(url);
    }
}
