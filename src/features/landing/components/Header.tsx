import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-blue-600">MediLink</h1>
          
          {/* Menú para desktop */}
          <nav className="hidden md:block">
            <a href="#features" className="mx-3 text-gray-600 hover:text-blue-600">Características</a>
            <a href="#about" className="mx-3 text-gray-600 hover:text-blue-600">Sobre Nosotros</a>
            <a href="/login" className="ml-3 rounded-full bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
              Iniciar Sesión
            </a>
          </nav>

          {/* Botón de menú móvil */}
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
          <div className="md:hidden">
            <a href="#features" className="block py-2 text-gray-600 hover:text-blue-600">Características</a>
            <a href="#about" className="block py-2 text-gray-600 hover:text-blue-600">Sobre Nosotros</a>
            <a href="/login" className="mt-2 inline-block rounded-full bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
              Iniciar Sesión
            </a>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;