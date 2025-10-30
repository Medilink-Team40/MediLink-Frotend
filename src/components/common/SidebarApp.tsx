import { NavLink, useLocation } from "react-router-dom";
import {
    HomeIcon,
    Calendar1Icon,
    UserIcon,
    LogOutIcon,
    MessageCircle,
    VideoIcon,
    Dock,
    BriefcaseMedicalIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    SettingsIcon,
    BellIcon,
    HelpCircleIcon,
    ShieldCheckIcon,
    Stethoscope,
    Clock
} from "lucide-react";
import { useAuth } from "@/config/AuthProvider";
import { useSidebar } from "@/contexts/SidebarContext";
import { ROLES } from "@/routes/roles";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface SidebarItem {
    path: string;
    label: string;
    icon: React.ReactNode;
    badge?: number;
    category?: string;
}

const SidebarApp = () => {
    const { user, logout } = useAuth();
    const { isCollapsed, toggleSidebar } = useSidebar();
    const location = useLocation();
    const [notifications, setNotifications] = useState(3);
    console.log('Usuario completo:', user);
    console.log('Picture URL:', user?.picture);

    const isPatient = user?.roles?.includes(ROLES.PACIENTE);
    const isDoctor = user?.roles?.includes(ROLES.DOCTOR);
    const isAdmin = user?.roles?.includes(ROLES.ADMIN);

    // Get user initials for avatar fallback
    const getUserInitials = (name: string) => {
        return name
            .split(' ')
            .map(part => part[0])
            .join('')
            .toUpperCase()
            .substring(0, 2);
    };

    const patientItems: SidebarItem[] = [
        {
            path: '/patient/dashboard',
            label: 'Inicio',
            icon: <HomeIcon size={20} />,
            category: 'principal'
        },
        {
            path: '/citas',
            label: 'Mis Citas',
            icon: <Calendar1Icon size={20} />,
            badge: 2,
            category: 'citas'
        },
        {
            path: '/agendar-cita',
            label: 'Agendar Cita',
            icon: <Calendar1Icon size={20} />,
            category: 'citas'
        },
        {
            path: 'Chat',
            label: 'Mensajes',
            icon: <MessageCircle size={20} />,
            badge: 4,
            category: 'comunicacion'
        },
        {
            path: 'zoom',
            label: 'Teleconsultas',
            icon: <VideoIcon size={20} />,
            category: 'comunicacion'
        },
        {
            path: '/historial-clinico',
            label: 'Historial Clínico',
            icon: <Dock size={20} />,
            category: 'medico'
        },
        {
            path: '/perfil',
            label: 'Mi Perfil',
            icon: <UserIcon size={20} />,
            category: 'cuenta'
        }
    ];

    const doctorItems: SidebarItem[] = [
        {
            path: '/doctor/dashboard',
            label: 'Dashboard',
            icon: <HomeIcon size={20} />,
            category: 'principal'
        },
        {
            path: '/doctor/citas',
            label: 'Mi Agenda',
            icon: <Calendar1Icon size={20} />,
            badge: 5,
            category: 'consultas'
        },
        {
            path: '/doctor/paciente',
            label: 'Pacientes',
            icon: <UserIcon size={20} />,
            category: 'consultas'
        },
        {
           path: '/doctor/administrar-horarios',
           label: 'Administrar Horarios',
           icon: <Clock size={20} />,
           category: 'consultas'
        },
        {
            path: '/doctor/teleconsultas',
            label: 'Teleconsultas',
            icon: <VideoIcon size={20} />,
            badge: 1,
            category: 'consultas'
        },
        {
            path: '/doctor/mensaje',
            label: 'Mensajes',
            icon: <MessageCircle size={20} />,
            category: 'comunicacion'
        },
        {
            path: '/doctor/perfil',
            label: 'Mi Perfil',
            icon: <UserIcon size={20} />,
            category: 'cuenta'
        }
    ];

    const adminItems: SidebarItem[] = [
        {
            path: '/admin/dashboard',
            label: 'Panel Admin',
            icon: <HomeIcon size={20} />,
            category: 'principal'
        },
        {
            path: 'admin/doctor-register',
            label: 'Registrar Doctor',
            icon: <BriefcaseMedicalIcon size={20} />,
            category: 'gestion'
        },
        {
            path: '/admin/manage-patients',
            label: 'Gestión de Pacientes',
            icon: <UserIcon size={20} />,
            category: 'gestion'
        },
        {
            path: 'admin/manage-doctors',
            label: 'Gestionar Doctores',
            icon: <Stethoscope size={20} />,
            category: 'gestion'
        },
        {
            path: '/admin/roles',
            label: 'Gestión de Roles',
            icon: <ShieldCheckIcon size={20} />,
            category: 'seguridad'
        },
        {
            path: '/admin/permisos',
            label: 'Permisos',
            icon: <SettingsIcon size={20} />,
            category: 'seguridad'
        }
    ];

    const items = isPatient ? patientItems : isDoctor ? doctorItems : isAdmin ? adminItems : [];
    const userRole = isPatient ? 'Paciente' : isDoctor ? 'Doctor' : isAdmin ? 'Administrador' : 'Usuario';
    const roleColor = isPatient ? 'bg-green-50 text-green-700 border-green-200' :
                     isDoctor ? 'bg-blue-50 text-blue-700 border-blue-200' :
                     isAdmin ? 'bg-purple-50 text-purple-700 border-purple-200' : 'bg-gray-50 text-gray-700 border-gray-200';

    const handleLogout = async (e: React.MouseEvent) => {
        e.preventDefault();
        try {
            await logout();
        } catch (error) {
            console.error('[ERROR] Error al cerrar sesión:', error);
        }
    };

    const SidebarButton = ({ item }: { item: SidebarItem }) => {
        const isActive = location.pathname === item.path;

        const content = (
            <NavLink
                to={item.path}
                className={cn(
                    "flex items-center w-full px-3 py-2.5 rounded-xl transition-all duration-200 group relative mb-1",
                    isActive
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                    isCollapsed ? 'justify-center' : 'justify-start'
                )}
            >
                <span className={cn(
                    "shrink-0 transition-all duration-200",
                    isActive ? 'text-white' : 'text-gray-500 group-hover:text-gray-700'
                )}>
                    {item.icon}
                </span>

                {!isCollapsed && (
                    <>
                        <span className="ml-3 font-medium text-sm">{item.label}</span>
                        {item.badge && (
                            <Badge
                                variant="secondary"
                                className={cn(
                                    "ml-auto text-xs px-2 py-0.5",
                                    isActive
                                        ? 'bg-white/20 text-white border-white/30'
                                        : 'bg-blue-100 text-blue-700'
                                )}
                            >
                                {item.badge}
                            </Badge>
                        )}
                    </>
                )}

                {isCollapsed && item.badge && (
                    <div className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {item.badge}
                    </div>
                )}
            </NavLink>
        );

        if (isCollapsed) {
            return (
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            {content}
                        </TooltipTrigger>
                        <TooltipContent side="right" className="font-medium">
                            {item.label}
                            {item.badge && (
                                <Badge variant="secondary" className="ml-2">
                                    {item.badge}
                                </Badge>
                            )}
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            );
        }

        return content;
    };

    return (
        <div className="flex flex-col h-full bg-white shadow-xl border-r border-gray-100">
            {/* Header with toggle */}
            <div className="p-4">
                <div className="flex items-center justify-between">
                    {!isCollapsed && (
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
                                <span className="text-white font-bold text-lg">M</span>
                            </div>
                            <div>
                                <span className="text-xl font-bold text-gray-900">MediLink</span>
                                <p className="text-xs text-gray-500">Sistema Médico</p>
                            </div>
                        </div>
                    )}

                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={toggleSidebar}
                                    className="p-2 hover:bg-gray-100 rounded-lg"
                                >
                                    {isCollapsed ? (
                                        <ChevronRightIcon size={18} />
                                    ) : (
                                        <ChevronLeftIcon size={18} />
                                    )}
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent side={isCollapsed ? "right" : "bottom"}>
                                {isCollapsed ? "Expandir sidebar" : "Contraer sidebar"}
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </div>

            {/* User Profile Section */}
            <div className="px-4 pb-4">
                <div className={cn(
                    "flex items-center p-3 rounded-xl border transition-all duration-200",
                    roleColor,
                    isCollapsed ? "justify-center" : "space-x-3"
                )}>
                    <div className="relative">
                        <Avatar className={cn(isCollapsed ? "h-8 w-8" : "h-10 w-10")}>
                            <AvatarImage src={user?.picture} alt={user?.name} />
                            <AvatarFallback className="bg-blue-100 text-blue-600 font-semibold">
                                {user?.name ? getUserInitials(user.name) : 'US'}
                            </AvatarFallback>
                        </Avatar>
                        {notifications > 0 && (
                            <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                                {notifications}
                            </div>
                        )}
                    </div>

                    {!isCollapsed && (
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-900 truncate">
                                {user?.name || 'Usuario'}
                            </p>
                            <p className="text-xs text-gray-600 mt-0.5">
                                {userRole}
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Navigation Items - SIN separadores ni categorías */}
            <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
                {items.map((item) => (
                    <SidebarButton key={item.path} item={item} />
                ))}
            </nav>

            {/* Quick Actions - Solo cuando NO está colapsado */}
            {!isCollapsed && (
                <div className="px-4 py-3">
                    <div className="grid grid-cols-2 gap-2">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-10 text-xs bg-gray-50 hover:bg-gray-100 rounded-lg"
                                    >
                                        <BellIcon size={16} className="mr-1" />
                                        Alertas
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    Ver notificaciones
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>

                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-10 text-xs bg-gray-50 hover:bg-gray-100 rounded-lg"
                                    >
                                        <HelpCircleIcon size={16} className="mr-1" />
                                        Ayuda
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    Centro de ayuda
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                </div>
            )}

            {/* Logout Button */}
            <div className="p-4">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                onClick={handleLogout}
                                className={cn(
                                    "w-full text-gray-700 hover:bg-red-50 hover:text-red-700 transition-all duration-200 rounded-xl h-11",
                                    isCollapsed ? "justify-center px-2" : "justify-start"
                                )}
                            >
                                <LogOutIcon size={20} className={cn(isCollapsed ? "" : "mr-3")} />
                                {!isCollapsed && <span className="font-medium">Cerrar Sesión</span>}
                            </Button>
                        </TooltipTrigger>
                        {isCollapsed && (
                            <TooltipContent side="right">
                                Cerrar Sesión
                            </TooltipContent>
                        )}
                    </Tooltip>
                </TooltipProvider>
            </div>
        </div>
    );
};

export default SidebarApp;