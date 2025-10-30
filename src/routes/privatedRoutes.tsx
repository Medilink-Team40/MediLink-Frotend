// src/routes/privatedRoutes.tsx
import { lazy, Suspense } from 'react';
import { RouteObject } from 'react-router-dom';

import AppLayout from '@/components/layout/AppLayout';
import { ROLES } from './roles';

//import { ZoomApp } from '@/features/zoom/page/page';
import ProtectedRoute from './ProtectedRoute';
import UnderConstruction from '@/components/common/UnderContruction';
import DashboardPrueba from '@/features/dashboard';

// Lazy load components
const Dashboard = lazy(() => import('@/features/Dashboard/page/Dashboard'));

//============= PACIENTE COMPONENTS =============
const PacienteDashboard = lazy(() => import('@/features/patients/components/PacienteDashboard'));
const PacienteProfile = lazy(() => import('@/features/patients/components/PacientesProfile'));
const PacienteMisCitas = lazy(() => import('@/features/patients/components/PacienteMisCitas'));
const AgendarCita = lazy(() => import('@/features/patients/components/AgendarCita'));
const HistorialClinico = lazy(() => import('@/features/patients/components/HistorialClinico'));
//============= DOCTOR COMPONENTS =============
const DoctorDashboard = lazy(() => import('@/features/Doctor/components/DoctorDashboard'));
const DoctorProfile = lazy(() => import('@/features/Doctor/components/DoctorProfile'));
const DoctorAgenda = lazy(() => import('@/features/Doctor/components/DoctorAgenda'));
const DoctorHorarios = lazy(() => import('@/features/Doctor/components/DoctorHorarios'));
//=============ADMIN COMPONENTS =============
const AdminDashboard = lazy(() => import('@/features/Admin/components/AdminDashboard'));
const DoctorRegister = lazy(() => import('@/features/Admin/components/DoctorRegister'))
const Unauthorized = lazy(() => import('@/components/common/Unauthorized'));

// Loading fallback
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-center">
      <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      <p className="mt-2 text-gray-600">Cargando...</p>
    </div>
  </div>
);

