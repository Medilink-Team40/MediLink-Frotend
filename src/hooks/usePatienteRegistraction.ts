// src/hooks/usePatientRegistration.ts
import { useState, useCallback } from 'react';
import { PatientService } from '@/service/PatientService';
import { PatientFormData, PatientRegisterData, HumanName, ContactPoint } from '@/types/patient.types';
import { toast } from 'sonner';

// 1. Tipos de retorno del hook
interface UsePatientRegistrationReturn {
  loading: boolean;
  error: string | null;
  success: boolean;
  registerPatient: (formData: PatientFormData) => Promise<boolean>;
  resetState: () => void;
}

// 2. Extensión del payload de registro para incluir telecom, ajustado de PatientRegisterData
// Nota: La interfaz PatientRegisterData de patient.types.ts YA incluye los campos necesarios,
// por lo que no es necesario crear PatientRegisterPayload. Usamos PatientRegisterData directamente.

export const usePatientRegistration = (): UsePatientRegistrationReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // MENTOR TIP: Usa PatientRegisterData como tipo de retorno para asegurar la consistencia.
  const transformFormDataToFHIR = useCallback((formData: PatientFormData): PatientRegisterData => {

    // 1. Crear el objeto base del nombre de forma inmutable
    const baseName: HumanName = {
      use: 'official',
      text: `${formData.firstName} ${formData.lastName}`,
      family: formData.lastName,
      given: [formData.firstName]
      // No incluimos 'suffix' aquí, lo añadiremos condicionalmente después
    };

    // 2. Agregar DNI como suffix si existe
    if (formData.dni) {
      baseName.suffix = [formData.dni];
    }

    // 3. Crear el ContactPoint para el teléfono
    // El id en ContactPoint (patient.types.ts) es opcional.
    const phoneContact: ContactPoint = {
      system: 'phone',
      value: formData.phone,
      use: 'work',
      // 'rank' es opcional en patient.types.ts, pero lo mantengo si el backend lo requiere.
      rank: 1,
    };

    // 4. Construir el payload final
    const payload: PatientRegisterData = {
      // Usamos el 'nullish coalescing' (??) para asegurar valores por defecto,
      // aunque idealmente la validación debe asegurar que no sean undefined/null.
      email: formData.email,
      password: formData.password ?? '',
      repeatpassword: formData.repeatpassword ?? '', // Se mantiene para el backend
      birthDate: formData.birthDate,
      gender: formData.gender,
      name: [baseName], // El tipo 'name' en PatientRegisterData es HumanName[]
      telecom: [phoneContact], // El tipo 'telecom' en PatientRegisterData es ContactPoint[]
    };

    return payload;
  }, []);

  const registerPatient = useCallback(async (formData: PatientFormData): Promise<boolean> => {
    // 1. Lógica de control de estado al inicio
    setLoading(true);
    setError(null);
    setSuccess(false);

    // 2. Validación de Contraseñas (Debe ser la primera validación)
    if (formData.password !== formData.repeatpassword) {
      const msg = 'Las contraseñas no coinciden';
      setError(msg);
      toast.error('Error de validación', { description: msg });
      setLoading(false); // IMPORTANTE: Desactivar la carga si falla en el frontend
      return false;
    }

    // 3. Flujo principal de la petición
    try {
      console.log('Iniciando registro de paciente:', formData);
      const payload = transformFormDataToFHIR(formData);
      console.log('Payload FHIR creado:', payload);

      const response = await PatientService.register(payload);

      if (response.error) {
        console.error('Error en el registro:', response.error);
        const errorMsg = response.error.details?.message || response.error.message || 'Error al registrar paciente';
        setError(errorMsg);
        toast.error('Error en el registro', { description: errorMsg });
        return false;
      }

      console.log('Paciente registrado exitosamente:', response.data);
      setSuccess(true);
      toast.success('Registro exitoso', { description: 'El paciente ha sido registrado correctamente' });

      return true;
    } catch (error: unknown) { // Usar 'unknown' es mejor práctica en TS
      console.error('Error inesperado en el registro:', error);

      let errorMessage = 'Error inesperado al registrar paciente';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      // Aquí podrías agregar lógica para errores de Axios o Zod (si lo usaras aquí)

      setError(errorMessage);
      toast.error('Error inesperado', { description: errorMessage });
      return false;
    } finally {
      // 4. Lógica de control de estado al final: SE EJECUTA SIEMPRE
      // Esto asegura que 'loading' se desactive incluso si el 'return false' es llamado
      // dentro del try/catch. (El 'setLoading(false)' antes del try/catch solo maneja la falla de frontend).
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