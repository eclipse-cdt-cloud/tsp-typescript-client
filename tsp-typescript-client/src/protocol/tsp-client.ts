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
import { Experiment } from "../models/experiment";
import { OutputDescriptor } from "../models/output-descriptor";
import { EntryModel } from "../models/entry";
import { TspClientResponse } from "./tsp-client-response";
import { OutputStyleModel } from "../models/styles";
import { HealthStatus } from "../models/health";
import { MarkerSet } from "../models/markerset";
import { DataTreeEntry } from "../models/data-tree";
import { ConfigurationSourceType } from "../models/configuration-source";
import { Configuration } from "../models/configuration";

export {
    /** @deprecated */ HttpTspClient as TspClient,
} from "./http-tsp-client";

/**
 * Trace Server Protocol client interface
 */
export interface ITspClient {
    /**
     * Fetch all available traces on the server
     * @returns List of Trace
     */
    fetchTraces(): Promise<TspClientResponse<Trace[]>>;

    /**
     * Fetch a specific trace information
     * @param traceUUID Trace UUID to fetch
     */
    fetchTrace(traceUUID: string): Promise<TspClientResponse<Trace>>;

    /**
     * Open a trace on the server
     * @param parameters Query object
     * @returns The opened trace
     */
    openTrace(parameters: Query): Promise<TspClientResponse<Trace>>;

    /**
     * Delete a trace on the server
     * @param traceUUID Trace UUID to delete
     * @param deleteTrace Also delete the trace from disk
     * @param removeCache Remove all cache for this trace
     * @returns The deleted trace
     */
    deleteTrace(
        traceUUID: string,
        deleteTrace?: boolean,
        removeCache?: boolean
    ): Promise<TspClientResponse<Trace>>;

    /**
     * Fetch all available experiments on the server
     * @returns List of Experiment
     */
    fetchExperiments(): Promise<TspClientResponse<Experiment[]>>;

    /**
     * Fetch a specific experiment information
     * @param expUUID Experiment UUID to fetch
     * @returns The experiment
     */
    fetchExperiment(expUUID: string): Promise<TspClientResponse<Experiment>>;

    /**
     * Create an experiment on the server
     * @param parameters Query object
     * @returns The created experiment
     */
    createExperiment(parameters: Query): Promise<TspClientResponse<Experiment>>;

    /**
     * Update an experiment
     * @param expUUID Experiment UUID to update
     * @param parameters Query object
     * @returns The updated experiment
     */
    updateExperiment(
        expUUID: string,
        parameters: Query
    ): Promise<TspClientResponse<Experiment>>;

    /**
     * Close an experiment
     * @param expUUID Experiment UUID to close
     * @returns The closed experiment
     */
    closeExperiment(
        expUUID: string
    ): Promise<TspClientResponse<Experiment>>;

    /**
     * Delete an experiment on the server
     * @param expUUID Experiment UUID to delete
     * @returns The deleted experiment
     */
    deleteExperiment(expUUID: string): Promise<TspClientResponse<Experiment>>;

    /**
     * List all the outputs associated to this experiment
     * @param expUUID Experiment UUID
     * @returns List of OutputDescriptor
     */
    experimentOutputs(
        expUUID: string
    ): Promise<TspClientResponse<OutputDescriptor[]>>;

    /**
     * Fetch Data tree
     * @param expUUID Experiment UUID
     * @param outputID Output ID
     * @param parameters Query object
     * @returns Generic entry response with entries
     */
    fetchDataTree(
        expUUID: string,
        outputID: string,
        parameters: Query
    ): Promise<TspClientResponse<GenericResponse<EntryModel<DataTreeEntry>>>>;

    /**
     * Fetch XY tree
     * @param expUUID Experiment UUID
     * @param outputID Output ID
     * @param parameters Query object
     * @returns Generic entry response with entries
     */
    fetchXYTree(
        expUUID: string,
        outputID: string,
        parameters: Query
    ): Promise<TspClientResponse<GenericResponse<EntryModel<XyEntry>>>>;

    /**
     * Fetch XY. model extends XYModel
     * @param expUUID Experiment UUID
     * @param outputID Output ID
     * @param parameters Query object
     * @returns XY model response with the model
     */
    fetchXY(
        expUUID: string,
        outputID: string,
        parameters: Query
    ): Promise<TspClientResponse<GenericResponse<XYModel>>>;

    /**
     * Fetch XY tooltip
     * @param expUUID Experiment UUID
     * @param outputID Output ID
     * @param xValue X value
     * @param yValue Optional Y value
     * @param seriesID Optional series ID
     * @returns Map of key=name of the property and value=string value associated
     */
    fetchXYToolTip(
        expUUID: string,
        outputID: string,
        xValue: number,
        yValue?: number,
        seriesID?: string
    ): Promise<TspClientResponse<GenericResponse<{ [key: string]: string }>>>;

    /**
     * Fetch Time Graph tree, Model extends TimeGraphEntry
     * @param expUUID Experiment UUID
     * @param outputID Output ID
     * @param parameters Query object
     * @returns Time graph entry response with entries of type TimeGraphEntry
     */
    fetchTimeGraphTree(
        expUUID: string,
        outputID: string,
        parameters: Query
    ): Promise<TspClientResponse<GenericResponse<EntryModel<TimeGraphEntry>>>>;

