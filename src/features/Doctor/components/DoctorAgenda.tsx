// src/features/Doctor/components/DoctorAgenda.tsx
import React, { useState, useEffect, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Search, Loader2, Calendar, Clock, User, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { useAppointmentService } from '@/hooks/useAppointmentService';
import { CreateAppointmentRequest, Patient } from '@/types/appointment.types';

const DoctorAgenda = () => {
  const [selectedDate, setSelectedDate] = useState(5);
  const [selectedTime, setSelectedTime] = useState('11:00');
  const [appointmentType, setAppointmentType] = useState<'in-person' | 'virtual'>('in-person');
  const [currentMonth, setCurrentMonth] = useState(9); // Octubre = 9 (0-indexado)
  const [currentYear, setCurrentYear] = useState(2025);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [patientSearchQuery, setPatientSearchQuery] = useState('');
  const [appointmentReason, setAppointmentReason] = useState('');
  const [showPatientResults, setShowPatientResults] = useState(false);

  // Hook para servicios de citas - corregir nombres de propiedades
  const {
    appointments,
    availableSlots, // Era 'availability'
    patients,
    loading,
    creatingAppointment, // Era 'creating'
    searchingPatients,
    loadingSlots,
    fetchAppointmentsByDoctor, // Era 'loadAppointments'
    fetchAvailableSlots, // Era 'loadAvailability'
    searchPatients,
    createAppointment,
    calendarReady
  } = useAppointmentService('95d8a9b8-b4da-4927-9ffe-f887c7761ec2'); // Agregar doctorId

  // Obtener la fecha seleccionada en formato YYYY-MM-DD
  const selectedDateString = useMemo(() => {
    const year = currentYear;
    const month = (currentMonth + 1).toString().padStart(2, '0');
    const day = selectedDate.toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }, [currentYear, currentMonth, selectedDate]);

  // Cargar disponibilidad cuando cambia la fecha
  useEffect(() => {
    if (calendarReady) {
      fetchAvailableSlots(selectedDateString);
    }
  }, [selectedDateString, fetchAvailableSlots, calendarReady]);

  // Obtener citas del día seleccionado
  const appointmentsForSelectedDate = useMemo(() => {
    return appointments.filter(appointment => appointment.date === selectedDateString);
  }, [appointments, selectedDateString]);

  // Manejar búsqueda de pacientes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (patientSearchQuery.length >= 2) {
        searchPatients(patientSearchQuery);
        setShowPatientResults(true);
      } else {
        setShowPatientResults(false);
      }
    }, 300); // Debounce de 300ms

    return () => clearTimeout(timeoutId);
  }, [patientSearchQuery, searchPatients]);

  // Nombres de los meses
  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  // Función para obtener los días del calendario
  const getCalendarDays = () => {
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Días del mes anterior
    const prevMonth = new Date(currentYear, currentMonth, 0);
    const daysInPrevMonth = prevMonth.getDate();
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      days.push({
        day: daysInPrevMonth - i,
        isCurrentMonth: false,
        hasAppointment: false
      });
    }

    // Días del mes actual
    for (let day = 1; day <= daysInMonth; day++) {
      // Verificar si hay citas en este día
      const dayString = `${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
      const hasAppointment = appointments.some(apt => apt.date === dayString && apt.status === 'scheduled');

      days.push({
        day,
        isCurrentMonth: true,
        hasAppointment
      });
    }

    // Días del siguiente mes para completar la grilla
    const remainingDays = 42 - days.length; // 6 semanas * 7 días
    for (let day = 1; day <= remainingDays; day++) {
      days.push({
        day,
        isCurrentMonth: false,
        hasAppointment: false
      });
    }

    return days;
  };

  // Funciones para navegar entre meses
  const goToPreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const calendarDays = getCalendarDays();

  // Manejar selección de paciente
  const handlePatientSelect = (patient: Patient) => {
    setSelectedPatient(patient);
    setPatientSearchQuery(patient.name);
    setShowPatientResults(false);
  };

  // Validar formulario
  const validateForm = (): boolean => {
    if (!selectedPatient) {
      toast.error('Selecciona un paciente', {
        description: 'Debes buscar y seleccionar un paciente para la cita'
      });
      return false;
    }

    if (!selectedTime) {
      toast.error('Selecciona un horario', {
        description: 'Debes seleccionar un horario disponible'
      });
      return false;
    }

    if (!appointmentReason.trim()) {
      toast.error('Ingresa el motivo de la visita', {
        description: 'El motivo de la visita es obligatorio'
      });
      return false;
    }

    return true;
  };

  // Manejar envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const appointmentData: CreateAppointmentRequest = {
      patientId: selectedPatient!.id,
      doctorId: '95d8a9b8-b4da-4927-9ffe-f887c7761ec2', // Reemplazar con el ID real del doctor
      date: selectedDateString,
      time: selectedTime,
      reason: appointmentReason.trim(),
      type: appointmentType,
      notes: ''
    };

    const result = await createAppointment(appointmentData);

    if (result?.success) {
      // Limpiar formulario
      setSelectedPatient(null);
      setPatientSearchQuery('');
      setAppointmentReason('');
      setSelectedTime('');
      // Recargar disponibilidad
      await fetchAvailableSlots(selectedDateString);
    }
  };

  return (
    <div className="w-full bg-white p-4 md:p-6">
      <main className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full items-start">
        {/* Calendario */}
        <div className="md:col-span-2 bg-white border border-gray-200 rounded-xl shadow-sm p-4 md:p-6 h-full overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-600 w-10 h-10 p-0"
              onClick={goToPreviousMonth}
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <p className="text-lg font-bold text-center text-gray-900">
              {monthNames[currentMonth]} {currentYear}
            </p>
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-600 w-10 h-10 p-0"
              onClick={goToNextMonth}
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>

          <div className="grid grid-cols-7 gap-1">
            {/* Días de la semana */}
            {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map((day) => (
              <p key={day} className="text-sm font-semibold text-center text-gray-500 py-2">
                {day}
              </p>
            ))}

            {/* Días del calendario */}
            {calendarDays.map((date, index) => (
              <div key={index} className="relative">
                {date.isCurrentMonth ? (
                  <button
                    onClick={() => setSelectedDate(date.day)}
                    className={`h-12 w-full text-sm font-medium relative rounded-lg transition-colors ${
                      selectedDate === date.day
                        ? 'bg-[#1193d4] text-white'
                        : 'text-primary hover:bg-primary/10'
                    }`}
                  >
                    <div className="flex w-full h-full items-center justify-center">
                      {date.day}
                    </div>
                    {date.hasAppointment && selectedDate !== date.day && (
                      <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 h-1 w-1 bg-primary rounded-full" />
                    )}
                  </button>
                ) : (
                  <div className="h-12 w-full flex items-center justify-center text-gray-400 text-sm">
                    {date.day}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Detalle / Formulario */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 md:p-6 flex flex-col md:sticky md:top-4">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="h-5 w-5 text-blue-600" />
            <h2 className="text-xl font-bold tracking-tight text-gray-900">
              Programar nueva cita
            </h2>
          </div>
          <p className="text-gray-500 text-sm mb-4">
            Selecciona una fecha y un horario para agendar una nueva cita.
          </p>

          {/* Mostrar estadísticas del día */}
          {appointmentsForSelectedDate.length > 0 && (
            <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center gap-2 text-blue-700">
                <Clock className="h-4 w-4" />
                <span className="text-sm font-medium">
                  {appointmentsForSelectedDate.length} cita(s) programada(s) para este día
                </span>
              </div>
            </div>
          )}

          <div className="mb-6">
            <h3 className="text-base font-semibold mb-3 text-gray-900">
              Horarios disponibles para el {selectedDate} de {monthNames[currentMonth].toLowerCase()} de {currentYear}
            </h3>

            {loadingSlots ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
                <span className="ml-2 text-sm text-gray-600">Cargando horarios...</span>
              </div>
            ) : !calendarReady ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
                <span className="ml-2 text-sm text-gray-600">Inicializando calendario...</span>
              </div>
            ) : availableSlots && availableSlots.length > 0 ? (
              <div className="grid grid-cols-3 gap-2">
                {availableSlots.map((slot) => (
                  <button
                    key={slot.time}
                    onClick={() => slot.available && setSelectedTime(slot.time)}
                    disabled={!slot.available}
                    className={`h-10 text-sm font-medium rounded-lg border transition-colors ${
                      selectedTime === slot.time
                        ? 'bg-[#1193d4] text-white border-[#1193d4]'
                        : slot.available
                        ? 'border-primary/30 hover:border-primary hover:text-primary text-primary'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200'
                    }`}
                  >
                    {slot.time}
                  </button>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Clock className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                <p className="text-sm">No hay horarios disponibles para esta fecha</p>
                <p className="text-xs text-gray-400 mt-1">Intenta con otra fecha</p>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 flex-1">
            <div>
              <Label className="text-sm font-medium mb-2 block text-gray-900">
                Tipo de cita
              </Label>
              <div className="grid grid-cols-2 gap-2">
                <label className="flex items-center p-3 border rounded-lg cursor-pointer has-:checked:bg-[#1193d4]/10 has-:checked:border-[#1193d4] border-gray-300">
                  <input
                    type="radio"
                    name="appointment-type"
                    value="in-person"
                    checked={appointmentType === 'in-person'}
                    onChange={(e) => setAppointmentType(e.target.value as 'in-person' | 'virtual')}
                    className="form-radio text-[#1193d4] focus:ring-[#1193d4]"
                  />
                  <span className="ml-3 text-sm text-gray-700">Presencial</span>
                </label>
                <label className="flex items-center p-3 border rounded-lg cursor-pointer has-:checked:bg-[#1193d4]/10 has-:checked:border-[#1193d4] border-gray-300">
                  <input
                    type="radio"
                    name="appointment-type"
                    value="virtual"
                    checked={appointmentType === 'virtual'}
                    onChange={(e) => setAppointmentType(e.target.value as 'in-person' | 'virtual')}
                    className="form-radio text-[#1193d4] focus:ring-[#1193d4]"
                  />
                  <span className="ml-3 text-sm text-gray-700">Virtual</span>
                </label>
              </div>
            </div>

            <div className="relative">
              <Label htmlFor="patient-search" className="text-sm font-medium mb-2 block text-gray-900">
                Paciente
              </Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="patient-search"
                  type="text"
                  placeholder="Buscar paciente por nombre, email o DNI..."
                  value={patientSearchQuery}
                  onChange={(e) => setPatientSearchQuery(e.target.value)}
                  className="pl-10"
                />
                {searchingPatients && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
                  </div>
                )}
              </div>

              {/* Resultados de búsqueda */}
              {showPatientResults && patients.length > 0 && (
                <div className="absolute top-full left-0 right-0 z-10 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  {patients.map((patient) => (
                    <button
                      key={patient.id}
                      type="button"
                      onClick={() => handlePatientSelect(patient)}
                      className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <User className="h-4 w-4 text-gray-400" />
                        <div>
                          <p className="font-medium text-gray-900">{patient.name}</p>
                          <p className="text-sm text-gray-500">{patient.email}</p>
                          {patient.dni && (
                            <p className="text-xs text-gray-400">DNI: {patient.dni}</p>
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* Paciente seleccionado */}
              {selectedPatient && (
                <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-2 text-green-700">
                    <User className="h-4 w-4" />
                    <span className="font-medium">{selectedPatient.name}</span>
                  </div>
                  <p className="text-sm text-green-600 mt-1">{selectedPatient.email}</p>
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="reason" className="text-sm font-medium mb-2 block text-gray-900">
                Motivo de la visita
              </Label>
              <Textarea
                id="reason"
                rows={4}
                placeholder="Ingrese el motivo de la visita..."
                value={appointmentReason}
                onChange={(e) => setAppointmentReason(e.target.value)}
                className="resize-none"
              />
            </div>

            <div className="mt-auto">
              <Button
                type="submit"
                disabled={creatingAppointment || loadingSlots || !calendarReady}
                className="w-full h-12 bg-green-600 hover:bg-green-700 text-white font-bold text-sm transition-colors"
              >
                {creatingAppointment ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creando cita...
                  </>
                ) : (
                  <>
                    <Calendar className="mr-2 h-4 w-4" />
                    Agendar cita
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default DoctorAgenda;