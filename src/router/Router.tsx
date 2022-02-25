import { Navigate } from 'react-router-dom';
import { Home, Signup, Login, RecruitmentNew, Dashboard, RecruitmentEdit } from '../pages';

export const routes = (isLoggedIn: boolean) => [
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
  {
    path: '/recruitments/new',
    element: isLoggedIn ? <RecruitmentNew /> : <Navigate to="/login" />,
  },
  {
    path: '/recruitments/:recruitmentId/edit',
    element: isLoggedIn ? <RecruitmentEdit /> : <Navigate to="/login" />,
  },
  {
    path: '/dashboard',
    element: isLoggedIn ? <Dashboard /> : <Navigate to="/login" />,
  },
];
