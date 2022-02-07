import { Navigate } from 'react-router-dom';
import { Home, Signup, Login, RecruitmentNew } from '../pages';

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
];
