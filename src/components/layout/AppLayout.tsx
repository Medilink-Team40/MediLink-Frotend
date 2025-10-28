import { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import SidebarApp from '../common/SidebarApp';
import { useSidebar } from '@/contexts/SidebarContext';
import { cn } from '@/lib/utils';

interface AppLayoutProps {
    children?: ReactNode;
    showSidebar?: boolean;
}

const AppLayout = ({ showSidebar = true, children }: AppLayoutProps) => {
    const { isCollapsed } = useSidebar();

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            {showSidebar && (
                <div className={cn(
                    "shrink-0 transition-all duration-300 ease-in-out",
                    isCollapsed ? "w-16" : "w-64"
                )}>
                    <SidebarApp />
                </div>
            )}

            {/* Contenido principal */}
            <div className={cn(
                "flex-1 overflow-auto transition-all duration-300 ease-in-out",
                showSidebar ? (isCollapsed ? "ml-0" : "ml-0") : "ml-0"
            )}>
                <div className="h-full">
                    {children || <Outlet />}
                </div>
            </div>
        </div>
    );
};

export default AppLayout;