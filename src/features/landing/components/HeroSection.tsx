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
    <section className="relative bg-gradient-to-br from-gray-50 to-white overflow-hidden min-h-[600px] sm:min-h-[700px] lg:min-h-[800px]">
      <div className="max-w-7xl mx-auto relative">
        <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-32">
            <div className="text-center lg:text-left max-w-2xl">
              <h1 className="hero-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black">
                <span className="block text-gray-700 mb-1 sm:mb-2">Tu salud,</span>
                <span className="block text-blue-600">nuestra prioridad</span>
              </h1>
              <p className="mt-6 text-base sm:text-lg lg:text-xl text-gray-500 leading-relaxed max-w-lg lg:max-w-xl">
                Conectamos pacientes con profesionales de la salud de manera segura y eficiente.
              </p>
              <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-4 sm:gap-6 sm:justify-center lg:justify-start">
                <Link to="/register" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto px-8 py-4 sm:px-10 sm:py-5 text-lg sm:text-xl font-semibold bg-blue-600 hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl rounded-xl border-0"
                  >
                    Solicitud de Alta
                  </Button>
                </Link>
                <Button
                  onClick={handleLoginRedirect}
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto px-8 py-4 sm:px-10 sm:py-5 text-lg sm:text-xl font-semibold border-2 border-gray-300 text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 rounded-xl"
                >
                  Iniciar Sesión
                </Button>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <img
          className="h-80 w-full object-cover object-center sm:h-96 md:h-[500px] lg:w-full lg:h-full"
          src={backgroundImage}
          alt="Médico sonriente con estetoscopio"
          loading="eager"
        />
      </div>
    </section>
  );
};

export default HeroSection;