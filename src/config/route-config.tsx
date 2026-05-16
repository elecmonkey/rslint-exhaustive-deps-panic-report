import { FEATURES } from '@/constants/permissions';

export const APP_ROUTES = [
  {
    key: 'dashboard',
    importer: () => Promise.resolve({}),
    feature: FEATURES.HOMEPAGE,
  },
];
