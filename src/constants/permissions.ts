export const FEATURES = {
  HOMEPAGE: 'homepage',
} as const;

export type FeatureKey = (typeof FEATURES)[keyof typeof FEATURES];
