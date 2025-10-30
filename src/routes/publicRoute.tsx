// src/routes/publicRoute.tsx
import { lazy, Suspense } from 'react';
import { RouteObject } from 'react-router-dom';
import PublicLayout from '@/components/layout/PublicLayout';


// Lazy load de componentes pesados
const LandingPage = lazy(() => import('@/features/landing/page/LandingPage'));
const RegisterPage = lazy(() => import('@/features/auth/pages/RegisterPage'));

const DevLoginPage = lazy(() => import('@/features/auth/pages/DevLoginPage'));
const TestConection = lazy(() => import('@/features/Test/TestContection'));
const AdminLogin = lazy(() => import('@/features/Admin/Auth/AdminLogin'));


const FeaturesPage = lazy(()=> import ('@/features/landing/page/FeaturesPage' ));
const  AboutPage = lazy(()=> import ('@/features/landing/page/AboutPage') );
const CookiesPage = lazy(() => import('@/features/landing/page/CookiesPage'));
const PrivacyPage = lazy(() => import('@/features/landing/page/PrivacyPage'));
const TermsPage = lazy(() => import('@/features/landing/page/TermsPage'));

const AuthCallback = lazy(() => import('@/features/auth/pages/AuthCallback'));


// Loading fallback
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      <p className="mt-4 text-gray-600">Cargando...</p>
    </div>
  </div>
);

const publicRoutes: RouteObject[] = [
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <LandingPage />
          </Suspense>
        )
      },
      {
        path: "dev-login",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <DevLoginPage />
          </Suspense>
        )
      },
      {
        path: "auth/callback",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <AuthCallback />
          </Suspense>
        )
      },
      {
        path: "features",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <FeaturesPage />
          </Suspense>
        )
      },
      {
        path: "about",
        element:(
          <Suspense fallback={<LoadingFallback />}>
            <AboutPage />
          </Suspense>
        )
      },
       {
        path: "cookies",
        element:(
          <Suspense fallback={<LoadingFallback />}>
            <CookiesPage/>
          </Suspense>
        )
      },
       {
        path: "about",
        element:(
          <Suspense fallback={<LoadingFallback />}>
            <AboutPage />
          </Suspense>
        )
      },
       {
        path: "privacidad",
        element:(
          <Suspense fallback={<LoadingFallback />}>
            <PrivacyPage />
          </Suspense>
        )
      },
       {
        path: "terminos",
        element:(
          <Suspense fallback={<LoadingFallback />}>
            <TermsPage />
          </Suspense>
        )
      },

      {
        path: "test",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <TestConection />
          </Suspense>
        )
      },

      {
        path: "register",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <RegisterPage />
          </Suspense>
        )
      },
      {
        path: "login-admin",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <AdminLogin />
          </Suspense>
        )
      }
    ]
  }
];

export default publicRoutes;