import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PacienteRegisterForm } from "../components/PacienteRegisterForm";

 const RegisterPage = () => {
  const isDevelopment = import.meta.env.DEV;


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-2xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Solicitud de Alta de Paciente
          </CardTitle>
          <p className="text-sm text-muted-foreground text-center">
            Complete el formulario para solicitar su registro
          </p>
        </CardHeader>

        <CardContent>
          <PacienteRegisterForm />
        </CardContent>
        <CardHeader className="space-y-1">
        <CardTitle className="text-lg font-bold text-center">
          Ya tiene una cuenta? Inicie sesión{''}
          <button

            className="underline  text-blue-600 hover:text-blue-800"
          >aquí
          </button>.
        </CardTitle>
      </CardHeader>
      </Card>



    </div>
  );
};

export default RegisterPage;