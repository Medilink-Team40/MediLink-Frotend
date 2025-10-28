import axios from '@/utils/api';
//import { Appointment } from '@/types/appointment.types';

interface CreateAppointmentRequest {
    patientId: string;
    doctorId: string;
    date: string;
    time: string;
    reason: string;
    notes?: string;
}

interface UpdateAppointmentRequest {
    date?: string;
    time?: string;
    reason?: string;
    notes?: string;
    status?: 'scheduled' | 'completed' | 'cancelled' | 'no-show';
}

export const appointmentService = {
    /**
     * Crear una nueva cita
     */
    async create(appointmentData: CreateAppointmentRequest): Promise<any> {
        try {
            const response = await axios.post('/appointments', appointmentData);
            return {
                data: response.data,
                status: response.status,
                message: 'Cita creada exitosamente'
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
     * Obtener todas las citas
     */
    async getAll(filters?: any): Promise<any> {
        try {
            const response = await axios.get('/appointments', { params: filters });
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
     * Obtener cita por ID
     */
    async getById(appointmentId: string): Promise<any> {
        try {
            const response = await axios.get(`/appointments/${appointmentId}`);
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
     * Actualizar cita
     */
    async update(appointmentId: string, appointmentData: UpdateAppointmentRequest): Promise<any> {
        try {
            const response = await axios.put(`/appointments/${appointmentId}`, appointmentData);
            return {
                data: response.data,
                status: response.status,
                message: 'Cita actualizada exitosamente'
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
     * Cancelar cita
     */
    async cancel(appointmentId: string): Promise<any> {
        try {
            const response = await axios.patch(`/appointments/${appointmentId}/cancel`);
            return {
                data: response.data,
                status: response.status,
                message: 'Cita cancelada exitosamente'
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
     * Obtener citas de un paciente
     */
    async getByPatient(patientId: string): Promise<any> {
        try {
            const response = await axios.get(`/appointments/patient/${patientId}`);
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
     * Obtener citas de un doctor
     */
    async getByDoctor(doctorId: string): Promise<any> {
        try {
            const response = await axios.get(`/appointments/doctor/${doctorId}`);
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
     * Obtener disponibilidad de un doctor
     */
    async getAvailability(doctorId: string, date: string): Promise<any> {
        try {
            const response = await axios.get(`/doctors/${doctorId}/availability`, {
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