// src/features/landing/components/Footer.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6 md:pt-16 md:pb-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-8 md:mb-12">
          {/* Company Info */}
          <div className="text-center sm:text-left">
            <h3 className="text-xl font-bold mb-3 md:mb-4">MediLink</h3>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed">
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
                  to="/especialidades" 
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-sm md:text-base"
                >
                  Especialidades
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
              <li>
                <Link 
                  to="/contacto" 
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-sm md:text-base"
                >
                  Contacto
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
        <div className="pt-6 md:pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-400 text-sm md:text-base">
            &copy; {currentYear} MediLink. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer