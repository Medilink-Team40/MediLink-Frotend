import axios from '@/utils/api';

interface CreateAvailabilityRuleRequest {
    calendarId: string;
    dayOfWeek: number; // 0 = Domingo, 1 = Lunes, etc.
    startTime: string; // HH:mm formato
    endTime: string; // HH:mm formato
    isAvailable: boolean;
    title?: string;
    description?: string;
}

interface UpdateAvailabilityRuleRequest {
    dayOfWeek?: number;
    startTime?: string;
    endTime?: string;
    isAvailable?: boolean;
    title?: string;
    description?: string;
}

interface AvailabilitySlotQuery {
    calendarId: string;
    startDate: string; // YYYY-MM-DD
    endDate: string; // YYYY-MM-DD
    duration?: number; // Duración en minutos (opcional)
}

export const availabilityService = {
    /**
     * Crear regla de disponibilidad para un calendario
     * POST /availability/{calendarId}/rules
     */
    async createRule(ruleData: CreateAvailabilityRuleRequest): Promise<any> {
        try {
            console.log('  Creando regla de disponibilidad:', ruleData);
            const { calendarId, ...ruleBody } = ruleData;
            const response = await axios.post(`/availability/${calendarId}/rules`, ruleBody);
            console.log('  Regla de disponibilidad creada:', response.data);
            return {
                data: response.data,
                status: response.status,
                message: 'Regla de disponibilidad creada exitosamente'
            }
        } catch (error: any) {
            console.error('  Error al crear regla de disponibilidad:', error.response?.data || error.message);
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
     * Listar todas las reglas de disponibilidad de un calendario
     * GET /availability/{calendarId}/rules
     */
    async getRulesByCalendar(calendarId: string): Promise<any> {
        try {
            console.log('  Obteniendo reglas de disponibilidad para calendario:', calendarId);
            const response = await axios.get(`/availability/${calendarId}/rules`);
            console.log('  Reglas obtenidas:', response.data);
            return {
                data: response.data,
                status: response.status,
                message: response.statusText
            }
        } catch (error: any) {
            console.error('  Error al obtener reglas de disponibilidad:', error.response?.data || error.message);
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
     * Obtener detalles de una regla de disponibilidad
     * GET /availability/rules/{id}
     */
    async getRuleById(ruleId: string): Promise<any> {
        try {
            console.log('  Obteniendo regla de disponibilidad por ID:', ruleId);
            const response = await axios.get(`/availability/rules/${ruleId}`);
            console.log('  Regla obtenida:', response.data);
            return {
                data: response.data,
                status: response.status,
                message: response.statusText
            }
        } catch (error: any) {
            console.error('  Error al obtener regla por ID:', error.response?.data || error.message);
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
     * Actualizar una regla de disponibilidad
     * PATCH /availability/rules/{id}
     */
    async updateRule(ruleId: string, ruleData: UpdateAvailabilityRuleRequest): Promise<any> {
        try {
            console.log('  Actualizando regla de disponibilidad:', ruleId, 'con datos:', ruleData);
            const response = await axios.patch(`/availability/rules/${ruleId}`, ruleData);
            console.log('  Regla actualizada:', response.data);
            return {
                data: response.data,
                status: response.status,
                message: 'Regla de disponibilidad actualizada exitosamente'
            }
        } catch (error: any) {
            console.error('  Error al actualizar regla:', error.response?.data || error.message);
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
     * Eliminar una regla de disponibilidad
     * DELETE /availability/rules/{id}
     */
    async deleteRule(ruleId: string): Promise<any> {
        try {
            console.log('  Eliminando regla de disponibilidad:', ruleId);
            const response = await axios.delete(`/availability/rules/${ruleId}`);
            console.log('  Regla eliminada exitosamente');
            return {
                data: response.data,
                status: response.status,
                message: 'Regla de disponibilidad eliminada exitosamente'
            }
        } catch (error: any) {
            console.error('  Error al eliminar regla:', error.response?.data || error.message);
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
     * Buscar slots disponibles en un rango de fechas
     * GET /availability/{calendarId}/slots
     */
    async getAvailableSlots(query: AvailabilitySlotQuery): Promise<any> {
        try {
            console.log('  Buscando slots disponibles:', query);
            const { calendarId, ...params } = query;
            const response = await axios.get(`/availability/${calendarId}/slots`, { params });
            console.log('  Slots disponibles obtenidos:', response.data);
            return {
                data: response.data,
                status: response.status,
                message: response.statusText
            }
        } catch (error: any) {
            console.error('  Error al obtener slots disponibles:', error.response?.data || error.message);
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
     * Obtener disponibilidad para una fecha específica (método de conveniencia)
     */
    async getAvailabilityForDate(calendarId: string, date: string, duration: number = 30): Promise<any> {
        return this.getAvailableSlots({
            calendarId,
            startDate: date,
            endDate: date,
            duration
        });
    }
}