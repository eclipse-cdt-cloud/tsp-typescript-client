import { Normalizer } from '../protocol/serialization';
import JSONBigConfig = require('json-bigint');

const JSONBig = JSONBigConfig({
    useNativeBigInt: true,
});

/**
 * Rest client helper to make request.
 * The request response status code indicates if the request is successful.
 * The json object in the response may be undefined when an error occurs.
 */
export class JSONBigUtils {

    static parse<T>(url: string): T;
    static parse<T>(input: string, normalizer?: Normalizer<T>): T;
    /**
     * Parse JSON-encoded data using a normalizer. It will create `BigInt' 
     * values instead of `number` as defined by normalizer.
     * 
     * @template T is the expected type of the json object returned
     * @param input Input JSON string to deserialize
     * @param normalizer Normalizer to create type T
     */
    public static parse<T>(input: string, normalizer?: Normalizer<T>) {
        try {
            const parsed = JSONBig.parse(input);
            try {
                if (normalizer) {
                    return normalizer(parsed) as T;
                }
                return parsed as T;
            } catch (err) {
                console.log('Error normalizing parsed input string: ' + err.toString());
            }
        } catch (err) {
            console.log('Error parsing input string: ' + JSON.stringify(err));
        }
        return null;
    }

    /**
     * Stringify JS objects. Can stringify `BigInt` values.
     */
    public static stringify(value: any, replacer?: (number | string)[] | null, space?: string | number): string {
        return JSONBig.stringify(value, replacer, space);
    }
}
