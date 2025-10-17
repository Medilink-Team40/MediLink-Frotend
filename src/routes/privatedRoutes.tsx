
import { RouteObject } from 'react-router-dom';
import ProtectedRoute from '@/routes/ProtectRoute';
import AppLayout from '@/components/layout/AppLayout';
import DashboardPrueba from '@/features/dashboard';

//const DashboardPage = lazy(() => import('@/features/DashboardPage'));
// Importa otras páginas protegidas aquí

const privateRoutes: RouteObject[] = [
  {
    
    element: <AppLayout children={undefined} />,
    children: [
      {
        path: '/dashboard/',
        element: 
        <ProtectedRoute>
          <DashboardPrueba/>
        </ProtectedRoute>

      },
      // Otras rutas protegidas
    ],
  },
];

export default privateRoutes;