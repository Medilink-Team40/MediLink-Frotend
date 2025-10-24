// src/features/landing/components/Header.tsx
import { Button } from "@/components/ui/button";
import { useAuth } from "@/config/AuthProvider";

const Header = () => {
  const { isAuthenticated, login, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-blue-600">MediLink</h1>

          <nav className="hidden md:flex items-center space-x-6">
            <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">
              Características
            </a>
            <a href="#about" className="text-gray-600 hover:text-blue-600 transition-colors">
              Sobre Nosotros
            </a>
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">

                <Button variant="outline" onClick={logout}>
                  Cerrar Sesión
                </Button>
              </div>
            ) : (
              <Button onClick={login}>Iniciar Sesión</Button>
            )}
          </nav>

          {/* Menú móvil... */}
        </div>
      </div>
    </header>
  );
};

export default Header;