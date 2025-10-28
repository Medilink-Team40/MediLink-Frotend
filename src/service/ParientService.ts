import axios from '@/utils/api';
import { FHIRExternalGender } from '@/types/patient.types';

interface PatientData {
    id: string;
    name: string;
    email: string;
    password: string;
    repeatpassword: string;
    birthDate: string;
    gender: FHIRExternalGender;
    dni: string;
}

export const PatientService = {
    /**
     * Registro de un nuevo paciente
     */
    async register(PatientData: PatientData): Promise<any> {
        try {
            const response = await axios.post('/patient/register', PatientData);
            return {
                data: response.data,
                status: response.status,
                message: response.statusText
            }
        } catch (error: any) {
            return {
                error: {
                    message: error.message,
                    status: error.response?.status
                },
                status: error.response?.status || 500,
            }
        }
    },

    /**
     * Actualizar el perfil del paciente
     */
    async updateProfile(PatientData: Partial<PatientData>): Promise<any> {
        try {
            const response = await axios.put('/patient/update', PatientData);
            return {
                data: response.data,
                status: response.status,
                message: response.statusText
            }
        } catch (error: any) {
            return {
                error: {
                    message: error.message,
                    status: error.response?.status
                },
                status: error.response?.status || 500,
            }
        }
    },

    /**
     * Obtener los datos del perfil del paciente
     */
    async getProfile(patientId: string): Promise<any> {
        try {
            const response = await axios.get(`/patient/${patientId}`);
            return {
                data: response.data,
                status: response.status,
                message: response.statusText
            }
        } catch (error: any) {
            return {
                error: {
                    message: error.message,
                    status: error.response?.status
                },
                status: error.response?.status || 500,
            }
        }
    },

    /**
     * Obtener citas del paciente
     */
    async getAppointments(patientId: string): Promise<any> {
        try {
            const response = await axios.get(`/patient/${patientId}/appointments`);
            return {
                data: response.data,
                status: response.status,
                message: response.statusText
            }
        } catch (error: any) {
            return {
                error: {
                    message: error.message,
                    status: error.response?.status
                },
                status: error.response?.status || 500,
            }
        }
    },

    /**
     * Obtener historial médico
     */
    async getMedicalHistory(patientId: string): Promise<any> {
        try {
            const response = await axios.get(`/patient/${patientId}/medical-history`);
            return {
                data: response.data,
                status: response.status,
                message: response.statusText
            }
        } catch (error: any) {
            return {
                error: {
                    message: error.message,
                    status: error.response?.status
                },
                status: error.response?.status || 500,
            }
        }
    },

    /**
     * Obtener recetas del paciente
     */
    async getPrescriptions(patientId: string): Promise<any> {
        try {
            const response = await axios.get(`/patient/${patientId}/prescriptions`);
            return {
                data: response.data,
                status: response.status,
                message: response.statusText
            }
        } catch (error: any) {
            return {
                error: {
                    message: error.message,
                    status: error.response?.status
                },
                status: error.response?.status || 500,
            }
        }
    }
};

export default PatientService;