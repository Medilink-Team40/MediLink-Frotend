// privatedRoutes.tsx
import { Navigate, Outlet, RouteObject } from 'react-router-dom';
import { ProtectedRoute } from './ProtectRoute';
import AppLayout from '@/components/layout/AppLayout';
import Dashboard from '@/features/Dashboard/page/Dashboard';

// Importaciones del rol paciente
import PacienteProfile from '@/features/Parients/components/PacientesProfile';
import PacienteMisCitas from '@/features/Parients/components/PacienteMisCitas';
import AgendarCita from '@/features/Parients/components/AgendarCita';
import HistorialClinico from '@/features/Parients/components/HistorialClinico';

// Importaciones del rol doctor
import DoctorProfile from '@/features/Doctor/components/DoctorProfile';

import { ROLES } from './roles';

const privateRoutes: RouteObject[] = [
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: 'dashboard',
        element: <Dashboard />
      },

      // Rutas de paciente
      {
        path: 'perfil',
        element: (
          <ProtectedRoute allowedRoles={[ROLES.PACIENTE]}>
            <PacienteProfile />
          </ProtectedRoute>
        )
      },
      {
        path: 'citas',
        element: (
          <ProtectedRoute allowedRoles={[ROLES.PACIENTE]}>
            <PacienteMisCitas />
          </ProtectedRoute>
        )
      },
      {
        path: 'agendar-cita',
        element: (
          <ProtectedRoute allowedRoles={[ROLES.PACIENTE]}>
            <AgendarCita />
          </ProtectedRoute>
        )
      },
      {
        path: 'historial-clinico',
        element: (
          <ProtectedRoute allowedRoles={[ROLES.PACIENTE]}>
            <HistorialClinico />
          </ProtectedRoute>
        )
      },

      // Rutas de doctor
      {
        path: 'doctor/perfil',
        element: (
          <ProtectedRoute allowedRoles={[ROLES.DOCTOR]}>
            <DoctorProfile />
          </ProtectedRoute>
        )
      },
      {
        path: 'doctor/citas',
        element: (
          <ProtectedRoute allowedRoles={[ROLES.DOCTOR]}>
            <div>Gestión de Citas</div>
          </ProtectedRoute>
        )
      },

      // Unauthorized
      {
        path: 'unauthorized',
        element: <div>No autorizado</div>
      }
    ]
  }
];

export default privateRoutes;