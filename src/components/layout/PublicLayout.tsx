import Header from '@/features/landing/components/Header';
// 1. Importa Outlet
import { Outlet } from 'react-router-dom';

const PublicLayout = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow">
        {/* 2. Usa <Outlet /> en lugar de {children} */}
        <Outlet />
      </main>
      {/* Puedes añadir tu <Footer /> aquí si quieres que aparezca en todas las páginas públicas */}
    </div>
  );
};

export default PublicLayout;