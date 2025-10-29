// src/features/landing/components/Footer.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white pt-8 pb-4 sm:pt-12 sm:pb-6 lg:pt-16 lg:pb-8">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8 lg:mb-12">
          {/* Company Info */}
          <div className="text-center sm:text-left lg:col-span-1">
            <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 lg:mb-4 text-blue-400">
              MediLink
            </h3>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-xs mx-auto sm:mx-0">
              Conectando pacientes con los mejores profesionales de la salud.
            </p>
          </div>
          
          {/* Quick Links */}
          <div className="text-center sm:text-left">
            <h4 className="font-semibold mb-3 md:mb-4 text-white">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/" 
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-sm md:text-base"
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link 
                  to="/features" 
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-sm md:text-base"
                >
                  Características
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-sm md:text-base"
                >
                  Sobre Nosotros
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Legal */}
          <div className="text-center sm:text-left">
            <h4 className="font-semibold mb-3 md:mb-4 text-white">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/terminos" 
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-sm md:text-base"
                >
                  Términos y Condiciones
                </Link>
              </li>
              <li>
                <Link 
                  to="/privacidad" 
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-sm md:text-base"
                >
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link 
                  to="/cookies" 
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-sm md:text-base"
                >
                  Política de Cookies
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div className="text-center sm:text-left">
            <h4 className="font-semibold mb-3 md:mb-4 text-white">Contacto</h4>
            <address className="not-italic text-gray-400 space-y-2 text-sm md:text-base">
              <p className="flex items-center justify-center sm:justify-start">
                <span>contacto@medilink.com</span>
              </p>
              <p className="flex items-center justify-center sm:justify-start">
                <span>+1 234 567 890</span>
              </p>
              <p className="flex items-center justify-center sm:justify-start">
                <span>Av. Principal 123, Ciudad</span>
              </p>
            </address>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="pt-4 sm:pt-6 lg:pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-400 text-xs sm:text-sm lg:text-base">
            &copy; {currentYear} MediLink. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer