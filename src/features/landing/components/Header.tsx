// src/features/landing/components/Header.tsx
import { Button } from "@/components/ui/button";
import { useAuth } from "@/config/AuthProvider";
import { Link } from "react-router-dom";
import MobileMenu from '@/components/ui/MobileMenu';
import HamburgerButton from '@/components/ui/HamburgerButton';
import { useMobileMenu } from '@/hooks/useMobileMenu';

const Header = () => {
  const { isAuthenticated, login, logout } = useAuth();
  const { isOpen, toggleMenu, closeMenu } = useMobileMenu();

  return (
    <>
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold text-blue-600">MediLink</Link>

            {/* Desktop Navigation */}
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
                <div className="flex items-center space-x-2">
                  <Button variant="outline" asChild>
                    <Link to="/login">Iniciar Sesión</Link>
                  </Button>
                  <Button asChild>
                    <Link to="/register">Registrarse</Link>
                  </Button>
                </div>
              )}
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <HamburgerButton
                isOpen={isOpen}
                onClick={toggleMenu}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isOpen}
        onClose={closeMenu}
        isAuthenticated={isAuthenticated}
        onLogin={login}
        onLogout={logout}
      />
    </>
  );
};

export default Header;