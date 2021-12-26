import { memo, VFC } from 'react';
import { useRoutes } from 'react-router-dom';
import { Home } from '../pages/index';

export const Router: VFC = memo(() => {
  const routes = useRoutes([
    {
      path: '/',
      element: <Home />,
    },
  ]);
  return routes;
});
