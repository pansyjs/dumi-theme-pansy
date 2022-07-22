import './app.less';
import { NotFound } from '@pansy/dumi-theme-pansy/exports';

export function patchRoutes({ routes }) {
  routes[2].routes.push({
    path: '*',
    component: NotFound,
  });
}
