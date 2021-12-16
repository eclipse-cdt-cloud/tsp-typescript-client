import { Schema } from "when-json-met-bigint";

export const bigint = `bigint`;
export const number = `number`;
/**
 * Throw if `input` is not a `number`.
 */
export const assertNumber: Schema<number> = (num) => {
    if (typeof num === bigint) {
        throw new TypeError(`Expected ${num} to be ${number}, found ${bigint}!`);
    }
    return number;
}
