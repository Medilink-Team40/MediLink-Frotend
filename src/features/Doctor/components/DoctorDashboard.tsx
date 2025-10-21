// Importación de componentes necesarios
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/config/AuthProvider";
import { useEffect, useState } from "react";
import { Calendar1Icon  } from "lucide-react";

// Interfaz para el tipo de cita
interface Cita {
  id: number;
  paciente: string;
  fecha: string;
  hora: string;
  tipo: string;
}

const DoctorDashboard = () => {
  // Obtener información del usuario autenticado
  const { user } = useAuth();
  
  // Estado para almacenar las citas del día
  const [citasHoy, setCitasHoy] = useState<Cita[]>([]);
  const [cargando, setCargando] = useState(true);

  // Efecto para cargar las citas del día al montar el componente
  useEffect(() => {
    const cargarCitasDelDia = async () => {
      try {
        // Simulación de carga de datos
        // En una aplicación real, aquí iría una llamada a la API
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Datos de ejemplo
        const citasEjemplo: Cita[] = [
          { id: 1, paciente: "María González", fecha: "2023-10-21", hora: "09:00", tipo: "Consulta" },
          { id: 2, paciente: "Carlos López", fecha: "2023-10-21", hora: "10:30", tipo: "Control" }
        ];
        
        setCitasHoy(citasEjemplo);
      } catch (error) {
        console.error("Error al cargar las citas:", error);
      } finally {
        setCargando(false);
      }
    };

    cargarCitasDelDia();
  }, []);

  // Mostrar indicador de carga mientras se cargan los datos
  if (cargando) {
    return <div className="flex justify-center p-8">Cargando datos del doctor...</div>;
  }

  return (
    <div className="p-6">
      {/* Título del dashboard */}
      <h1 className="text-2xl font-bold mb-6">Panel del Doctor</h1>
      
      {/* Sección de resumen */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Tarjeta de citas del día */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Citas Hoy</CardTitle>
            <Calendar1Icon className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{citasHoy.length}</div>
            <p className="text-xs text-gray-500">Citas programadas para hoy</p>
          </CardContent>
        </Card>

        {/* Otras tarjetas de resumen pueden ir aquí */}
      </div>

      {/* Lista de próximas citas */}
      <Card>
        <CardHeader>
          <CardTitle>Próximas Citas</CardTitle>
        </CardHeader>
        <CardContent>
          {citasHoy.length > 0 ? (
            <div className="space-y-4">
              {citasHoy.map((cita) => (
                <div key={cita.id} className="border-b pb-2 last:border-b-0">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{cita.paciente}</p>
                      <p className="text-sm text-gray-500">{cita.tipo}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{cita.hora}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No hay citas programadas para hoy</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DoctorDashboard;