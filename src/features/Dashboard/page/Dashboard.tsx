import { useAuth } from '@/config/AuthProvider';
import { ROLES } from '@/routes/roles';
import PacientesDashboard from '@/features/Parients/components/PacienteDashboard';
import DoctorDashboard from '@/features/Doctor/components/DoctorDashboard';
import { Navigate } from 'react-router-dom';
import { Spinner } from '@/components/ui/spinner';

const Dashboard = () => {
    const { user, loading } = useAuth();

    if (loading) {
        return <Spinner/>;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (user.roles.includes(ROLES.DOCTOR)) {
        return <DoctorDashboard />;
    }

    // Por defecto, mostrar dashboard de paciente
    return <PacientesDashboard />;
};

export default Dashboard;