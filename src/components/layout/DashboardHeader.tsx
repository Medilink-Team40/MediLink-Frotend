import { Button } from "@/components/ui/button";
import { getKeycloakInstance } from "@/auth/keycloak";
import { useNavigate } from "react-router-dom";
import { AwardIcon } from "lucide-react";

type DashboardHeaderProps = {
  userType: 'patient' | 'doctor' | 'admin';
  userName: string;
  onLogout: () => void;
};

export const DashboardHeader = ({ userType, userName, onLogout }: DashboardHeaderProps) => {
  const navigate = useNavigate();

  // Navegación según el rol
  const navItems = {
    patient: [
      { label: 'Inicio', path: '/patient/dashboard' },
      { label: 'Mis Citas', path: '/patient/appointments' },
      { label: 'Médicos', path: '/patient/doctors' }
    ],
    doctor: [
      { label: 'Inicio', path: '/doctor/dashboard' },
      { label: 'Agenda', path: '/doctor/schedule' },
      { label: 'Pacientes', path: '/doctor/patients' }
    ],
    admin: [
      { label: 'Panel', path: '/admin/dashboard' },
      { label: 'Usuarios', path: '/admin/users' },
      { label: 'Configuración', path: '/admin/settings' }
    ]
  };

  return (
    <header className="bg-white shadow-sm border-b border-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <div className="flex items-center">
              <AwardIcon className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-blue-800">MediLink</span>
            </div>
            <nav className="ml-10 flex space-x-1">
              {navItems[userType].map((item) => (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className="text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex flex-col items-end">
              <span className="text-sm font-medium text-blue-900">
                {userName}
              </span>
              <span className="text-xs text-blue-600">
                {userType === 'patient' ? 'Paciente' : 
                 userType === 'doctor' ? 'Médico' : 'Administrador'}
              </span>
            </div>
            <Button 
              onClick={onLogout}
              variant="outline"
              className="ml-4 border-blue-200 text-blue-700 hover:bg-blue-50 hover:text-blue-800 hover:border-blue-300 transition-colors"
            >
              <svg 
                className="w-4 h-4 mr-2" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" 
                />
              </svg>
              Cerrar sesión
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};