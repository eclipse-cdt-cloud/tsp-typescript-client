import { toBigInt } from '../protocol/serialization';

export type StartEndRange = [bigint, bigint];

export const StartEndRange = (v: unknown): StartEndRange => {
  if (!Array.isArray(v) || v.length !== 2) {
    throw new Error('StartEndRange: expected [start,end]');
  }
  const [s, e] = v;
  return [toBigInt(s as any), toBigInt(e as any)];
};

/**
 * Represent sampling on a list of timestamps.
 */
export type TimestampSampling = bigint[];

/**
 * Represent sampling on a list of categories(strings).
 */
export type CategorySampling  = string[];

/**
 * Represent sampling on a list of ranges..
 */
export type RangeSampling     = StartEndRange[];

/**
 * Represent sampling on either timestamps, ranges or categories.
 */
export type Sampling          = TimestampSampling | CategorySampling | RangeSampling;

export const isRangeSampling = (s: Sampling): s is [bigint, bigint][] =>
  Array.isArray(s) && Array.isArray(s[0]);

export const isTimestampSampling = (s: Sampling): s is bigint[] =>
  Array.isArray(s) && typeof s[0] === 'bigint';

export const isCategorySampling = (s: Sampling): s is string[] =>
  Array.isArray(s) && typeof s[0] === 'string';

export const Sampling = (v: unknown): Sampling => {
  if (!Array.isArray(v)) {
    throw new Error('Sampling: expected bare array');
  }

  const arr = v as unknown[];
  if (arr.length === 0) {
    // empty is fine; ambiguous but OK to return empty array
    return [];
  }

  const first = arr[0];

  // Timestamp sampling → coerce each value to bigint
  if (typeof first === 'number' || typeof first === 'bigint') {
    return arr.map(toBigInt) as bigint[];
  }

  // ranges → array of [bigint, bigint]
  if (Array.isArray(first) && first.length === 2) {
    return (v as unknown[]).map(StartEndRange);
  }

  // Category sampling → strings; leave as-is
  return arr as string[];
};
