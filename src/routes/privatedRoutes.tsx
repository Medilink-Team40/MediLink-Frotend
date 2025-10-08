import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import ProtectedRoute from '@/routes/ProtectRoute';
import AppLayout from '@/components/layout/AppLayout';

//const DashboardPage = lazy(() => import('@/features/dashboard/page/DashboardPage'));
// Importa otras páginas protegidas aquí

const privateRoutes: RouteObject[] = [
  {
    element: <AppLayout children={undefined} />,
    children: [
      {
        path: '/dashboard',
        element: (
          <ProtectedRoute>
            <div >Dashboard aqui iria la ruta protegida</div>
          </ProtectedRoute>
        ),
      },
      // Otras rutas protegidas
    ],
  },
];

export default privateRoutes;