import { Outlet } from 'react-router-dom';

const PublicLayout = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <main>
                <Outlet />
            </main>
        </div>
    );
};

export default PublicLayout;