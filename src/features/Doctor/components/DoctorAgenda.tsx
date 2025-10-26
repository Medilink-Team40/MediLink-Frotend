// src/features/Doctor/components/DoctorAgenda.tsx
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

const DoctorAgenda = () => {
  const [selectedDate, setSelectedDate] = useState(5);
  const [selectedTime, setSelectedTime] = useState('11:00'); // 24h
  const [appointmentType, setAppointmentType] = useState<'in-person' | 'virtual'>('in-person');
  const [currentMonth, setCurrentMonth] = useState(9); // Octubre = 9 (0-indexado)
  const [currentYear, setCurrentYear] = useState(2024);

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
      days.push({
        day,
        isCurrentMonth: true,
        hasAppointment: [3, 6, 11, 17, 22].includes(day) // Días con citas de ejemplo
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

  // Horarios en 24h
  const timeSlots = [
    { time: '09:00', available: true },
    { time: '09:30', available: true },
    { time: '10:00', available: false },
    { time: '10:30', available: true },
    { time: '11:00', available: true, selected: true },
    { time: '11:30', available: true },
    { time: '14:00', available: false },
    { time: '14:30', available: true },
    { time: '15:00', available: true },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica para agendar cita
    console.log('Cita agendada');
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
          <h2 className="text-xl font-bold tracking-tight mb-2 text-gray-900">
            Programar nueva cita
          </h2>
          <p className="text-gray-500 text-sm mb-4">
            Selecciona una fecha y un horario para agendar una nueva cita.
          </p>

          <div className="mb-6">
            <h3 className="text-base font-semibold mb-3 text-gray-900">
              Horarios disponibles para el {selectedDate} de {monthNames[currentMonth].toLowerCase()} de {currentYear}
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {timeSlots.map((slot) => (
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
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 flex-1">
            <div>
              <label className="text-sm font-medium mb-2 block text-gray-900">
                Tipo de cita
              </label>
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

            <div>
              <label htmlFor="patient-search" className="text-sm font-medium mb-2 block text-gray-900">
                Paciente
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  id="patient-search"
                  type="text"
                  placeholder="Buscar paciente..."
                  className="w-full h-12 pl-10 pr-4 rounded-lg border border-gray-300 bg-gray-50 focus:ring-[#1193d4] focus:border-[#1193d4] text-gray-900"
                />
              </div>
            </div>

            <div>
              <label htmlFor="reason" className="text-sm font-medium mb-2 block text-gray-900">
                Motivo de la visita
              </label>
              <textarea
                id="reason"
                rows={4}
                placeholder="Ingrese el motivo de la visita..."
                className="w-full p-3 rounded-lg border border-gray-300 bg-gray-50 focus:ring-[#1193d4] focus:border-[#1193d4] text-gray-900 resize-none"
              />
            </div>

            <div className="mt-auto">
              <Button type="submit" className="w-full h-12 bg-green-600 hover:bg-green-700 text-white font-bold text-sm transition-colors">
                Agendar cita
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default DoctorAgenda;