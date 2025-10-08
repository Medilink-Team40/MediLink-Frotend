// src/features/landing/components/Footer.tsx
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-xl font-bold mb-4">MediLink</h3>
            <p className="text-gray-400">
              Conectando pacientes con los mejores profesionales de la salud.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white">Inicio</Link></li>
              <li><Link to="/especialidades" className="text-gray-400 hover:text-white">Especialidades</Link></li>
              <li><Link to="/sobre-nosotros" className="text-gray-400 hover:text-white">Sobre Nosotros</Link></li>
              <li><Link to="/contacto" className="text-gray-400 hover:text-white">Contacto</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><Link to="/terminos" className="text-gray-400 hover:text-white">Términos y Condiciones</Link></li>
              <li><Link to="/privacidad" className="text-gray-400 hover:text-white">Política de Privacidad</Link></li>
              <li><Link to="/cookies" className="text-gray-400 hover:text-white">Política de Cookies</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contacto</h4>
            <address className="not-italic text-gray-400">
              <p>contacto@medilink.com</p>
              <p>+1 234 567 890</p>
              <p>Av. Principal 123, Ciudad</p>
            </address>
          </div>
        </div>
        <div className="pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; {currentYear} MediLink. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer