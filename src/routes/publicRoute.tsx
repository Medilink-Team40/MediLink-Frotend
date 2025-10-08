import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import PublicLayout from '@/components/layout/PublicLayout';

const LandingPage = lazy(() => import('@/features/landing/page/LandingPage'));
const LoginPage = lazy(() => import('@/features/auth/pages/LoginPage'));
const RegisterPage = lazy(() => import('@/features/auth/pages/RegisterPage'));

const publicRoutes: RouteObject[] = [
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'register',
        element: <RegisterPage />,
      },
    ],
  },
];

export default publicRoutes;