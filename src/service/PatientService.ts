// src/services/PatientService.ts

import axios from '@/utils/api'; // Asumo que esta es la instancia de Axios configurada
import { PatientRegisterData, ContactPoint } from '@/types/patient.types';
import { FHIRExternalGender } from '@/types/practitioner.types'; // Reutilizamos el enum FHIR centralizado

// 1. **ELIMINACIÓN DE TIPOS DUPLICADOS/INCORRECTOS**
// Se eliminan HumanName y ContactPoint definidos aquí y se importan.

// 2. **DEFINICIÓN CORRECTA DEL PAYLOAD**
// La interfaz PatientRegisterPayload se ALINEA con la PatientRegisterData
// de nuestro archivo de tipos, pero la definimos si el backend requiere una forma estricta.
// En este caso, usaremos PatientRegisterData (importada) ya que es la forma FHIR.

// INTERFAZ DE RESPUESTA ESTANDARIZADA
// Definimos una interfaz clara para el retorno de todas las promesas del servicio,
// lo cual mejora la predictibilidad del código que consume este servicio.
interface ServiceResponse<T> {
  data?: T;
  error?: {
    message: string;
    status: number;
    details?: any;
  };
  status: number;
  message?: string;
}

// Interfaz para los datos del paciente recibidos del backend
// Se usa solo para los métodos GET/PUT
interface PatientDataFromAPI {
  id: string;
  email: string;
  birthDate: string;
  gender: FHIRExternalGender;
  name: { text: string }[]; // Simplificado
  // Agregar aquí todos los campos que devuelve el servidor
}


export const PatientService = {
  // 1. REGISTRO (POST /patient)
  // Usamos PatientRegisterData para el tipado, asumiendo que el hook ya lo prepara.
  async register(patientData: PatientRegisterData): Promise<ServiceResponse<PatientDataFromAPI>> {
    try {
      console.log('Enviando datos al backend:', patientData);

      // Eliminamos el campo 'repeatpassword' si no es requerido por el backend real,
      // o lo dejamos si es una peculiaridad temporal. Lo dejaremos si está en PatientRegisterData.

      const response = await axios.post<PatientDataFromAPI>('/patient', patientData);

      console.log('Respuesta del backend:', response.data);

      return {
        data: response.data,
        status: response.status,
        message: response.statusText
      };
    } catch (error: unknown) { // Usamos 'unknown' para tipado seguro
      console.error('Error en PatientService.register:', error);
      return {
        error: {
          message: 'Error al registrar paciente',
          status: 500,
          details: error
        },
        status: 500
      };
    }
  },

};



export default PatientService;
