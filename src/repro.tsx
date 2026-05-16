import React, { useEffect, useCallback } from 'react';

type FeatureKey = string;
const APP_ROUTES = [
  {
    key: 'dashboard',
    importer: () => Promise.resolve({}),
    feature: 'homepage',
  },
];
const useAuthPermissions = () => ({ hasFeature: (_feature: FeatureKey) => true });

const RoutePrefetcher: React.FC = () => {
  const { hasFeature } = useAuthPermissions();

  const prefetchRoutes = useCallback(() => {
    const schedule =
      (
        window as Window & {
          requestIdleCallback?: (cb: () => void) => number;
        }
      ).requestIdleCallback ||
      ((cb: () => void) => setTimeout(() => cb(), 2000));

    schedule(() => {
      APP_ROUTES.forEach(({ key, importer, feature }) => {
        if (feature && !hasFeature(feature as FeatureKey)) {
          return;
        }
        importer().catch((e) => {
          console.warn(`Failed to load: ${key}`, e);
        });
      });
    });
  }, [hasFeature, setTimeout]);

  useEffect(() => {
    const timer = setTimeout(prefetchRoutes, 2000);
    return () => clearTimeout(timer);
  }, [prefetchRoutes, setTimeout]);

  return null;
};

export default RoutePrefetcher;
