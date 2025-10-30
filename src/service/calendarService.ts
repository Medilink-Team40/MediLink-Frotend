import axios from '@/utils/api';
import { availabilityService } from './AvailabilityService';

interface CreateCalendarRequest {
    name: string;
    description?: string;
    timeZone?: string;
    practitionerId: string;
}

interface Calendar {
    id: string;
    name: string;
    description?: string;
    timeZone: string;
    practitionerId: string;
    createdAt: string;
    updatedAt: string;
}

export const calendarService = {
    async create(doctorId: string): Promise<any> {
        try {
            console.log('Creando calendario para doctor:', doctorId);

            if (!doctorId) {
                throw new Error('ID de doctor requerido');
            }

            const response = await axios.post(`/calendar/doctor/${doctorId}/auto-create`);
            console.log('Calendario creado:', response.data);
            return {
                data: response.data,
                status: response.status,
                message: 'Calendario creado exitosamente'
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

    async getDoctorCalendar(doctorId: string): Promise<any> {
        try {
            console.log('Obteniendo calendario del doctor:', doctorId);

            if (!doctorId) {
                throw new Error('ID de doctor requerido');
            }

            const response = await axios.get(`/calendar/doctor/${doctorId}`);
            console.log('Calendario obtenido:', response.data);
            return {
                data: response.data,
                status: response.status,
                message: response.statusText
            }
        } catch (error: any) {
            console.error('Error al obtener calendario del doctor:', error.response?.data || error.message);
            return {
                error: {
                    message: error.response?.data?.message || error.message,
                    status: error.response?.status
                },
                status: error.response?.status || 500,
            }
        }
    },

    async autoCreateDoctorCalendar(doctorId: string): Promise<any> {
        try {
            console.log('Auto-creando calendario para doctor:', doctorId);

            if (!doctorId) {
                throw new Error('ID de doctor requerido');
            }

            const response = await this.create(doctorId);

            if (response.error) {
                console.error('Error al auto-crear calendario:', response.error);
                return response;
            }

            console.log('Calendario auto-creado exitosamente:', response.data);

            if (response.data?.id) {
                await this.createDefaultAvailabilityRules(response.data.id);
            }

            return response;
        } catch (error: any) {
            console.error('Error inesperado al auto-crear calendario:', error);
            return {
                error: {
                    message: error.message || 'Error al crear calendario automaticamente',
                    status: 500
                },
                status: 500
            }
        }
    },

    async getOrCreateDoctorCalendar(doctorId: string): Promise<any> {
        try {
            console.log('Buscando calendario existente para doctor:', doctorId);

            if (!doctorId) {
                throw new Error('ID de doctor requerido');
            }

            const existingCalendar = await this.getDoctorCalendar(doctorId);

            if (!existingCalendar.error) {
                console.log('Calendario existente encontrado:', existingCalendar.data);
                return existingCalendar;
            }

            if (existingCalendar.error.status === 404) {
                console.log('No se encontro calendario, creando uno nuevo...');
                return await this.autoCreateDoctorCalendar(doctorId);
            }

            console.error('Error al buscar calendario:', existingCalendar.error);
            return existingCalendar;

        } catch (error: any) {
            console.error('Error inesperado en getOrCreateDoctorCalendar:', error);
            return {
                error: {
                    message: error.message || 'Error al obtener/crear calendario',
                    status: 500
                },
                status: 500
            }
        }
    },

    async getDayView(calendarId: string, date: string): Promise<any> {
        try {
            console.log('Obteniendo vista diaria:', calendarId, 'fecha:', date);
            const response = await axios.get(`/calendar/${calendarId}/day`, {
                params: { date }
            });
            console.log('Vista diaria obtenida:', response.data);
            return {
                data: response.data,
                status: response.status,
                message: response.statusText
            }
        } catch (error: any) {
            console.error('Error al obtener vista diaria:', error.response?.data || error.message);
            return {
                error: {
                    message: error.response?.data?.message || error.message,
                    status: error.response?.status
                },
                status: error.response?.status || 500,
            }
        }
    },

    async createDefaultAvailabilityRules(calendarId: string): Promise<void> {
        try {
            console.log('Creando reglas de disponibilidad por defecto para calendario:', calendarId);
            const workDays = [1, 2, 3, 4, 5];

            for (const dayOfWeek of workDays) {
                try {
                    const ruleData = {
                        calendarId,
                        dayOfWeek,
                        startTime: "09:00",
                        endTime: "18:00",
                        isAvailable: true,
                        title: `Horario laboral ${this.getDayName(dayOfWeek)}`,
                        description: `Disponibilidad estandar para ${this.getDayName(dayOfWeek)}`
                    };

                    const result = await availabilityService.createRule(ruleData);

                    if (result.error) {
                       // console.warn(`No se pudo crear regla para ${this.getDayName(dayOfWeek)}:`, result.error);
                    } else {
                       // console.log(`Regla creada para ${this.getDayName(dayOfWeek)}`);
                    }
                } catch (ruleError) {
                      console.error('Error al crear regla para ' + this.getDayName(dayOfWeek) + ':', ruleError);
                }
            }
        } catch (error) {
            console.error('Error al crear reglas de disponibilidad por defecto:', error);
        }
    },

    getDayName(dayOfWeek: number): string {
        const days = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
        return days[dayOfWeek] || 'Desconocido';
    },
    async getWeekView(calendarId: string, startDate: string): Promise<any> {
        try {

            const response = await axios.get(`/calendar/${calendarId}/week`, {
                params: { startDate }
            });

            return {
                data: response.data,
                status: response.status,
                message: response.statusText
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
    }
};