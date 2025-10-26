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
    Stethoscope
} from "lucide-react";
import { useAuth } from "@/config/AuthProvider";
import { useSidebar } from "@/contexts/SidebarContext";
import { ROLES } from "@/routes/roles";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
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
            path: '/dashboard',
            label: 'Inicio',
            icon: <HomeIcon size={20} />,
            category: 'Principal'
        },
        {
            path: '/citas',
            label: 'Mis Citas',
            icon: <Calendar1Icon size={20} />,
            badge: 2,
            category: 'Citas'
        },
        {
            path: 'Chat',
            label: 'Mensajes',
            icon: <MessageCircle size={20} />,
            badge: 4,
            category: 'Comunicación'

        },
        {
            path: 'zoom',
            label: 'Teleconsultas',
            icon: <VideoIcon size={20} />,
            
        },
        {
            path: '/agendar-cita',
            label: 'Agendar Cita',
            icon: <Calendar1Icon size={20} />,
            category: 'Citas'
        },
        {
            path: '/historial-clinico',
            label: 'Historial Clínico',
            icon: <Dock size={20} />,
            category: 'Médico'
        },
        {
            path: '/perfil',
            label: 'Mi Perfil',
            icon: <UserIcon size={20} />,
            category: 'Cuenta'
        }
    ];

    const doctorItems: SidebarItem[] = [
        {
            path: '/doctor',
            label: 'Dashboard',
            icon: <HomeIcon size={20} />,
            category: 'Principal'
        },
        {
            path: '/doctor/citas',
            label: 'Mi Agenda',
            icon: <Calendar1Icon size={20} />,
            badge: 5,
            category: 'Consultas'
        },
        {
            path: '/doctor/paciente',
            label: 'Pacientes',
            icon: <UserIcon size={20} />,
            category: 'Consultas'
        },
        {
            path: '/doctor/teleconsultas',
            label: 'Teleconsultas',
            icon: <VideoIcon size={20} />,
            badge: 1,
            category: 'Consultas'
        },
        {
            path: '/doctor/mensaje',
            label: 'Mensajes',
            icon: <MessageCircle size={20} />,
            category: 'Comunicación'
        },
        {
            path: '/doctor/perfil',
            label: 'Mi Perfil',
            icon: <UserIcon size={20} />,
            category: 'Cuenta'
        }
    ];

    const adminItems: SidebarItem[] = [
        {
            path: '/admin',
            label: 'Panel Admin',
            icon: <HomeIcon size={20} />,
            category: 'Principal'
        },
        {
            path: 'admin/doctor-register',
            label: 'Registrar Doctor',
            icon: <BriefcaseMedicalIcon size={20} />,
            category: 'Gestión'
        },
        {
            path: '/admin/manage-patients',
            label: 'Gestión de Pacientes',
            icon: <UserIcon size={20} />,
            category: 'Gestión'
        },
        {
            path: '/admin/roles',
            label: 'Gestión de Roles',
            icon: <ShieldCheckIcon size={20} />,
            category: 'Seguridad'
        },
        {
            path: 'admin/manage-doctors',
            label: 'Gestionar Doctores',
            icon: <Stethoscope size={20} />,
            category: 'Gestión'
        },
        {
            path: '/admin/permisos',
            label: 'Permisos',
            icon: <SettingsIcon size={20} />,
            category: 'Seguridad'
        }
    ];

    const items = isPatient ? patientItems : isDoctor ? doctorItems : isAdmin ? adminItems : [];
    const userRole = isPatient ? 'Paciente' : isDoctor ? 'Doctor' : isAdmin ? 'Administrador' : 'Usuario';
    const roleColor = isPatient ? 'bg-green-100 text-green-800' :
                     isDoctor ? 'bg-blue-100 text-blue-800' :
                     isAdmin ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800';

    // Group items by category
    const groupedItems = items.reduce((groups, item) => {
        const category = item.category || 'General';
        if (!groups[category]) {
            groups[category] = [];
        }
        groups[category].push(item);
        return groups;
    }, {} as Record<string, SidebarItem[]>);

    const handleLogout = async (e: React.MouseEvent) => {
        e.preventDefault();
        try {
            await logout();
        } catch (error) {
            console.error('[ERROR] Error al cerrar sesión:', error);
        }
    };

    const SidebarButton = ({ item }: { item: SidebarItem }) => {
        const content = (
            <NavLink
                to={item.path}
                className={({ isActive }) =>
                    cn(
                        "flex items-center w-full px-3 py-2.5 rounded-lg transition-all duration-200 group relative",
                        isActive
                            ? 'bg-blue-50 text-blue-700 border border-blue-200 shadow-sm'
                            : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900',
                        isCollapsed ? 'justify-center' : 'justify-start'
                    )
                }
            >
                <span className={cn(
                    "shrink-0 transition-colors",
                    location.pathname === item.path ? 'text-blue-600' : 'text-gray-500 group-hover:text-gray-700'
                )}>
                    {item.icon}
                </span>

                {!isCollapsed && (
                    <>
                        <span className="ml-3 font-medium text-sm">{item.label}</span>
                        {item.badge && (
                            <Badge
                                variant="secondary"
                                className="ml-auto bg-blue-100 text-blue-700 text-xs px-2 py-0.5"
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
        <div className="flex flex-col h-full bg-white shadow-lg border-r border-gray-200">
            {/* Header with toggle */}
            <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                    {!isCollapsed && (
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-sm">M</span>
                            </div>
                            <span className="text-lg font-bold text-gray-900">MediLink</span>
                        </div>
                    )}

                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={toggleSidebar}
                                    className="p-1.5 hover:bg-gray-100"
                                >
                                    {isCollapsed ? (
                                        <ChevronRightIcon size={16} />
                                    ) : (
                                        <ChevronLeftIcon size={16} />
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
            <div className="p-4 border-b border-gray-100">
                <div className={cn(
                    "flex items-center",
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
                            <Badge className={cn("text-xs mt-1", roleColor)}>
                                {userRole}
                            </Badge>
                        </div>
                    )}
                </div>
            </div>

            {/* Navigation Items */}
            <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                {Object.entries(groupedItems).map(([category, categoryItems]) => (
                    <div key={category}>
                        {!isCollapsed && (
                            <h3 className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                {category}
                            </h3>
                        )}
                        <div className="space-y-1">
                            {categoryItems.map((item) => (
                                <SidebarButton key={item.path} item={item} />
                            ))}
                        </div>
                        {!isCollapsed && <Separator className="my-3" />}
                    </div>
                ))}
            </nav>

            {/* Quick Actions */}
            {!isCollapsed && (
                <div className="px-3 py-2 border-t border-gray-100">
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                        <span>Acciones rápidas</span>
                    </div>
                    <div className="flex space-x-2">
                        <Button variant="ghost" size="sm" className="flex-1 text-xs">
                            <BellIcon size={14} className="mr-1" />
                            Notificaciones
                        </Button>
                        <Button variant="ghost" size="sm" className="flex-1 text-xs">
                            <HelpCircleIcon size={14} className="mr-1" />
                            Ayuda
                        </Button>
                    </div>
                </div>
            )}

            {/* Logout Button */}
            <div className="p-3 border-t border-gray-200">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                onClick={handleLogout}
                                className={cn(
                                    "w-full text-gray-700 hover:bg-red-50 hover:text-red-700 transition-colors",
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