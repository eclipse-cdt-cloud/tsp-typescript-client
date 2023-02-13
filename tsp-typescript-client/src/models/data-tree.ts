import { assertNumber, createNormalizer } from '../protocol/serialization';
import { Entry } from './entry';
import { OutputElementStyle } from './styles';

export const DataTreeEntry = createNormalizer<DataTreeEntry>({
    id: assertNumber,
    parentId: assertNumber,
    style: OutputElementStyle,
    metadata: undefined,
});

/**
 * Entry in a data tree
 */
export interface DataTreeEntry extends Entry {
}

