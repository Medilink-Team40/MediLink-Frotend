import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card.tsx";
import { Calendar, Clock, MapPin, User, Search, X, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";

// Tipos de datos
interface Cita {
  id: number;
  doctor: string;
  especialidad: string;
  fecha: string;
  hora: string;
  direccion: string;
  estado: "Confirmada" | "Pendiente" | "Cancelada" | "Completada";
  tipo: "Presencial" | "Virtual";
  color: string;
  motivo?: string;
  notas?: string;
}

// Datos de ejemplo para las citas
const citasEjemplo: Cita[] = [
  {
    id: 1,
    doctor: "Dr. Juan Pérez",
    especialidad: "Cardiólogo",
    fecha: "15 Oct 2023",
    hora: "09:00 AM",
    direccion: "Clínica Central, Piso 3, Consultorio 302",
    estado: "Confirmada",
    tipo: "Presencial",
    color: "bg-green-100 text-green-800",
    motivo: "Control de presión arterial",
    notas: "Traer estudios previos"
  },
  {
    id: 2,
    doctor: "Dra. Ana López",
    especialidad: "Dermatóloga",
    fecha: "17 Oct 2023",
    hora: "02:30 PM",
    direccion: "En línea - Video consulta",
    estado: "Pendiente",
    tipo: "Virtual",
    color: "bg-yellow-100 text-yellow-800",
    motivo: "Revisión de lunar",
    notas: "Tomar fotos del área a revisar"
  },
  {
    id: 3,
    doctor: "Dr. Carlos Ruiz",
    especialidad: "Ortopedista",
    fecha: "20 Oct 2023",
    hora: "11:15 AM",
    direccion: "Centro Médico Norte, Piso 1, Consultorio 105",
    estado: "Cancelada",
    tipo: "Presencial",
    color: "bg-red-100 text-red-800",
    motivo: "Dolor de rodilla",
    notas: "Cancelada por el paciente"
  },
  {
    id: 4,
    doctor: "Dra. Laura Méndez",
    especialidad: "Oftalmóloga",
    fecha: "22 Oct 2023",
    hora: "04:00 PM",
    direccion: "Clínica Oftalmológica, Consultorio 204",
    estado: "Completada",
    tipo: "Presencial",
    color: "bg-blue-100 text-blue-800",
    motivo: "Examen de la vista",
    notas: "Receta actualizada"
  }
];

export const PacienteMisCitas = () => {

  const [citas, setCitas] = useState<Cita[]>(citasEjemplo);
  const [filtroEstado, setFiltroEstado] = useState<string>("Todas");
  const [filtroTipo, setFiltroTipo] = useState<string>("Todas");
  const [busqueda, setBusqueda] = useState<string>("");
  const [citasFiltradas, setCitasFiltradas] = useState<Cita[]>(citasEjemplo);
  const [cargando, setCargando] = useState<boolean>(false);
  const [mostrarModal, setMostrarModal] = useState<boolean>(false);
  const [citaSeleccionada, setCitaSeleccionada] = useState<Cita | null>(null);
  const [cancelando, setCancelando] = useState<boolean>(false);

  // Filtrar citas según los filtros y búsqueda
  useEffect(() => {
    setCargando(true);

    const timer = setTimeout(() => {
      let resultado = [...citas];

      // Filtrar por estado
      if (filtroEstado !== "Todas") {
        resultado = resultado.filter(cita => cita.estado === filtroEstado);
      }

      // Filtrar por tipo
      if (filtroTipo !== "Todas") {
        resultado = resultado.filter(cita => cita.tipo === filtroTipo);
      }

      // Filtrar por búsqueda
      if (busqueda.trim() !== "") {
        const termino = busqueda.toLowerCase();
        resultado = resultado.filter(cita =>
          cita.doctor.toLowerCase().includes(termino) ||
          cita.especialidad.toLowerCase().includes(termino) ||
          cita.motivo?.toLowerCase().includes(termino) ||
          cita.notas?.toLowerCase().includes(termino)
        );
      }

      setCitasFiltradas(resultado);
      setCargando(false);
    }, 300); // Pequeño retraso para simular carga

    return () => clearTimeout(timer);
  }, [citas, filtroEstado, filtroTipo, busqueda]);

  // Manejar cancelación de cita
  const handleCancelarCita = async () => {
    if (!citaSeleccionada) return;

    setCancelando(true);

    try {
      // Simular llamada a API
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Actualizar estado local
      const citasActualizadas = citas.map(cita =>
        cita.id === citaSeleccionada.id
          ? { ...cita, estado: "Cancelada" as const, color: "bg-red-100 text-red-800" }
          : cita
      );

      setCitas(citasActualizadas);
      setMostrarModal(false);
      setCitaSeleccionada(null);

      toast.success("Cita cancelada", {
        description: "La cita ha sido cancelada exitosamente."
      });
    } catch (error) {
      toast.error("Error al cancelar la cita", {
        description: "No se pudo cancelar la cita. Por favor, inténtalo de nuevo."
      });
    } finally {
      setCancelando(false);
    }
  };

  // Manejar ver detalles de la cita
  const handleVerDetalles = (cita: Cita) => {
    setCitaSeleccionada(cita);
    setMostrarModal(true);
  };

  // Formatear fecha en español
  const formatearFecha = (fechaStr: string) => {
    const opciones: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    const fecha = new Date(fechaStr);
    return fecha.toLocaleDateString('es-ES', opciones);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <motion.h1
          className="text-2xl font-bold text-gray-800"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Mis Citas
        </motion.h1>
        <motion.div
          className="relative w-full md:w-96"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Buscar por doctor, especialidad o motivo..."
            className="pl-10 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
          {busqueda && (
            <button
              onClick={() => setBusqueda("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Filtros */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Card className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg text-blue-800">Filtros</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-medium mb-3 text-gray-700">Estado</h3>
                <div className="space-y-3">
                  {["Todas", "Confirmada", "Pendiente", "Cancelada", "Completada"].map((estado) => (
                    <motion.div
                      key={estado}
                      className="flex items-center space-x-3 group"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <input
                        type="radio"
                        id={`estado-${estado}`}
                        name="estado"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 cursor-pointer border-gray-300"
                        checked={filtroEstado === estado}
                        onChange={() => setFiltroEstado(estado)}
                      />
                      <label
                        htmlFor={`estado-${estado}`}
                        className="text-sm text-gray-600 cursor-pointer group-hover:text-blue-600 transition-colors"
                      >
                        {estado}
                      </label>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3 text-gray-700">Tipo de Cita</h3>
                <div className="space-y-3">
                  {["Todas", "Presencial", "Virtual"].map((tipo) => (
                    <motion.div
                      key={tipo}
                      className="flex items-center space-x-3 group"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <input
                        type="radio"
                        id={`tipo-${tipo}`}
                        name="tipo"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 cursor-pointer border-gray-300"
                        checked={filtroTipo === tipo}
                        onChange={() => setFiltroTipo(tipo)}
                      />
                      <label
                        htmlFor={`tipo-${tipo}`}
                        className="text-sm text-gray-600 cursor-pointer group-hover:text-blue-600 transition-colors"
                      >
                        {tipo}
                      </label>
                    </motion.div>
                  ))}
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full mt-4"
                onClick={() => {
                  setFiltroEstado("Todas");
                  setFiltroTipo("Todas");
                  setBusqueda("");
                }}
              >
                Limpiar filtros
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Lista de Citas */}
        <motion.div
          className="md:col-span-2 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          {cargando ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            </div>
          ) : citasFiltradas.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg border border-dashed border-gray-200">
              <Search className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900">No se encontraron citas</h3>
              <p className="mt-1 text-sm text-gray-500">
                {busqueda
                  ? "No hay citas que coincidan con tu búsqueda."
                  : "No tienes citas programadas con los filtros actuales."}
              </p>
              {busqueda && (
                <Button
                  variant="ghost"
                  className="mt-4"
                  onClick={() => setBusqueda("")}
                >
                  Limpiar búsqueda
                </Button>
              )}
            </div>
          ) : (
            <AnimatePresence>
              {citasFiltradas.map((cita, index) => (
                <motion.div
                  key={cita.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20, height: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  layout
                >
                  <Card className="overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300 hover:border-blue-100">
                    <div className="p-6">
                      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3">
                            <div className="p-2 bg-blue-50 rounded-full hover:bg-blue-100 transition-colors">
                              <User className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-lg text-gray-800">{cita.doctor}</h3>
                              <p className="text-sm text-gray-600">{cita.especialidad}</p>
                            </div>
                          </div>

                          <div className="mt-4 space-y-2 pl-11">
                            <div className="flex items-center text-sm text-gray-600">
                              <Calendar className="h-4 w-4 mr-2 text-blue-400" />
                              <span>{cita.fecha}</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                              <Clock className="h-4 w-4 mr-2 text-blue-400" />
                              <span>{cita.hora}</span>
                            </div>
                            <div className="flex items-start text-sm text-gray-600">
                              <MapPin className="h-4 w-4 mr-2 mt-0.5 text-blue-400 flex-shrink-0" />
                              <span>{cita.direccion}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col items-end space-y-3 w-full sm:w-auto mt-4 sm:mt-0">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${cita.color} inline-block`}>
                            {cita.estado}
                          </span>
                          <span className="text-sm text-gray-500 bg-gray-50 px-2 py-1 rounded">
                            {cita.tipo}
                          </span>

                          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto mt-2">
                            <motion.div
                              whileHover={{ scale: 1.03 }}
                              whileTap={{ scale: 0.98 }}
                              className="w-full sm:w-auto"
                            >
                              <Button
                                variant="outline"
                                size="sm"
                                className="w-full justify-center sm:w-auto group relative overflow-hidden"
                                onClick={() => handleVerDetalles(cita)}
                              >
                                <span className="relative z-10 flex items-center gap-1">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                  </svg>
                                  Detalles
                                </span>
                                <span className="absolute inset-0 bg-blue-50 group-hover:bg-blue-100 transition-colors duration-200"></span>
                              </Button>
                            </motion.div>

                            {cita.estado === "Pendiente" && (
                              <motion.div
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full sm:w-auto"
                              >
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  className="w-full justify-center sm:w-auto group relative overflow-hidden"
                                  onClick={() => {
                                    setCitaSeleccionada(cita);
                                    setMostrarModal(true);
                                  }}
                                >
                                  <span className="relative z-10 flex items-center gap-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    Cancelar
                                  </span>
                                  <span className="absolute inset-0 bg-red-50 group-hover:bg-red-100 transition-colors duration-200"></span>
                                </Button>
                              </motion.div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </motion.div>
      </div>

      {/* Modal de detalles/cancelación */}
      <Dialog open={mostrarModal} onOpenChange={setMostrarModal}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-xl">
              {citaSeleccionada?.estado === "Pendiente" ? "Cancelar Cita" : "Detalles de la Cita"}
            </DialogTitle>
            <DialogDescription>
              {citaSeleccionada?.estado === "Pendiente"
                ? "¿Estás seguro de que deseas cancelar esta cita?"
                : "Información detallada de tu cita."}
            </DialogDescription>
          </DialogHeader>

          {citaSeleccionada && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <h4 className="font-medium text-gray-900">Información de la cita</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <p><span className="font-medium">Doctor:</span> {citaSeleccionada.doctor}</p>
                  <p><span className="font-medium">Especialidad:</span> {citaSeleccionada.especialidad}</p>
                  <p><span className="font-medium">Fecha:</span> {formatearFecha(citaSeleccionada.fecha)}</p>
                  <p><span className="font-medium">Hora:</span> {citaSeleccionada.hora}</p>
                  <p><span className="font-medium">Tipo:</span> {citaSeleccionada.tipo}</p>
                  <p><span className="font-medium">Estado:</span> {citaSeleccionada.estado}</p>
                  {citaSeleccionada.motivo && (
                    <p><span className="font-medium">Motivo:</span> {citaSeleccionada.motivo}</p>
                  )}
                  {citaSeleccionada.notas && (
                    <p><span className="font-medium">Notas:</span> {citaSeleccionada.notas}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          <DialogFooter className="sm:justify-between">
            <Button
              variant="outline"
              onClick={() => {
                setMostrarModal(false);
                setCitaSeleccionada(null);
              }}
            >
              Cerrar
            </Button>

            {citaSeleccionada?.estado === "Pendiente" && (
              <Button
                variant="destructive"
                onClick={handleCancelarCita}
                disabled={cancelando}
              >
                {cancelando ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Cancelando...
                  </>
                ) : (
                  "Sí, cancelar cita"
                )}
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PacienteMisCitas;