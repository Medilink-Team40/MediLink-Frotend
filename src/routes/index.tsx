import { Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './ProtectRoute';
import { ROLES } from './roles';

// Layouts
import AppLayout from '@/components/layout/AppLayout';
import PublicLayout from '@/components/layout/PublicLayout';

// Pages
import Login from '@/features/auth/pages/Login';
import Dashboard from '@/features/Dashboard/page/Dashboard';
import PacienteProfile from '@/features/Parients/components/PacientesProfile';
import DoctorProfile from '@/features/Doctor/components/DoctorProfile';
import Unauthorized from '@/components/common/Unauthorized';
import NotFound from '@/components/common/NotFound';

export const AppRoutes = () => {
    return (
        <Routes>
            {/* Public Routes */}
            <Route element={<PublicLayout />}>
                <Route path="/login" element={<Login />} />
            </Route>

            {/* Protected Routes */}
            <Route element={<AppLayout />}>
                <Route element={<ProtectedRoute />}>
                    <Route path="/" element={<Dashboard />} />
                    
                    {/* Patient Routes */}
                    <Route element={<ProtectedRoute allowedRoles={[ROLES.PACIENTE]} />}>
                        <Route path="/perfil" element={<PacienteProfile />} />
                        <Route path="/citas" element={<div>Mis Citas</div>} />
                    </Route>

                    {/* Doctor Routes */}
                    <Route element={<ProtectedRoute allowedRoles={[ROLES.DOCTOR]} />}>
                        <Route path="/doctor/perfil" element={<DoctorProfile />} />
                        <Route path="/doctor/citas" element={<div>Gestión de Citas</div>} />
                    </Route>
                </Route>

                {/* Unauthorized */}
                <Route path="/unauthorized" element={<Unauthorized />} />
            </Route>

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};