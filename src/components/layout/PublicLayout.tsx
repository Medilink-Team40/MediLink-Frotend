
// 1. Importa Outlet
import { Outlet } from 'react-router-dom';

const PublicLayout = () => {
  return (
    <div className="flex min-h-screen flex-col">
     
      <main className="flex-grow">
      
        <Outlet />
      </main>
      
    </div>
  );
};

export default PublicLayout;