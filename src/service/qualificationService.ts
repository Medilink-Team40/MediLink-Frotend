// Crear src/service/qualificationService.ts
import axios from '@/utils/api';
export const qualificationService = {
    async getAll(): Promise<any> {
        try {
            const response = await axios.get('/qualifications');
            return {
                data: response.data,
                status: response.status,
                message: response.statusText
            };
        } catch (error: any) {
            console.error('Error al obtener todas las calificaciones:', error);
            return {
                error: {
                    message: error.response?.data?.message || error.message,
                    status: error.response?.status || 500
                },
                status: error.response?.status || 500
            };
        }
    }
};
