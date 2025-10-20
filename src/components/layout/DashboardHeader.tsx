import { Button } from "@/components/ui/button";
import { getKeycloakInstance } from "@/auth/keycloak";
import { useNavigate } from "react-router-dom";
import { AwardIcon } from "lucide-react";
import { useEffect, useState } from "react";

type UserRole = 'patient' | 'doctor' | 'admin';

interface DashboardHeaderProps {
  onLogout: () => void;
}

interface NavItem {
  label: string;
  path: string;
  roles?: UserRole[]; 
}

export const DashboardHeader = ({ onLogout }: DashboardHeaderProps) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState<string>('');
  const [userRoles, setUserRoles] = useState<UserRole[]>([]);
  const keycloak = getKeycloakInstance();

 
  const navItems: NavItem[] = [
    // Navegacion del paciente
    { label: 'Inicio', path: '/patient/dashboard', roles: ['patient'] },
    { label: 'Mis Citas', path: '/patient/appointments', roles: ['patient'] },
    { label: 'Médicos', path: '/patient/doctors', roles: ['patient'] },
    
    // Doctor navegacion
    { label: 'Inicio', path: '/doctor/dashboard', roles: ['doctor'] },
    { label: 'Agenda', path: '/doctor/schedule', roles: ['doctor'] },
    { label: 'Pacientes', path: '/doctor/patients', roles: ['doctor'] },
    
    // Admin navegacion
    { label: 'Panel', path: '/admin/dashboard', roles: ['admin'] },
    { label: 'Usuarios', path: '/admin/users', roles: ['admin'] },
    { label: 'Configuración', path: '/admin/settings', roles: ['admin'] }
  ];

useEffect(() => {
  if (keycloak.authenticated && keycloak.tokenParsed) {
    console.log('Token completo:', keycloak.tokenParsed);
    setUserName(keycloak.tokenParsed.name || keycloak.tokenParsed.preferred_username || '');
    
    // Obtener el correo electrónico
    const email = (keycloak.tokenParsed.email || '').toLowerCase();
    console.log('Correo electrónico del usuario:', email);
    
    // Asignar rol basado en el correo electrónico
    let clientRoles: string[] = [];
    
    if (email.includes('admin')) {
      clientRoles = ['admin'];
    } else if (email.includes('doctor') || email.includes('medico') || email.includes('dr.')) {
      clientRoles = ['doctor'];
    } else {
      // Por defecto, asumimos  que es paciente
      clientRoles = ['patient'];
    }
    
    console.log('Roles asignados:', clientRoles);
    setUserRoles(clientRoles as UserRole[]);
  }
}, [keycloak.authenticated, keycloak.tokenParsed]);

  // Filter nav items based on user roles
  const filteredNavItems = navItems.filter(item => 
    !item.roles || item.roles.some(role => userRoles.includes(role))
  );

const getUserType = (): string => {
  // Si no hay roles, retornar 'Usuario'
  if (userRoles.length === 0) {
    return 'Usuario';
  }

  // Mapear roles de Keycloak a roles de la aplicación
  const roleMap: Record<string, string> = {
    'manage-account': 'Paciente',  
    'manage-account-links': 'Paciente',
    'view-profile': 'Paciente',
    'admin': 'Administrador',
    'doctor': 'Médico',
    'patient': 'Paciente'
  };

  // Buscar el primer rol que coincida
  for (const role of userRoles) {
    const normalizedRole = role.toLowerCase();
    if (roleMap[normalizedRole]) {
      return roleMap[normalizedRole];
    }
  }

  // Si no coincide con ningún rol conocido, retornar el primer rol (para depuración)
  return `Usuario (${userRoles[0]})`;
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
              {filteredNavItems.map((item) => (
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
            {userName && (
              <div className="flex flex-col items-end">
                <span className="text-sm font-medium text-blue-900">
                  {userName}
                </span>
                <span className="text-xs text-blue-600">
                  {getUserType()}
                </span>
              </div>
            )}
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