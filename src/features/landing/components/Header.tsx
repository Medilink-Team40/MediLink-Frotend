import { useState } from "react";
import { getKeycloakInstance } from "@/auth/keycloak";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const keycloak = getKeycloakInstance();
      await keycloak.login({
        redirectUri: window.location.origin + '/dashboard'
      });
    } catch (err) {
      console.error("Error al iniciar sesión:", err);
      setIsLoading(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <h1 className="text-2xl font-bold text-blue-600">MediLink</h1>

          {/* Menú de navegación para desktop */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">
              Características
            </a>
            <a href="#about" className="text-gray-600 hover:text-blue-600 transition-colors">
              Sobre Nosotros
            </a>
            <Button
              onClick={handleLogin}
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 cursor-pointer"
            >
              {isLoading ? 'Cargando...' : 'Iniciar Sesión'}
            </Button>
          </nav>

          {/* Botón de menú móvil */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menú de navegación"
          >
            <svg className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              )}
            </svg>
          </button>
        </div>

        {/* Menú móvil desplegable */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-3 pb-4">
            <a 
              href="#features" 
              className="block py-2 text-gray-600 hover:text-blue-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Características
            </a>
            <a 
              href="#about" 
              className="block py-2 text-gray-600 hover:text-blue-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Sobre Nosotros
            </a>
            <Button
              onClick={() => {
                handleLogin();
                setIsMenuOpen(false);
              }}
              disabled={isLoading}
              className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
            >
              {isLoading ? 'Cargando...' : 'Iniciar Sesión'}
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;