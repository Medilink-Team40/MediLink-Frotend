import { useState, useCallback, useEffect } from 'react';
import { appointmentService } from '@/service/appointmentService';
import { availabilityService } from '@/service/AvailabilityService';
import { calendarService } from '@/service/calendarService';
import { toast } from 'sonner';

// Tipos del appointment service
interface CreateAppointmentRequest {
  patientId: string;
  doctorId?: string | undefined;
  date: string;
  time: string;
  reason: string;
  type: 'in-person' | 'virtual';
  notes?: string;
  durationMinutes?: number;
}

interface Patient {
  id: string;
  name: string;
  email: string;
  phone?: string;
  dni?: string;
}

interface Appointment {
  id: string;
  patientId: string;
  doctorId?: string | undefined;
  date: string;
  time: string;
  reason: string;
  notes?: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'no-show';
  type: 'in-person' | 'virtual';
  createdAt: string;
  updatedAt: string;
  patient?: Patient;
}

interface AvailabilitySlot {
  time: string;
  available: boolean;
  appointmentId?: string;
}

export const useAppointmentService = (doctorKeycloakId: string) => {
  // Estados del servicio
  const [loading, setLoading] = useState(false);
  const [searchingPatients, setSearchingPatients] = useState(false);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [creatingAppointment, setCreatingAppointment] = useState(false);

  // Estados de datos
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [availableSlots, setAvailableSlots] = useState<AvailabilitySlot[]>([]);

  // Estado de calendario
  const [calendarId, setCalendarId] = useState<string | null>(null);
  const [calendarReady, setCalendarReady] = useState(false);
  const [calendarError, setCalendarError] = useState<string | null>(null);

  // Pacientes mock con UUIDs validos
  const mockPatients: Patient[] = [
    {
      id: '550e8400-e29b-41d4-a716-446655440001',
      name: 'Juan Perez',
      email: 'juan.perez@email.com',
      phone: '+1234567890',
      dni: '12345678'
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440002',
      name: 'Maria Garcia',
      email: 'maria.garcia@email.com',
      phone: '+1234567891',
      dni: '87654321'
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440003',
      name: 'Pedro Lopez',
      email: 'pedro.lopez@email.com',
      phone: '+1234567892',
      dni: '11223344'
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440004',
      name: 'Ana Martinez',
      email: 'ana.martinez@email.com',
      phone: '+1234567893',
      dni: '55667788'
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440005',
      name: 'Carlos Rodriguez',
      email: 'carlos.rodriguez@email.com',
      phone: '+1234567894',
      dni: '99887766'
    }
  ];

  // Inicializar calendario del doctor
  const initializeCalendar = useCallback(async (doctorIdParam?: string) => {
    const targetDoctorId = doctorIdParam || doctorKeycloakId;

    if (!targetDoctorId) {
      console.error('No se proporciono doctorId');
      setCalendarError('No se proporciono ID de doctor');
      return;
    }

    try {
      setLoading(true);
      setCalendarError(null);
      console.log('Inicializando calendario para doctor:', targetDoctorId);

      const calendarResponse = await calendarService.getOrCreateDoctorCalendar(targetDoctorId);

      if (calendarResponse.error) {
        console.error('Error al obtener/crear calendario:', calendarResponse.error);
        setCalendarError(calendarResponse.error.message);
        toast.error('Error al inicializar calendario', {
          description: calendarResponse.error.message
        });
        return;
      }

      const calendar = calendarResponse.data;
      console.log('Calendario obtenido/creado:', calendar);

      setCalendarId(calendar.id);
      setCalendarReady(true);
      setCalendarError(null);

      console.log('Calendario inicializado correctamente:', calendar.id);
    } catch (error: any) {
      console.error('Error inesperado al inicializar calendario:', error);
      setCalendarError(error.message || 'Error desconocido');
      toast.error('Error al inicializar calendario');
    } finally {
      setLoading(false);
    }
  }, [doctorKeycloakId]);

  // Obtener citas por doctor
  const fetchAppointmentsByDoctor = useCallback(async () => {
    if (!doctorKeycloakId) return;

    try {
      setLoading(true);
      console.log('Obteniendo citas del doctor:', doctorKeycloakId);

      const response = await appointmentService.getByDoctor(doctorKeycloakId);

      if (response.error) {
        console.error('Error al obtener citas del doctor:', response.error);
        toast.error('Error al cargar las citas');
        return;
      }

      console.log('Citas del doctor obtenidas:', response.data);
      setAppointments(response.data || []);
    } catch (error) {
      console.error('Error inesperado al obtener citas:', error);
      toast.error('Error al cargar las citas');
    } finally {
      setLoading(false);
    }
  }, [doctorKeycloakId]);

  // Obtener slots disponibles
  const fetchAvailableSlots = useCallback(async (date: string) => {
    if (!doctorKeycloakId || !calendarId) return;

    try {
      setLoadingSlots(true);
      console.log('Obteniendo slots disponibles para fecha:', date, 'calendario:', calendarId);

      const response = await availabilityService.getAvailableSlots({
        calendarId,
        startDate: date,
        endDate: date,
        duration: 30
      });

      if (response.error) {
        console.error('Error al obtener slots:', response.error);

        // Si no hay reglas, generar slots por defecto
        if (response.error.status === 404) {
          console.log('No hay reglas de disponibilidad, generando slots por defecto');
          const defaultSlots = generateDefaultSlots();
          setAvailableSlots(defaultSlots);
          return;
        }

        toast.error('Error al cargar horarios disponibles');
        return;
      }

      console.log('Slots obtenidos:', response.data);

      // Si el array viene vacio, generar slots por defecto
      if (!response.data || response.data.length === 0) {
        console.log('No hay slots disponibles, generando slots por defecto');
        const defaultSlots = generateDefaultSlots();
        setAvailableSlots(defaultSlots);
        return;
      }

      setAvailableSlots(response.data);
    } catch (error) {
      console.error('Error inesperado al obtener slots:', error);
      toast.error('Error al cargar horarios');
    } finally {
      setLoadingSlots(false);
    }
  }, [calendarId, doctorKeycloakId]);

  // Generar slots por defecto (horario de oficina estandar)
  const generateDefaultSlots = useCallback((): AvailabilitySlot[] => {
    const slots: AvailabilitySlot[] = [];

    // Horarios de manana: 9:00 - 12:00
    for (let hour = 9; hour < 12; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        slots.push({
          time,
          available: true
        });
      }
    }

    // Horarios de tarde: 14:00 - 17:00
    for (let hour = 14; hour < 17; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        slots.push({
          time,
          available: true
        });
      }
    }

    console.log('Slots por defecto generados:', slots.length, 'slots');
    return slots;
  }, []);

  // Buscar pacientes
  const searchPatients = useCallback(async (query: string) => {
    if (!query || query.length < 2) {
      setPatients([]);
      return;
    }

    try {
      setSearchingPatients(true);
      console.log('Buscando pacientes con query:', query);

      const filteredPatients = mockPatients.filter(patient =>
        patient.name.toLowerCase().includes(query.toLowerCase()) ||
        patient.email.toLowerCase().includes(query.toLowerCase()) ||
        patient.dni?.includes(query)
      );

      console.log('Pacientes encontrados:', filteredPatients.length);
      setPatients(filteredPatients);
    } catch (error) {
      console.error('Error al buscar pacientes:', error);
      toast.error('Error al buscar pacientes');
    } finally {
      setSearchingPatients(false);
    }
  }, []);

  // Crear nueva cita
  const createAppointment = useCallback(async (appointmentData: CreateAppointmentRequest) => {
    try {
      setCreatingAppointment(true);
      console.log('Creando cita con datos:', appointmentData);

      const response = await appointmentService.create(appointmentData);

      if (response.error) {
        console.error('Error en la respuesta:', response.error);
        toast.error(response.error.message || 'Error al crear la cita');
        return { success: false, error: response.error };
      }

      console.log('Cita creada exitosamente:', response);
      toast.success('Cita creada exitosamente');

      // Actualizar la lista de citas si tenemos doctorId
      if (doctorKeycloakId) {
        await fetchAppointmentsByDoctor();
      }

      // Actualizar slots disponibles para la fecha
      await fetchAvailableSlots(appointmentData.date);

      return { success: true, data: response.data };
    } catch (error) {
      console.error('Error al crear cita:', error);
      toast.error('Error inesperado al crear la cita');
      return { success: false, error };
    } finally {
      setCreatingAppointment(false);
    }
  }, [doctorKeycloakId, fetchAppointmentsByDoctor, fetchAvailableSlots]);

  // Inicializar calendario automaticamente cuando cambie el doctorId
  // Solo se ejecuta UNA VEZ cuando el componente monta y hay doctorId
  useEffect(() => {
    let mounted = true;

    if (doctorKeycloakId && !calendarReady && !loading) {
      console.log('Iniciando inicializacion de calendario para:', doctorKeycloakId);

      const init = async () => {
        if (mounted) {
          await initializeCalendar(doctorKeycloakId);
        }
      };

      init();
    }

    return () => {
      mounted = false;
    };
  }, [doctorKeycloakId]); // Solo depende de doctorId

  return {
    // Estados
    loading,
    searchingPatients,
    loadingSlots,
    creatingAppointment,
    calendarReady,
    calendarError,

    // Datos
    appointments,
    patients,
    availableSlots,
    calendarId,
    mockPatients,

    // Funciones
    searchPatients,
    createAppointment,
    fetchAppointmentsByDoctor,
    fetchAvailableSlots,
    initializeCalendar,

    // Utilidades
    resetPatients: () => setPatients([]),
    resetSlots: () => setAvailableSlots([])
  };
};