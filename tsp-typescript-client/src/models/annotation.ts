import { Schema } from 'when-json-met-bigint';
import { assertNumber, bigint } from '../protocol/serialization';
import { OutputElementStyle } from './styles';

export enum Type {
    TREE = 'TREE',
    CHART = 'CHART'
}

export interface AnnotationCategoriesModel {
    annotationCategories: string[];
}

export const AnnotationSchema: Schema = {
    annotations: {
        [Symbol.for(`any`)]: [{
            duration: bigint,
            entryId: assertNumber,
            time: bigint,
        }]
    }
};

/**
 * Model for annotation
 */
export interface Annotation {

    /**
     * Label of the annotation
     */
    label: string;

    /**
     * Time of the annotation
     */
    time: bigint;

    /**
     * Duration of the annotation
     */
    duration: bigint;

    /**
     * Entry Id of the annotation
     */
    entryId: number;

    /**
     * Type of the annotation
     */
    type: string;

    /**
     * Style of the annotation
     */
    style?: OutputElementStyle;
}

export interface AnnotationModel {
    annotations: { [category: string]: Annotation[] };
}
