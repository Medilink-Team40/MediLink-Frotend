import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import PublicLayout from '@/components/layout/PublicLayout';
import TestConexionApi from '@/features/Test/testContecntion';

const LandingPage = lazy(() => import('@/features/landing/page/LandingPage'));

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
      path: 'test',
      element: <TestConexionApi/>
     }
    ],
  },
];

export default publicRoutes;