import backgroundImage from '@/assets/833.jpg'
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const isDevelopment = import.meta.env.DEV;
  const handleLoginRedirect = () => {
    if (isDevelopment) {
    const keycloakUrl = import.meta.env.VITE_KEYCLOAK_URL;
    const realm = import.meta.env.VITE_KEYCLOAK_REALM || 'medilink';
    const clientId = import.meta.env.VITE_KEYCLOAK_CLIENT_ID || 'medilink-frontend';
    const redirectUri = encodeURIComponent(window.location.origin + '/dev-login');

    window.location.href = `${keycloakUrl}realms/${realm}/protocol/openid-connect/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=openid`;
  }
  }

  return (
    <section className="relative bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block">Tu salud,</span>
                <span className="block text-blue-600">nuestra prioridad</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Conectamos pacientes con profesionales de la salud de manera segura y eficiente.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <Link to="/register">
                    <Button
                      size="lg"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
                    >
                      Solicitud de Alta
                    </Button>
                  </Link>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">

                    <Button
                    onClick={handleLoginRedirect}
                      variant="outline"
                      size="lg"
                      className="w-full flex items-center justify-center px-8 py-3 border border-gray-300 text-base font-medium rounded-md text-blue-700 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
                    >
                      Iniciar Sesión
                    </Button>

                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <img
          className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
          src={backgroundImage}
          alt="Médico sonriente con estetoscopio"
        />
      </div>
    </section>
  );
};

export default HeroSection;