import { NavLink, useLocation } from "react-router-dom";
import { HomeIcon, Calendar1Icon, UserIcon, LogOutIcon, MessageCircle, VideoIcon,  Dock, BriefcaseMedicalIcon } from "lucide-react";
import { useAuth } from "@/config/AuthProvider";
import { ROLES } from "@/routes/roles";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


const SidebarApp = () => {
    const { user, logout } = useAuth();
    const location = useLocation();
    const isPatient = user?.roles?.includes(ROLES.PACIENTE);
    const isDoctor = user?.roles?.includes(ROLES.DOCTOR);
    const isAdmin = user?.roles?.includes(ROLES.ADMIN)

    // Get user initials for avatar fallback
    const getUserInitials = (name: string) => {
        return name
            .split(' ')
            .map(part => part[0])
            .join('')
            .toUpperCase()
            .substring(0, 2);
    };

    const patientItems = [
        { path: '/dashboard', label: 'Inicio', icon: <HomeIcon size={20} /> },
        { path: '/citas', label: 'Mis Citas', icon: <Calendar1Icon size={20} /> },
        {path: '/agendar-cita', label: 'Agendar Cita', icon: <Calendar1Icon size={20} /> },
       {path: '/historial-clinico', label: 'Historial Clinico', icon: <Dock size={20}/>},
        { path: '/perfil', label: 'Perfil', icon: <UserIcon size={20} /> }

    ];

    const doctorItems = [
        { path: '/doctor', label: 'Inicio', icon: <HomeIcon size={20} /> },
        { path: '/doctor/citas', label: 'Mi Agenda', icon: <Calendar1Icon size={20} /> },
        { path: '/doctor/paciente', label: 'Pacientes', icon: <UserIcon size={20} /> },
        { path: '/doctor/teleconsultas', label: 'Teleconsultas', icon: <VideoIcon size={20} /> },
        { path: '/doctor/mensaje', label: 'Mensajes', icon: <MessageCircle size={20} /> },
        { path: '/doctor/perfil', label: 'Perfil', icon: <UserIcon size={20} /> }
    ];

    const adminItems= [
        { path: '/admin', label: 'Panel', icon: <HomeIcon size={20} /> },
        { path: '/doctor/register', label: 'Registrar Doctor', icon: <BriefcaseMedicalIcon size={20} /> },
        { path: '/admin/roles', label: 'Roles', icon: <UserIcon size={20} /> },
        { path: '/admin/permisos', label: 'Permisos', icon: <UserIcon size={20} /> },
    ]

    const items = isPatient ? patientItems : isDoctor ? doctorItems : isAdmin ? adminItems : [];
    const userRole = isPatient ? 'Paciente' : isDoctor ? 'Doctor' : 'Usuario';

    const handleLogout = async (e: React.MouseEvent) => {
        e.preventDefault();
        try {
            await logout();
        } catch (error) {
            console.error('[ERROR] Error al cerrar sesión:', error);
        }
    };

    return (
        <div className="flex flex-col h-full bg-white shadow-md">
            {/* User Profile Section */}
            <div className="p-4 border-b">
                <div className="flex items-center space-x-3">
                    <Avatar>
                        <AvatarImage src={user?.picture} alt={user?.name} />
                        <AvatarFallback className="bg-blue-100 text-blue-600">
                            {user?.name ? getUserInitials(user.name) : 'US'}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                            {user?.name || 'Usuario'}
                        </p>
                        <p className="text-xs text-gray-500 capitalize">
                            {userRole}
                        </p>
                    </div>
                </div>
            </div>

            {/* Navigation Items */}
            <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
                {items.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex items-center px-4 py-2.5 rounded-md transition-colors ${
                                isActive
                                    ? 'bg-blue-50 text-blue-700 font-medium'
                                    : 'text-gray-700 hover:bg-gray-50'
                            }`
                        }
                    >
                        <span className="mr-3 text-gray-500">{item.icon}</span>
                        <span>{item.label}</span>
                    </NavLink>
                ))}
            </nav>

            {/* Logout Button */}
            <div className="p-4 border-t">
                <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-gray-700 rounded-md hover:bg-gray-50 group"
                >
                    <LogOutIcon
                        size={20}
                        className="mr-3 text-gray-500 group-hover:text-gray-700"
                    />
                    <span className="font-medium">Cerrar Sesión</span>
                </button>
            </div>
        </div>
    );
};

export default SidebarApp;