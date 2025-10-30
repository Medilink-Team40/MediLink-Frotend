export interface Appointment {
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
  patient?: {
    id: string;
    name: string;
    email: string;
    phone?: string;
  };
  doctor?: {
    id: string;
    name: string;
    specialization?: string;
  };
}

export interface CreateAppointmentRequest {
  patientId: string;
  doctorId?: string | undefined;
  date: string;
  time: string;
  reason: string;
  type: 'in-person' | 'virtual';
  notes?: string;
}

// Nuevo tipo para el formato que espera el backend
export interface CreateAppointmentBackendRequest {
  patientId: string; // UUID
  startAt: string; // ISO 8601 date string
  endAt: string; // ISO 8601 date string
  durationMinutes: number; // integer
  reason: string;
  type: 'in-person' | 'virtual';
  notes?: string;
}

export interface UpdateAppointmentRequest {
  date?: string;
  time?: string;
  reason?: string;
  notes?: string;
  status?: 'scheduled' | 'completed' | 'cancelled' | 'no-show';
  type?: 'in-person' | 'virtual';
}

export interface AvailabilitySlot {
  time: string;
  available: boolean;
  appointmentId?: string;
}

export interface Patient {
  id: string;
  name: string;
  email: string;
  phone?: string;
  dni?: string;
}

export interface AppointmentFilters {
  date?: string;
  status?: 'scheduled' | 'completed' | 'cancelled' | 'no-show';
  type?: 'in-person' | 'virtual';
  patientId?: string;
  doctorId?: string;
}