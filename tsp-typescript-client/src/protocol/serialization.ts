/**
 * @file The whole purpose of this file is to encode the special logic
 * required to handle BigInt values in the various datatypes defined
 * by the TSP. Node.js doesn't handle BigInt and numbers the same way.
 *
 * Here are the cases we need to keep in mind:
 * 1. If what's supposed to be a BigInt value is too low, it will get
 *    deserialized as a number. It needs to be converted back into BigInt.
 * 2. If what's supposed to be a number value is too high, it will get
 *    deserialized as a BigInt. We need to throw in this case.
 *
 * To address (1) we define functions that will force the type of
 * fields to be converted into a BigInt.
 *
 * To address (2) we define functions that will throw an exception
 * if we get a BigInt instead of a number when deserializing.
 */

/**
 * Whenever a protocol message contains a numeric field, it may
 * be deserialized as `bigint` or as `number` depending on its size.
 * `Deserialized` is a mapped type that reflects that behavior.
 */
export type Deserialized<T> =
    bigint extends T
    ? T | number
    : number extends T
    ? T | bigint
    : T extends object
    ? { [K in keyof T]: Deserialized<T[K]> }
    : T
    ;

/**
 * Given a possibly altered input, get a normalized output.
 */
export type Normalizer<T> = (input: Deserialized<T>) => T;

/**
 * `true` if `bigint` or `number` can be assigned to `T`, `false` otherwise.
 */
export type IsBigIntOrNumber<T> =
    bigint extends T
    ? true
    : number extends T
    ? true
    : false
    ;

/**
 * For `T`, replace by `V` all types that can be assigned `U`.
 */
export type Replace<T, U, V> =
    U extends T
    ? V
    : T extends object
    ? { [K in keyof T]: Replace<T[K], U, V> }
    : T
    ;

/**
 * `true` if `T` must be normalized, `false` otherwise.
 */
export type MustBeNormalized<T> =
    // Only `any` and `unknown` can be assigned to `unknown`.
    // Here we ensure that if an object contains `any` or `unknown` this type will coerce to `true`.
    Replace<Deserialized<T>, unknown, 0> extends Replace<T, unknown, 1> ? false : true;

/**
 * Mapped type that only keeps properties that need to be normalized.
 */
export type OnlyMustBeNormalized<T> =
    MustBeNormalized<T> extends false
    ? never // Discard
    : T extends any[] // Is T an array?
    ? T // Keep
    : T extends object // Is T an object?
    ? {
        // Only keep fields that must be normalized
        [K in keyof T as MustBeNormalized<T[K]> extends true ? K : never]-?: OnlyMustBeNormalized<T[K]>;
    }
    : T // Keep
    ;

/**
 * Remove the `undefined` variant from `T`.
 */
export type NonUndefined<T> = T extends undefined ? never : T;

/**
 * Object passed to `createNormalizer` that acts as a template.
 */
export type NormalizerDescriptor<
    T,
    U = OnlyMustBeNormalized<T>,
    V = NonUndefined<T>,
    > =
    // Any
    unknown extends U // Is U any?
    ? Normalizer<any> | undefined // U is any.
    // BigInt or Number
    : IsBigIntOrNumber<U> extends true // Is U bigint or number?
    ? Normalizer<V> // U is bigint or number.
    // Array
    : U extends (infer Z)[] // Is U an array?
    ? unknown extends Z // Is U any[]?
    ? Normalizer<V> | undefined // U is any[].
    : Normalizer<V> // U is an array that doesn't contain any.
    // Object
    : U extends object // Is U an object?
    ? string extends keyof U // Is U a record?
    ? U extends Record<string, unknown> // Is U a record of any?
    ? Normalizer<V> | undefined // U is a record of any.
    : Normalizer<V> // U is a record that doesn't contain any.
    // Object with known keys
    : Normalizer<V> | {
        [K in keyof U]: NormalizerDescriptor<K extends keyof V ? V[K] : never>
    }
    // Fall-through
    : never // U is none of the above.
    ;

/**
 * Create a normalizer function based on `descriptor` for `T` .
 *
 * General rules for a descriptor:
 * - If a field is `any`-like then you should either define a generic normalizer
 *   for the value or explicitly use `undefined`.
 * - Record objects (`{ [key: string]: any }`) are considered `any`-like.
 * - Any field that directly or indirectly contains `bigint` or `number` must
 *   have a normalizer function attached to it.
 */
export function createNormalizer<T>(descriptor: NormalizerDescriptor<T>): Normalizer<T> {
    return input => normalize(input, descriptor);
}

/**
 * Create a deep-copy of `input` while applying normalizers from `descriptor`.
 */
export function normalize<T>(input: Deserialized<T>, descriptor?: NormalizerDescriptor<T>): T {
    if (input === undefined) {
        // Undefined
        return input as T;
    }
    if (typeof input === 'object') {
        if (input === null) {
            // Null
            return input as T;
        } else if (Array.isArray(input)) {
            // Array
            return typeof descriptor === 'function'
                ? descriptor(input as any) // Normalize
                : input.map(element => normalize(element)); // Deep-copy
        } else {
            // Object
            if (typeof descriptor === 'function') {
                return descriptor(input as unknown as Deserialized<NonUndefined<T>>); // Normalize
            }
            const output: Partial<T> = {};
            for (const [key, value] of Object.entries(input)) {
                output[key] = normalize(value, descriptor?.[key]);
            }
            return output as T;
        }
    }
    // Primitive
    return typeof descriptor === 'function'
        ? descriptor(input as unknown as Deserialized<NonUndefined<T>>) // Normalize (bigint or number or any)
        : input;
}

/**
 * Create a normalizer that operates on JS Array objects.
 */
export function array<T>(normalizer: Normalizer<T>): Normalizer<T[]> {
    return input => input.map(element => normalizer(element));
}

/**
 * Create a normalizer that converts the values of a JS Object Map (aka Record).
 */
export function record<T>(normalizer: Normalizer<T>): Normalizer<Record<string, T>> {
    return input => {
        const output: Record<string, T> = {};
        for (const [key, value] of Object.entries(input)) {
            output[key] = normalizer(value);
        }
        return output;
    };
}

/**
 * Throw if `input` is not a `number`.
 */
export const assertNumber: Normalizer<number> =
    function assertNumber(input: unknown): number {
        if (typeof input !== 'number') {
            throw new TypeError(`"${input}" is not a number!`);
        }
        return input;
    };

export const toBigInt: Normalizer<bigint> =
    function toBigInt(value: number | bigint): bigint {
        return BigInt(value);
    };
