import axios from '@/utils/api';

interface CreateAppointmentRequest {
    patientId: string;
    doctorId?: string | undefined;
    date: string;
    time: string;
    reason: string;
    type?: 'in-person' | 'virtual';
    notes?: string;
    durationMinutes?: number; // Agregar duración opcional
}

interface CreateAppointmentBackendRequest {
    patientId: string; // UUID
    startAt: string; // ISO 8601 date string
    endAt: string; // ISO 8601 date string
    durationMinutes: number; // integer
    reason: string;
    type: 'in-person' | 'virtual';
    notes?: string;
}

interface UpdateAppointmentRequest {
    patientId?: string;
    doctorId?: string | undefined;
    date?: string;
    time?: string;
    reason?: string;
    type?: 'in-person' | 'virtual';
    notes?: string;
    status?: 'scheduled' | 'completed' | 'cancelled' | 'no-show';
}

export const appointmentService = {
    /**
     * Transformar datos del frontend al formato del backend
     */
    transformToBackendFormat(appointmentData: CreateAppointmentRequest): CreateAppointmentBackendRequest {
        const { date, time, durationMinutes = 30, ...restData } = appointmentData;

        // Crear fecha/hora de inicio en formato ISO 8601
        const startDateTime = new Date(`${date}T${time}:00.000Z`);
        const startAt = startDateTime.toISOString();

        // Calcular fecha/hora de fin
        const endDateTime = new Date(startDateTime.getTime() + (durationMinutes * 60 * 1000));
        const endAt = endDateTime.toISOString();

        console.log('Transformando datos:');
        console.log(' Fecha original:', date, 'Hora:', time);
        console.log(' StartAt ISO:', startAt);
        console.log(' EndAt ISO:', endAt);
        console.log(' Duración:', durationMinutes, 'minutos');

        return {
            ...restData,
            startAt,
            endAt,
            durationMinutes,
            type: restData.type || 'in-person'
        };
    },

    /**
     * Generar UUID v4 válido para pacientes mock
     */
    generateValidPatientId(mockId: string): string {
        // Para los pacientes mock, generar UUIDs válidos basados en el ID
        const uuidMap: Record<string, string> = {
            '1': '550e8400-e29b-41d4-a716-446655440001',
            '2': '550e8400-e29b-41d4-a716-446655440002',
            '3': '550e8400-e29b-41d4-a716-446655440003',
            '4': '550e8400-e29b-41d4-a716-446655440004',
            '5': '550e8400-e29b-41d4-a716-446655440005'
        };

        return uuidMap[mockId] || mockId;
    },

    /**
     * Crear una nueva cita (doctor o paciente)
     * POST /appointments
     */
    async create(appointmentData: CreateAppointmentRequest): Promise<any> {
        try {
            console.log('  Creando cita con datos originales:', appointmentData);

            // Transformar patientId si es un ID mock
            const validPatientId = this.generateValidPatientId(appointmentData.patientId);
            console.log(' PatientId transformado:', appointmentData.patientId, '→', validPatientId);

            // Transformar al formato del backend
            const backendData = this.transformToBackendFormat({
                ...appointmentData,
                patientId: validPatientId
            });

            console.log(' Enviando al backend:', backendData);

            const response = await axios.post('/appointments', backendData);
            console.log('  Cita creada exitosamente:', response.data);
            return {
                data: response.data,
                status: response.status,
                message: 'Cita creada exitosamente'
            }
        } catch (error: any) {
            console.error('  Error al crear cita:', error.response?.data || error.message);
            console.error('  Payload enviado:', error.config?.data);
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
     * Listar todas las citas (admin)
     * GET /appointments
     */
    async getAll(filters?: any): Promise<any> {
        try {
            console.log('  Obteniendo todas las citas con filtros:', filters);
            const response = await axios.get('/appointments', { params: filters });
            console.log('  Citas obtenidas:', response.data);
            return {
                data: response.data,
                status: response.status,
                message: response.statusText
            }
        } catch (error: any) {
            console.error('  Error al obtener todas las citas:', error.response?.data || error.message);
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
     * Ver detalles de una cita por ID
     * GET /appointments/{id}
     */
    async getById(appointmentId: string): Promise<any> {
        try {
            console.log('  Obteniendo cita por ID:', appointmentId);
            const response = await axios.get(`/appointments/${appointmentId}`);
            console.log('  Cita obtenida:', response.data);
            return {
                data: response.data,
                status: response.status,
                message: response.statusText
            }
        } catch (error: any) {
            console.error('  Error al obtener cita por ID:', error.response?.data || error.message);
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
     * Actualizar una cita existente
     * PATCH /appointments/{id}
     */
    async update(appointmentId: string, appointmentData: UpdateAppointmentRequest): Promise<any> {
        try {
            console.log('  Actualizando cita:', appointmentId, 'con datos:', appointmentData);
            const response = await axios.patch(`/appointments/${appointmentId}`, appointmentData);
            console.log('  Cita actualizada:', response.data);
            return {
                data: response.data,
                status: response.status,
                message: 'Cita actualizada exitosamente'
            }
        } catch (error: any) {
            console.error('  Error al actualizar cita:', error.response?.data || error.message);
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
     * Eliminar una cita
     * DELETE /appointments/{id}
     */
    async delete(appointmentId: string): Promise<any> {
        try {
            console.log('  Eliminando cita:', appointmentId);
            const response = await axios.delete(`/appointments/${appointmentId}`);
            console.log('  Cita eliminada exitosamente');
            return {
                data: response.data,
                status: response.status,
                message: 'Cita eliminada exitosamente'
            }
        } catch (error: any) {
            console.error('  Error al eliminar cita:', error.response?.data || error.message);
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
     * Cancelar cita (alias para delete para compatibilidad)
     */
    async cancel(appointmentId: string): Promise<any> {
        return this.delete(appointmentId);
    },

    /**
     * Listar todas las citas de un doctor
     * GET /appointments/doctor/{doctorId}
     */
    async getByDoctor(doctorId: string): Promise<any> {
        try {
            console.log('  Obteniendo citas del doctor:', doctorId);
            const response = await axios.get(`/appointments/doctor/${doctorId}`);
            console.log('  Citas del doctor obtenidas:', response.data);
            return {
                data: response.data,
                status: response.status,
                message: response.statusText
            }
        } catch (error: any) {
            console.error('  Error al obtener citas del doctor:', error.response?.data || error.message);
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
     * Listar todas las citas de un paciente
     * GET /appointments/patient/{patientId}
     */
    async getByPatient(patientId: string): Promise<any> {
        try {
            console.log('  Obteniendo citas del paciente:', patientId);
            const response = await axios.get(`/appointments/patient/${patientId}`);
            console.log('  Citas del paciente obtenidas:', response.data);
            return {
                data: response.data,
                status: response.status,
                message: response.statusText
            }
        } catch (error: any) {
            console.error('  Error al obtener citas del paciente:', error.response?.data || error.message);
            return {
                error: {
                    message: error.response?.data?.message || error.message,
                    status: error.response?.status
                },
                status: error.response?.status || 500,
            }
        }
    }
}