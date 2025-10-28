import axios from '@/utils/api';
import { PractitionerRegisterData, Practitioner } from '@/types/practitioner.types';

export const practitionerService = {
    /**
     * Registrar un nuevo profesional médico
     */
    async register(practitionerData: PractitionerRegisterData): Promise<any> {
        try {
            const response = await axios.post('/practitioner/register-practitioner', practitionerData);
            return {
                data: response.data,
                status: response.status,
                message: 'Profesional registrado exitosamente'
            }
        } catch (error: any) {
            return {
                error: {
                    message: error.response?.data?.message || error.message,
                    status: error.response?.status
                },
                status: error.response?.status || 500,
            }
        }
    },

    /**
     * Obtener todos los profesionales
     */
    async getAll(filters?: any): Promise<any> {
        try {
            const response = await axios.get('/practitioners', { params: filters });
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
     * Obtener profesional por ID
     */
    async getById(practitionerId: string): Promise<any> {
        try {
            const response = await axios.get(`/practitioners/${practitionerId}`);
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
     * Actualizar profesional
     */
    async update(practitionerId: string, practitionerData: Partial<PractitionerRegisterData>): Promise<any> {
        try {
            const response = await axios.put(`/practitioners/${practitionerId}`, practitionerData);
            return {
                data: response.data,
                status: response.status,
                message: 'Profesional actualizado exitosamente'
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
     * Eliminar profesional
     */
    async delete(practitionerId: string): Promise<any> {
        try {
            const response = await axios.delete(`/practitioners/${practitionerId}`);
            return {
                data: response.data,
                status: response.status,
                message: 'Profesional eliminado exitosamente'
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
     * Obtener profesionales por especialidad
     */
    async getBySpecialization(specialization: string): Promise<any> {
        try {
            const response = await axios.get(`/practitioners/specialization/${specialization}`);
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
     * Obtener disponibilidad de un profesional
     */
    async getAvailability(practitionerId: string, date: string): Promise<any> {
        try {
            const response = await axios.get(`/practitioners/${practitionerId}/availability`, {
                params: { date }
            });
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
}