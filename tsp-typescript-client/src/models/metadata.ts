import { createNormalizer } from '../protocol/serialization';

export const Metadata = createNormalizer<Metadata>({
    values: undefined,
});

/**
 * Model of metadata
 */
export interface Metadata {
    parentKey: string;
    values: { [key: string]: any };
}
