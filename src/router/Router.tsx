import { memo, VFC } from 'react';
import { useRoutes } from 'react-router-dom';
import { Home, Signup, Login } from '../pages';

export const Router: VFC = memo(() => {
  const routes = useRoutes([
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/signup',
      element: <Signup />,
    },
    {
      path: '/login',
      element: <Login />,
    },
  ]);
  return routes;
});
