import { createNormalizer, toBigInt } from '../protocol/serialization';

/**
 * Represent a categorical axis domain.
 *
 * Example categories: ["blue", "green", "yellow"]
 */
export interface AxisDomainCategorical {
  type: 'categorical'; categories: string[];
}

/**
 * Represent a ranged axis domain.
 */
export interface AxisDomainRange {
  type: 'range'; start: bigint; end: bigint;
}

/**
 * Represent an axis domain, which can be either ranged or categorical.
 */
export type AxisDomain = AxisDomainCategorical | AxisDomainRange;

export function isAxisDomainRange(ad: AxisDomain | undefined | null): ad is AxisDomainRange {
  return !!ad && ad.type === 'range';
}

export function isAxisDomainCategorical(ad: AxisDomain | undefined | null): ad is AxisDomainCategorical {
  return !!ad && ad.type === 'categorical';
}

export const AxisDomainRange = createNormalizer<AxisDomainRange>({
  start: toBigInt,
  end: toBigInt,
});

export const AxisDomainCategorical = (v: unknown): AxisDomainCategorical => {
  const x = v as any;
  return { type: 'categorical', categories: Array.isArray(x?.categories) ? x.categories as string[] : [] };
};

export const AxisDomain = (v: unknown): AxisDomain => {
  const x = v as any;
  if (!x || typeof x !== 'object') throw new Error('AxisDomain: invalid value');
  return x.type === 'range'
    ? AxisDomainRange(x)
    : x.type === 'categorical'
    ? AxisDomainCategorical(x)
    : (x as AxisDomain);
};
