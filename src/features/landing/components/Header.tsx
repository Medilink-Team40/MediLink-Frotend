// src/features/landing/components/Header.tsx
import { Button } from "@/components/ui/button";
import { useAuth } from "@/config/AuthProvider";
import { Link } from "react-router-dom";

const Header = () => {
  const { isAuthenticated, login, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-blue-600">MediLink</Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/features" className="text-gray-600 hover:text-blue-600 transition-colors">
              Características
            </Link>
            <Link to="/about" className="text-gray-600 hover:text-blue-600 transition-colors">
              Sobre Nosotros
            </Link>
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