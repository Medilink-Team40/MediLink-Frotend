// En AppLayout.tsx
import { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import SidebarApp from '../common/SidebarApp';

interface AppLayoutProps {
    children?: ReactNode;
    showSidebar?: boolean;
}

const AppLayout = ({ showSidebar = true, children }: AppLayoutProps) => {
    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            {showSidebar && (
                <div className="w-64">
                    <SidebarApp />
                </div>
            )}
            
            {/* Contenido principal */}
            <div className="flex-1 overflow-auto">
                {children || <Outlet />}
            </div>
        </div>
    );
};

export default AppLayout;