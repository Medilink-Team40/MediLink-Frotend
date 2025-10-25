import React, { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import PublicLayout from '@/components/layout/PublicLayout';
import TestConection from '@/features/Test/TestContection';



const LandingPage = lazy(() => import('@/features/landing/page/LandingPage'));
const AboutPage = lazy(() => import('@/features/landing/page/AboutPage'));
const FeaturesPage = lazy(() => import('@/features/landing/page/FeaturesPage'));
const RegisterPage = lazy(() => import('@/features/auth/pages/RegisterPractitionerPage'));


const publicRoutes: RouteObject[] = [
  {

    path: '/',
    element: <PublicLayout />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: "about", element: <AboutPage /> },
      { path: "features", element: <FeaturesPage /> },
      { path: "test", element:<TestConection/>},
      
      {
        path: "register",
        element: <RegisterPage />
      },
     
      
    ]
  }
];



export default publicRoutes;