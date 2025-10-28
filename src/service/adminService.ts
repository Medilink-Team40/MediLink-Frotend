import axios from '@/utils/api';

export const adminService = {
    /**
     * Obtener estadísticas del sistema
     */
    async getStatistics(): Promise<any> {
        try {
            const response = await axios.get('/admin/statistics');
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
     * Obtener todos los pacientes
     */
    async getAllPatients(filters?: any): Promise<any> {
        try {
            const response = await axios.get('/admin/patients', { params: filters });
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
     * Obtener todos los doctores
     */
    async getAllDoctors(filters?: any): Promise<any> {
        try {
            const response = await axios.get('/admin/doctors', { params: filters });
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
     * Obtener todas las citas
     */
    async getAllAppointments(filters?: any): Promise<any> {
        try {
            const response = await axios.get('/admin/appointments', { params: filters });
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
     * Activar/Desactivar paciente
     */
    async togglePatientStatus(patientId: string): Promise<any> {
        try {
            const response = await axios.patch(`/admin/patients/${patientId}/toggle-status`);
            return {
                data: response.data,
                status: response.status,
                message: 'Estado del paciente actualizado'
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
     * Activar/Desactivar doctor
     */
    async toggleDoctorStatus(doctorId: string): Promise<any> {
        try {
            const response = await axios.patch(`/admin/doctors/${doctorId}/toggle-status`);
            return {
                data: response.data,
                status: response.status,
                message: 'Estado del doctor actualizado'
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
     * Generar reporte
     */
    async generateReport(reportType: string, filters?: any): Promise<any> {
        try {
            const response = await axios.get(`/admin/reports/${reportType}`, { params: filters });
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