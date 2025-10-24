import { Outlet } from 'react-router-dom';
import SidebarApp from '@/components/common/SidebarApp';

const AppLayout = () => {
    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <div className="hidden md:flex ">
                <div className="w-64">
                    <SidebarApp />
                </div>
            </div>

            {/* Main Content */}
            <div className="flex flex-col flex-1 overflow-hidden">
                {/* Mobile header */}
                <div className="md:hidden bg-white shadow-sm">
                    <div className="flex items-center justify-between p-4">
                        <h1 className="text-xl font-bold">MediLink</h1>
                        <button className="p-2 rounded-md text-gray-500 hover:bg-gray-100">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Page Content */}
                <main className="flex-1 overflow-auto p-4 md:p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AppLayout;