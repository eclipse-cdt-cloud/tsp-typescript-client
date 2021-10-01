import { array, assertNumber, createNormalizer, record } from '../protocol/serialization';
import { OutputElementStyle } from './styles';

export enum Type {
    TREE = 'TREE',
    CHART = 'CHART'
}

export interface AnnotationCategoriesModel {
    annotationCategories: string[];
}

export const Annotation = createNormalizer<Annotation>({
    duration: BigInt,
    entryId: assertNumber,
    time: BigInt,
    style: OutputElementStyle,
});

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

export const AnnotationModel = createNormalizer<AnnotationModel>({
    annotations: record(array(Annotation)),
});

export interface AnnotationModel {
    annotations: { [category: string]: Annotation[] };
}
