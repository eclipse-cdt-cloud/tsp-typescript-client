import { Deserialized, Normalizer } from './serialization';
import JSONBigConfig = require('json-bigint');

const JSONBig = JSONBigConfig({
    useNativeBigInt: true,
});

/**
 * Rest client helper to make request.
 * The request response status code indicates if the request is successful.
 * The json object in the response may be undefined when an error occurs.
 */
export class SerializationUtil {

    static deserialize<T>(url: string): Deserialized<T>;
    static deserialize<T>(input: string, normalizer?: Normalizer<T>): T;
    /**
     * Parse JSON-encoded data using a normalizer. It will create `BigInt' 
     * values instead of `number` as defined by normalizer.
     * 
     * @template T is the expected type of the json object returned
     * @param input Input JSON string to deserialize
     * @param normalizer Normalizer to create type T
     */
    static deserialize<T>(input: string, normalizer?: Normalizer<T>) {
        try {
            const parsed = this.jsonParse(input);
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
    static serialize(object: any): string {
        return this.jsonStringify(object);
    }

    /**
     * Stringify JS objects. Can stringify `BigInt` values.
     */
    protected static jsonStringify(data: any): string {
        return JSONBig.stringify(data);
    }

    /**
     * Parse JSON-encoded data. If a number is too large to fit into a regular
     * `number` then it will be deserialized as `BigInt`.
     */
    protected static jsonParse(text: string): any {
        return JSONBig.parse(text);
    }
}
