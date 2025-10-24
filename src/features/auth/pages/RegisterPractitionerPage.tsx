// src/features/auth/pages/RegisterPractitionerPage.tsx
import { PractitionerRegisterForm } from '@/features/auth/components/PractitionerRegisterForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { keycloak } from '@/config/keycloak';
import React from 'react';
import { ToggleGroup } from '@/components/ui/toggle-group';
import { PacienteRegisterForm } from '@/features/auth/components/PacienteRegisterForm';



const RegisterPractitionerPage = () => {
  const [userType, setUserType] = React.useState("practitioner")

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-6">
          <div className="space-y-2 text-center">
            <CardTitle className="text-2xl font-bold text-gray-900">
              Crear cuenta
            </CardTitle>
            <CardDescription className="text-gray-600">
              Completa el formulario para crear una cuenta
            </CardDescription>
          </div>

          <div className="space-y-2">
            <ToggleGroup
              value={userType}
              onValueChange={setUserType}
              options={[
                { value: 'patient', label: 'Paciente' },
                { value: 'practitioner', label: 'Profesional de la salud' },
              ]}
              className="w-full"
            />
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {userType === "practitioner" ? (
            <PractitionerRegisterForm />
          ) : (
            <PacienteRegisterForm />
          )}

          <div className="pt-4 text-center text-sm border-t border-gray-100">
            ¿Ya tienes una cuenta?{' '}
            <Link
              to="#"
              onClick={(e) => {
                e.preventDefault();
                keycloak.login();
              }}
              className="text-blue-600 hover:underline font-medium"
            >
              Inicia sesión
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default RegisterPractitionerPage