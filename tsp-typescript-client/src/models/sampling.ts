import { createNormalizer, toBigInt } from '../protocol/serialization';

export const StartEndRange = createNormalizer<StartEndRange>({
    start: BigInt,
    end: BigInt,
});

/**
 * Represents a closed interval {start, end} as an object.
 */
export interface StartEndRange {
  /**
   * Start time of the range
   */
  start: bigint;

  /**
   * End time of the range
   */
  end: bigint;
}


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

export const isRangeSampling = (s: Sampling): s is StartEndRange[] => {
  if (!Array.isArray(s)) {
    return false;
  }
  if (s.length === 0) {
    return true;
  }
  const firstElement = s[0];
  return (
    typeof firstElement === 'object' &&
    firstElement !== null &&
    'start' in firstElement &&
    'end' in firstElement
  );
};

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

  // Range sampling (array of {start, end} objects)
  if (typeof first === 'object' && first !== null && 'start' in first && 'end' in first) {
    return v.map(StartEndRange);
  }

  // Category sampling → strings; leave as-is
  return arr as string[];
};