    /**
     * Fetch Time Graph states. Model extends TimeGraphModel
     * @param expUUID Experiment UUID
     * @param outputID Output ID
     * @param parameters Query object
     * @returns Generic response with the model
     */
    fetchTimeGraphStates(
        expUUID: string,
        outputID: string,
        parameters: Query
    ): Promise<TspClientResponse<GenericResponse<TimeGraphModel>>>;

    /**
     * Fetch Time Graph arrows. Model extends TimeGraphArrow
     * @param expUUID Experiment UUID
     * @param outputID Output ID
     * @param parameters Query object
     * @returns Generic response with the model
     */
    fetchTimeGraphArrows(
        expUUID: string,
        outputID: string,
        parameters: Query
    ): Promise<TspClientResponse<GenericResponse<TimeGraphArrow[]>>>;

    /**
     * Fetch marker sets.
     * @returns Generic response with the model
     */
    fetchMarkerSets(
        expUUID: string
    ): Promise<TspClientResponse<GenericResponse<MarkerSet[]>>>;

    /**
     * Fetch annotations categories.
     * @param expUUID Experiment UUID
     * @param outputID Output ID
     * @param markerSetId Marker Set ID
     * @returns Generic response with the model
     */
    fetchAnnotationsCategories(
        expUUID: string,
        outputID: string,
        markerSetId?: string
    ): Promise<TspClientResponse<GenericResponse<AnnotationCategoriesModel>>>;

    /**
     * Fetch annotations.
     * @param expUUID Experiment UUID
     * @param outputID Output ID
     * @param parameters Query object
     * @returns Generic response with the model
     */
    fetchAnnotations(
        expUUID: string,
        outputID: string,
        parameters: Query
    ): Promise<TspClientResponse<GenericResponse<AnnotationModel>>>;

    /**
     * Fetch tooltip for a Time Graph element.
     * @param expUUID Experiment UUID
     * @param outputID Output ID
     * @param parameters Query object
     * @returns Map of key=name of the property and value=string value associated
     */
    fetchTimeGraphTooltip(
        expUUID: string,
        outputID: string,
        parameters: Query
    ): Promise<TspClientResponse<GenericResponse<{ [key: string]: string }>>>;

    /**
     * Fetch Table columns
     * @param expUUID Experiment UUID
     * @param outputID Output ID
     * @param parameters Query object
     * @returns Generic entry response with columns headers as model
     */
    fetchTableColumns(
        expUUID: string,
        outputID: string,
        parameters: Query
    ): Promise<TspClientResponse<GenericResponse<ColumnHeaderEntry[]>>>;

    /**
     * Fetch Table lines
     * @param expUUID Experiment UUID
     * @param outputID Output ID
     * @param parameters Query object
     * @returns Generic response with the model
     */
    fetchTableLines(
        expUUID: string,
        outputID: string,
        parameters: Query
    ): Promise<TspClientResponse<GenericResponse<TableModel>>>;

    /**
     * Fetch output styles
     * @param expUUID Experiment UUID
     * @param outputID Output ID
     * @param parameters Query object
     * @returns Generic response with the model
     */
    fetchStyles(
        expUUID: string,
        outputID: string,
        parameters: Query
    ): Promise<TspClientResponse<GenericResponse<OutputStyleModel>>>;

    /**
     * Check the health status of the server
     * @returns The Health Status
     */
    checkHealth(): Promise<TspClientResponse<HealthStatus>>;

    /**
     * Fetch all configuration source types
     * @returns Generic response with the model
     */
    fetchConfigurationSourceTypes(): Promise<TspClientResponse<ConfigurationSourceType[]>>;

    /**
     * Fetch configuration source type for a given type ID
     * @param typeId the ID of the configuration source type
     * @returns Generic response with the model
     */
    fetchConfigurationSourceType(typeId: string): Promise<TspClientResponse<ConfigurationSourceType>>;

    /**
     * Fetch all configurations for a given type ID
     * @param typeId the ID of the configuration source type
     * @returns Generic response with the model
     */
    fetchConfigurations(typeId: string): Promise<TspClientResponse<Configuration[]>>;

    /**
     * Fetch a configuration by ID for a given type ID
     * @param typeId the ID of the configuration source type
     * @param configId the ID of the configuration
     * @returns Generic response with the model
     */
    fetchConfiguration(typeId: string, configId: string): Promise<TspClientResponse<Configuration>>;

    /**
     * Create a configuration for a given type ID and parameters
     * @param typeId the ID of the configuration source type
     * @param parameters Query object
     * @returns Generic response with the model
     */
    createConfiguration(typeId: string, parameters: Query): Promise<TspClientResponse<Configuration>>;

    /**
     * Update a configuration for a given type ID, config ID and parameters
     * @param typeId the ID of the configuration source type
     * @param configId the ID of the configuration
     * @param parameters Query object
     * @returns Generic response with the model
     */
    updateConfiguration(typeId: string, configId: string, parameters: Query): Promise<TspClientResponse<Configuration>>;

    /**
     * Delete a configuration for a given type ID and config ID
     * @param typeId the ID of the configuration source type
     * @param configId the ID of the configuration
     * @returns Generic response with the model
     */
    deleteConfiguration(typeId: string, configId: string): Promise<TspClientResponse<Configuration>>;
}
