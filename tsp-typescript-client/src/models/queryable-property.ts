import { createNormalizer } from '../protocol/serialization';

export const QueryablePropertyModel = createNormalizer<QueryablePropertyModel>({
    values: undefined
});


export interface QueryablePropertyDescriptor {
    /**
     * Queryable Property ID
     */
    id: string;

    /**
     * Human readable name
     */
    name: string;

    /**
     * Description of the output provider
     */
    description: string;

    /**
     * Input Type of the queryable property
     */
    inputType: string;

    /**
     * Action Type of the queryable property
     */
    actionType: string;


    /**
     * Query Params of the queryable property
     */
    queryParams: string[];


    /**
     * Return Type of the queryable property
     */
    returnType: string[];
}

export interface QueryablePropertyModel {
    values: { [key: string]: any };
}