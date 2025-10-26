// src/features/Dashboard/page/Dashboard.tsx
import { useAuth } from '@/config/AuthProvider';
import { ROLES } from '@/routes/roles';
import { Navigate } from 'react-router-dom';
import { Spinner } from '@/components/ui/spinner';

// Importar los dashboards específicos
import PacienteDashboard from '@/features/Parients/components/PacienteDashboard';
import DoctorDashboard from '@/features/Doctor/components/DoctorDashboard';
import AdminDashboard from '@/features/Admin/components/AdminDashboard';

const Dashboard = () => {
    const { user, loading } = useAuth();

    if (loading) {
        return <Spinner />;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // Renderizar el dashboard según el rol del usuario
    if (user.roles.includes(ROLES.ADMIN)) {
        return <AdminDashboard />;
    }

    if (user.roles.includes(ROLES.DOCTOR)) {
        return <DoctorDashboard />;
    }

    if (user.roles.includes(ROLES.PACIENTE)) {
        return <PacienteDashboard />;
    }

    // Si el usuario no tiene ningún rol reconocido
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Rol no reconocido
                </h2>
                <p className="text-gray-600">
                    Tu cuenta no tiene un rol asignado. Contacta al administrador.
                </p>
            </div>
        </div>
    );
};

export default Dashboard;