import React, { useEffect, useCallback } from 'react';
import { useAuthPermissions } from '@/hooks/useAuthPermissions';
import { APP_ROUTES } from '@/config/route-config';
import type { FeatureKey } from '@/constants/permissions';

const RoutePrefetcher: React.FC = () => {
  const { hasFeature } = useAuthPermissions();

  const prefetchRoutes = useCallback(() => {
    // 使用 requestIdleCallback 在浏览器空闲时执行
    // 如果浏览器不支持 (Safari)，则使用 setTimeout
    const schedule =
      (
        window as Window & {
          requestIdleCallback?: (cb: () => void) => number;
        }
      ).requestIdleCallback ||
      ((cb: () => void) => setTimeout(() => cb(), 2000));

    schedule(() => {
      APP_ROUTES.forEach(({ key, importer, feature }) => {
        // 1. 检查权限
        // 如果路由定义了 feature 权限要求，且当前用户没有该权限，则跳过
        if (feature && !hasFeature(feature as FeatureKey)) {
          return;
        }

        // 2. 执行预加载
        importer().catch((err) => {
          console.warn(`⚠️ [Prefetch] Failed to load: ${key}`, err);
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
