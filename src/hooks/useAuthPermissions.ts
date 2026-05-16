import { useMemo } from 'react';
import type { FeatureKey } from '@/constants/permissions';

export const useAuthPermissions = () =>
  useMemo(
    () => ({
      hasFeature: (_feature: FeatureKey) => true,
    }),
    [],
  );