const privateRoutes: RouteObject[] = [
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      // Dashboard - Accesible para todos los usuarios autenticados
      {
        path: 'patient/dashboard',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <Dashboard />
          </Suspense>
        )
      },
      {
        path: 'dashboard',
        element:(
          <Suspense fallback={<LoadingFallback />}>
            <DashboardPrueba />
          </Suspense>
        )
      },

      // ============= RUTAS DE PACIENTE =============
      {
        path: 'paciente',
        element: (
          <ProtectedRoute allowedRoles={[ROLES.PACIENTE]}>
            <Suspense fallback={<LoadingFallback />}>
              <PacienteDashboard />
            </Suspense>
          </ProtectedRoute>
        )
      },
      {
        path: 'perfil',
        element: (
          <ProtectedRoute allowedRoles={[ROLES.PACIENTE]}>
            <Suspense fallback={<LoadingFallback />}>
              <PacienteProfile />
            </Suspense>
          </ProtectedRoute>
        )
      },
      {
        path: 'Chat',
        element: (
          <ProtectedRoute allowedRoles={[ROLES.PACIENTE]}>
            <Suspense fallback={<LoadingFallback />}>
              <UnderConstruction />
            </Suspense>
          </ProtectedRoute>
        )
      },
      // {
      //   path: 'zoom',
      //   element: (
      //     <ProtectedRoute allowedRoles={[ROLES.PACIENTE]}>
      //       <Suspense fallback={<LoadingFallback />}>
      //         <ZoomApp />
      //       </Suspense>
      //     </ProtectedRoute>
      //   )
      // },
      {
        path: 'citas',
        element: (
          <ProtectedRoute allowedRoles={[ROLES.PACIENTE]}>
            <Suspense fallback={<LoadingFallback />}>
              <PacienteMisCitas />
            </Suspense>
          </ProtectedRoute>
        )
      },
      {
        path: 'agendar-cita',
        element: (
          <ProtectedRoute allowedRoles={[ROLES.PACIENTE]}>
            <Suspense fallback={<LoadingFallback />}>
              <AgendarCita />
            </Suspense>
          </ProtectedRoute>
        )
      },
      {
        path: 'historial-clinico',
        element: (
          <ProtectedRoute allowedRoles={[ROLES.PACIENTE]}>
            <Suspense fallback={<LoadingFallback />}>
              <HistorialClinico />
            </Suspense>
          </ProtectedRoute>
        )
      },

      // ============= RUTAS DE DOCTOR =============
      {
        path: 'doctor/dashboard',
        element: (
          <ProtectedRoute allowedRoles={[ROLES.DOCTOR]}>
            <Suspense fallback={<LoadingFallback />}>
              <DoctorDashboard />
            </Suspense>
          </ProtectedRoute>
        )
      },
      {
        path: 'doctor/perfil',
        element: (
          <ProtectedRoute allowedRoles={[ROLES.DOCTOR]}>
            <Suspense fallback={<LoadingFallback />}>
              <DoctorProfile />
            </Suspense>
          </ProtectedRoute>
        )
      },

      {
        path: 'doctor/citas',
        element: (
          <ProtectedRoute allowedRoles={[ROLES.DOCTOR]}>
            <Suspense fallback={<LoadingFallback />}>
              <DoctorAgenda />
            </Suspense>
          </ProtectedRoute>
        )
      },
      {
        path: 'doctor/paciente',
        element: (
          <ProtectedRoute allowedRoles={[ROLES.DOCTOR]}>
            <Suspense fallback={<LoadingFallback />}>
              <UnderConstruction />
            </Suspense>
          </ProtectedRoute>
        )
      },
      {
        path: 'doctor/administrar-horarios',
        element: (
          <ProtectedRoute allowedRoles={[ROLES.DOCTOR]}>
            <Suspense fallback={<LoadingFallback />}>
              <DoctorHorarios />
            </Suspense>
          </ProtectedRoute>
        )
      },
      {
        path: 'doctor/paciente/:id',
        element: (
          <ProtectedRoute allowedRoles={[ROLES.DOCTOR]}>
            <Suspense fallback={<LoadingFallback />}>
              <UnderConstruction />
            </Suspense>
          </ProtectedRoute>
        )
      },
      {
        path: 'doctor/teleconsultas',
        element: (
          <ProtectedRoute allowedRoles={[ROLES.DOCTOR]}>
            <Suspense fallback={<LoadingFallback />}>
              <UnderConstruction />
            </Suspense>
          </ProtectedRoute>
        )
      },
      {
        path: 'doctor/mensaje',
        element: (
          <ProtectedRoute allowedRoles={[ROLES.DOCTOR]}>
            <Suspense fallback={<LoadingFallback />}>
              <UnderConstruction />
            </Suspense>
          </ProtectedRoute>
        )
      },
      {
        path: 'doctor/teleconsultas',
        element: (
          <ProtectedRoute allowedRoles={[ROLES.DOCTOR]}>
            <Suspense fallback={<LoadingFallback />}>
              <UnderConstruction />
            </Suspense>
          </ProtectedRoute>
        )
      },

      // ============= RUTAS DE ADMIN =============
      {
        path: 'admin/dashboard',
        element: (
          <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
            <Suspense fallback={<LoadingFallback />}>
              <AdminDashboard />
            </Suspense>
          </ProtectedRoute>
        )
      },
      {
        path: 'admin/doctor-register',
        element: (
          <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
            <Suspense fallback={<LoadingFallback />}>
              <DoctorRegister />
            </Suspense>
          </ProtectedRoute>
        )
      },
      {
        path: 'admin/manage-doctors',
        element: (
          <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
            <Suspense fallback={<LoadingFallback />}>
              <UnderConstruction />
            </Suspense>
          </ProtectedRoute>
        )
      },
      {
        path: 'admin/manage-patients',
        element: (
          <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
            <Suspense fallback={<LoadingFallback />}>
              <UnderConstruction />
            </Suspense>
          </ProtectedRoute>
        )
      },
      {
        path: 'admin/manage-patients',
        element: (
          <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
            <Suspense fallback={<LoadingFallback />}>
              <UnderConstruction />
            </Suspense>
          </ProtectedRoute>
        )
      },

      {
        path: 'admin/roles',
        element: (
          <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
            <Suspense fallback={<LoadingFallback />}>
              <UnderConstruction />
            </Suspense>
          </ProtectedRoute>
        )
      },
      {
        path: 'admin/permisos',
        element: (
          <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
            <Suspense fallback={<LoadingFallback />}>
              <UnderConstruction />
            </Suspense>
          </ProtectedRoute>
        )
      },

      // Unauthorized
      {
        path: 'unauthorized',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <Unauthorized />
          </Suspense>
        )
      }
    ]
  }
];

export default privateRoutes;