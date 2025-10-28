import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { 
  addMonths, 
  format, 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval, 
  isSameMonth, 
  isSameDay, 
  isToday 
} from "date-fns";
import { es } from "date-fns/locale";
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Video,
  CheckCircle2,
  User,
  Stethoscope
} from "lucide-react";

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  avatar: string;
}

const DOCTORS: Doctor[] = [
  { id: '1', name: 'Dr. Juan Pérez', specialty: 'Cardiología', avatar: '👨‍⚕️' },
  { id: '2', name: 'Dra. Ana García', specialty: 'Dermatología', avatar: '👩‍⚕️' },
  { id: '3', name: 'Dr. Carlos López', specialty: 'Ortopedia', avatar: '👨‍⚕️' },
  { id: '4', name: 'Dra. María Rodríguez', specialty: 'Pediatría', avatar: '👩‍⚕️' },
];

const SPECIALTIES = [
  'Cardiología',
  'Dermatología',
  'Ortopedia',
  'Pediatría',
  'Oftalmología',
  'Ginecología',
  'Neurología'
];

const AgendarCita = () => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [appointmentType, setAppointmentType] = useState<"presencial" | "virtual">("presencial");
    const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
    const [selectedSpecialty, setSelectedSpecialty] = useState<string>('');
    const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
    
    // Generar días del mes actual
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
    
    // Días de la semana
    const weekDays = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];
    
    // Días con citas disponibles (ejemplo)
    const availableDays = [5, 6, 7, 10, 12, 15, 18, 20, 25];
    
    // Cambiar de mes
    const prevMonth = () => setCurrentMonth(prev => addMonths(prev, -1));
    const nextMonth = () => setCurrentMonth(prev => addMonths(prev, 1));
    
    // Verificar si un día está disponible
    const isDayAvailable = (day: Date) => {
        return availableDays.includes(day.getDate());
    };
    
    // Manejar selección de fecha
    const handleDateSelect = (day: Date) => {
        if (isDayAvailable(day)) {
            setSelectedDate(day);
            setSelectedTime(null);
        }
    };
    
    // Generar slots de tiempo
    const timeSlots = {
        morning: ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30'],
        afternoon: ['14:00', '14:30', '15:00', '15:30', '16:00', '16:30']
    };

    // Filtrar doctores según especialidad seleccionada
    useEffect(() => {
        if (selectedSpecialty) {
            const filtered = DOCTORS.filter(doctor => 
                doctor.specialty === selectedSpecialty
            );
            setFilteredDoctors(filtered);
            setSelectedDoctor(null);
        } else {
            setFilteredDoctors([]);
            setSelectedDoctor(null);
        }
    }, [selectedSpecialty]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedDate && selectedTime && selectedDoctor) {
            console.log({
                date: selectedDate,
                time: selectedTime,
                type: appointmentType,
                doctor: selectedDoctor,
                specialty: selectedSpecialty
            });
            // Aquí iría la lógica para enviar la cita
            alert('¡Cita agendada exitosamente!');
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-blue-700 flex items-center gap-2">
                    <CalendarIcon className="h-8 w-8" />
                    Programar una Cita
                </h1>
            </header>
            
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Selección de Especialidad y Médico */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-blue-50 p-6 rounded-xl">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-blue-800 flex items-center gap-2">
                            <Stethoscope className="h-4 w-4" />
                            Especialidad
                        </label>
                        <select
                            value={selectedSpecialty}
                            onChange={(e) => setSelectedSpecialty(e.target.value)}
                            className="w-full p-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                        >
                            <option value="">Seleccione una especialidad</option>
                            {SPECIALTIES.map((specialty) => (
                                <option key={specialty} value={specialty}>
                                    {specialty}
                                </option>
                            ))}
                        </select>
                    </div>
                    
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-blue-800 flex items-center gap-2">
                            <User className="h-4 w-4" />
                            Médico
                        </label>
                        <select
                            value={selectedDoctor?.id || ''}
                            onChange={(e) => {
                                const doctor = filteredDoctors.find(d => d.id === e.target.value);
                                setSelectedDoctor(doctor || null);
                            }}
                            disabled={!selectedSpecialty}
                            className="w-full p-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white disabled:opacity-50"
                        >
                            <option value="">Seleccione un médico</option>
                            {filteredDoctors.map((doctor) => (
                                <option key={doctor.id} value={doctor.id}>
                                    {doctor.name} - {doctor.specialty}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Calendario */}
                    <div className="bg-white p-6 rounded-xl shadow border border-blue-100">
                        <div className="flex items-center justify-between mb-4">
                            <button 
                                type="button"
                                onClick={prevMonth}
                                className="p-2 rounded-full hover:bg-blue-50 text-blue-600"
                            >
                                <ChevronLeft className="h-5 w-5" />
                            </button>
                            <h2 className="text-lg font-semibold text-blue-800">
                                {format(currentMonth, 'MMMM yyyy', { locale: es })}
                            </h2>
                            <button 
                                type="button"
                                onClick={nextMonth}
                                className="p-2 rounded-full hover:bg-blue-50 text-blue-600"
                            >
                                <ChevronRight className="h-5 w-5" />
                            </button>
                        </div>
                        
                        <div className="grid grid-cols-7 gap-2 text-center">
                            {weekDays.map((day, i) => (
                                <div key={i} className="text-sm font-medium text-blue-600 py-2">
                                    {day}
                                </div>
                            ))}
                            
                            {Array.from({ length: monthStart.getDay() }).map((_, i) => (
                                <div key={`empty-${i}`} className="h-10" />
                            ))}
                            
                            {daysInMonth.map((day) => {
                                const isAvailable = isDayAvailable(day);
                                const isSelected = selectedDate ? isSameDay(day, selectedDate) : false;
                                const isCurrentDay = isToday(day);
                                
                                return (
                                    <button
                                        type="button"
                                        key={day.toString()}
                                        onClick={() => handleDateSelect(day)}
                                        disabled={!isAvailable}
                                        className={cn(
                                            "h-10 rounded-full text-sm transition-all flex items-center justify-center relative",
                                            isSelected 
                                                ? "bg-blue-600 text-white" 
                                                : isAvailable
                                                    ? "hover:bg-blue-100 hover:text-blue-800"
                                                    : "text-gray-400 opacity-50 cursor-not-allowed",
                                            isCurrentDay && !isSelected && "font-bold border-2 border-blue-500"
                                        )}
                                    >
                                        {format(day, 'd')}
                                        {isCurrentDay && !isSelected && (
                                            <span className="absolute bottom-1 h-1 w-1 rounded-full bg-blue-500" />
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                    
                    {/* Sección de horarios */}
                    <div className="space-y-6">
                        {selectedDate ? (
                            <div className="bg-white p-6 rounded-xl shadow border border-blue-100 space-y-6">
                                <h2 className="text-lg font-semibold text-blue-800 flex items-center gap-2">
                                    <Clock className="h-5 w-5" />
                                    Horarios disponibles para {format(selectedDate, 'd MMMM yyyy', { locale: es })}
                                </h2>
                                
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-sm font-medium text-blue-700 mb-2">Mañana</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {timeSlots.morning.map((time) => (
                                                <button
                                                    type="button"
                                                    key={time}
                                                    onClick={() => setSelectedTime(time)}
                                                    className={cn(
                                                        "px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-1 transition-colors",
                                                        selectedTime === time
                                                            ? "bg-blue-600 text-white"
                                                            : "bg-blue-100 text-blue-800 hover:bg-blue-200"
                                                    )}
                                                >
                                                    {selectedTime === time && <CheckCircle2 className="h-4 w-4" />}
                                                    {time}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <h3 className="text-sm font-medium text-blue-700 mb-2">Tarde</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {timeSlots.afternoon.map((time) => (
                                                <button
                                                    type="button"
                                                    key={time}
                                                    onClick={() => setSelectedTime(time)}
                                                    className={cn(
                                                        "px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-1 transition-colors",
                                                        selectedTime === time
                                                            ? "bg-blue-600 text-white"
                                                            : "bg-blue-100 text-blue-800 hover:bg-blue-200"
                                                    )}
                                                >
                                                    {selectedTime === time && <CheckCircle2 className="h-4 w-4" />}
                                                    {time}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-blue-50 border-2 border-dashed border-blue-200 rounded-xl p-8 text-center">
                                <Clock className="h-10 w-10 text-blue-400 mx-auto mb-2" />
                                <p className="text-blue-700">Selecciona una fecha para ver los horarios disponibles</p>
                            </div>
                        )}

                        {/* Tipo de cita */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-medium text-blue-800 flex items-center gap-2">
                                <Video className="h-4 w-4" />
                                Tipo de cita
                            </h3>
                            <div className="flex gap-4">
                                <button
                                    type="button"
                                    onClick={() => setAppointmentType("presencial")}
                                    className={cn(
                                        "flex-1 flex items-center justify-center gap-2 p-4 rounded-lg border-2 transition-colors",
                                        appointmentType === "presencial"
                                            ? "border-blue-600 bg-blue-50 text-blue-700"
                                            : "border-gray-200 hover:border-blue-300"
                                    )}
                                >
                                    <MapPin className="h-5 w-5" />
                                    <span>Presencial</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setAppointmentType("virtual")}
                                    className={cn(
                                        "flex-1 flex items-center justify-center gap-2 p-4 rounded-lg border-2 transition-colors",
                                        appointmentType === "virtual"
                                            ? "border-blue-600 bg-blue-50 text-blue-700"
                                            : "border-gray-200 hover:border-blue-300"
                                    )}
                                >
                                    <Video className="h-5 w-5" />
                                    <span>Virtual</span>
                                </button>
                            </div>
                        </div>

                        {/* Resumen de la cita */}
                        {(selectedDate && selectedTime && selectedDoctor) && (
                            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                                <h3 className="font-medium text-blue-800 mb-2">Resumen de la cita</h3>
                                <div className="space-y-2 text-sm text-blue-700">
                                    <p><span className="font-medium">Médico:</span> {selectedDoctor.name}</p>
                                    <p><span className="font-medium">Especialidad:</span> {selectedDoctor.specialty}</p>
                                    <p><span className="font-medium">Fecha:</span> {format(selectedDate, 'EEEE d MMMM yyyy', { locale: es })}</p>
                                    <p><span className="font-medium">Hora:</span> {selectedTime}</p>
                                    <p><span className="font-medium">Tipo:</span> {appointmentType === 'presencial' ? 'Presencial' : 'Virtual'}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Botón de confirmación */}
                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={!selectedDate || !selectedTime || !selectedDoctor}
                        className={cn(
                            "w-full py-3 px-6 rounded-lg font-medium text-white transition-colors",
                            selectedDate && selectedTime && selectedDoctor
                                ? "bg-blue-600 hover:bg-blue-700"
                                : "bg-blue-300 cursor-not-allowed"
                        )}
                    >
                        Confirmar Cita
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AgendarCita;