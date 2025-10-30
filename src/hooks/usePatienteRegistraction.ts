import { useState, useCallback } from 'react';
import { PatientService } from '@/service/PatientService';
import { PatientFormData } from '@/types/patient.types';
import { toast } from 'sonner';

interface UsePatientRegistrationReturn {
  loading: boolean;
  error: string | null;
  success: boolean;
  registerPatient: (formData: PatientFormData) => Promise<boolean>;
  resetState: () => void;
}

interface HumanName {
  use: 'official' | 'usual' | 'nickname' | 'anonymous' | 'old' | 'maiden';
  text: string;
  family: string;
  given: string[];
  prefix?: string[];
  suffix?: string[];
}

interface ContactPoint {
  system: 'phone' | 'fax' | 'email' | 'pager' | 'url' | 'sms' | 'other';
  value: string;
  use: 'home' | 'work' | 'temp' | 'old' | 'mobile';
  rank: number;
}

interface PatientRegisterPayload {
  email: string;
  password: string;
  repeatpassword: string; // El backend lo requiere
  birthDate: string;
  gender: string;
  name: HumanName[];
  telecom: ContactPoint[];
}

export const usePatientRegistration = (): UsePatientRegistrationReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const transformFormDataToFHIR = useCallback((formData: PatientFormData): PatientRegisterPayload => {
    const payload: PatientRegisterPayload = {
      email: formData.email,
      password: formData.password || '',
      repeatpassword: formData.password || '',
      birthDate: formData.birthDate,
      gender: formData.gender,
      name: [
        {
          use: 'official',
          text: `${formData.firstName} ${formData.lastName}`,
          family: formData.lastName,
          given: [formData.firstName]
        }
      ],
      telecom: [
        {
          system: 'phone',
          value: formData.phone,
          use: 'work',
          rank: 1
        }

      ]
    };

    // Si hay DNI, agregarlo como suffix
    if (formData.dni) {
      payload.name[0].suffix = [formData.dni];
    }

    return payload;
  }, []);

  const registerPatient = useCallback(async (formData: PatientFormData): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      console.log('Iniciando registro de paciente:', formData);

      // Validar que las contrasenas coincidan
      if (formData.password !== formData.repeatpassword) {
        setError('Las contrasenas no coinciden');
        toast.error('Error de validacion', {
          description: 'Las contrasenas no coinciden'
        });
        return false;
      }

      // Crear el payload FHIR (sin repeatpassword)
      const payload = transformFormDataToFHIR(formData);

      console.log('Payload FHIR creado:', payload);

      // Registrar paciente
      const response = await PatientService.register(payload);

      if (response.error) {
        console.error('Error en el registro:', response.error);
        const errorMsg = response.error.details?.message || response.error.message || 'Error al registrar paciente';
        setError(errorMsg);
        toast.error('Error en el registro', {
          description: errorMsg
        });
        return false;
      }

      console.log('Paciente registrado exitosamente:', response.data);
      setSuccess(true);
      toast.success('Registro exitoso', {
        description: 'El paciente ha sido registrado correctamente'
      });

      return true;
    } catch (error: any) {
      console.error('Error inesperado en el registro:', error);
      const errorMessage = error.message || 'Error inesperado al registrar paciente';
      setError(errorMessage);
      toast.error('Error inesperado', {
        description: errorMessage
      });
      return false;
    } finally {
      setLoading(false);
    }
  }, [transformFormDataToFHIR]);

  const resetState = useCallback(() => {
    setLoading(false);
    setError(null);
    setSuccess(false);
  }, []);

  return {
    loading,
    error,
    success,
    registerPatient,
    resetState
  };
};

export default usePatientRegistration;