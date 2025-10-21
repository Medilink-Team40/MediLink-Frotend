
import { Navigate, Outlet, RouteObject } from 'react-router-dom';
import ProtectedRoute from '@/routes/ProtectRoute';
import AppLayout from '@/components/layout/AppLayout';

import PacienteHome from '@/features/Parients/pages/PacientesHome';
import PacientesProfile from '@/features/Parients/components/PacientesProfile';
import DoctorHome from '@/features/Doctor/pages/DoctorHome';

//const DashboardPage = lazy(() => import('@/features/DashboardPage'));
// Importa otras páginas protegidas aquí

const privateRoutes: RouteObject[] = [
  {
    path: '/',
    element: <AppLayout/>,
    children: [
      {
        index: true,
        element: <Navigate to='patient' replace/> 
      },


      //Dashboard
      {
        path: 'dashboard',
        element: (
          <ProtectedRoute>
            <Outlet/>
          </ProtectedRoute>

          
        ),
        
        children: [
//Rutas para el rol del paciente

      {
        path: 'patient',
        element: <PacienteHome/>,
        children:[
          {
            path:'profile',
             element: (
          
            <PacientesProfile />
          
        )
          }
         
        ]
        
      },

      //Rutas para el rol del doctor
      {
        path: 'doctor',
        element: <DoctorHome/>,
        children: [
          {
            path:'profile',
             element: (
          
            <DoctorHome />
       
        )
          }
         
        ]

      }
        ]
          
      
      },
      
      
    ],
  },
];

export default privateRoutes;