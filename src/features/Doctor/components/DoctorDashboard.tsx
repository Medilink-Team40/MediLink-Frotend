import { useEffect, useState } from "react";
import { VideoIcon } from "lucide-react";

// Interfaces
interface Cita {
  hora: string;
  paciente: string;
  tipo: string;
  estado: 'Confirmada' | 'Pendiente';
}

interface Paciente {
  nombre: string;
  edad: number;
  ultimaVisita: string;
  diagnostico: string;
}

const DoctorDashboard = () => {
  // Estados
  const [citasHoy, setCitasHoy] = useState<Cita[]>([]);
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [cargando, setCargando] = useState(true);

  // Efecto para cargar los datos al montar el componente
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        // Simulación de carga de datos
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Datos de citas de hoy
        const citasEjemplo: Cita[] = [
          { hora: "09:00", paciente: "Liam Harper", tipo: "Chequeo", estado: "Confirmada" },
          { hora: "10:30", paciente: "Olivia Bennett", tipo: "Consulta", estado: "Confirmada" },
          { hora: "11:45", paciente: "Noah Thompson", tipo: "Seguimiento", estado: "Confirmada" },
          { hora: "13:30", paciente: "Ava Mitchell", tipo: "Emergencia", estado: "Pendiente" },
          { hora: "15:00", paciente: "Ethan Clark", tipo: "Rutina", estado: "Confirmada" }
        ];

        // Datos de pacientes
        const pacientesEjemplo: Paciente[] = [
          { nombre: "Liam Harper", edad: 35, ultimaVisita: "Hace 2 meses", diagnostico: "Hipertensión" },
          { nombre: "Olivia Bennett", edad: 42, ultimaVisita: "Hace 1 mes", diagnostico: "Arritmia" },
          { nombre: "Noah Thompson", edad: 60, ultimaVisita: "Hace 3 meses", diagnostico: "Insuficiencia cardíaca" }
        ];

        setCitasHoy(citasEjemplo);
        setPacientes(pacientesEjemplo);
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      } finally {
        setCargando(false);
      }
    };

    cargarDatos();
  }, []);

  // Mostrar indicador de carga mientras se cargan los datos
  if (cargando) {
    return  <div className="flex justify-center p-8">Cargando datos del doctor...</div>;
  }

  return (
    <div className="w-full p-6 space-y-6">
      {/* Citas de hoy */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Citas de hoy</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="px-6 py-3">Hora</th>
                <th className="px-6 py-3">Paciente</th>
                <th className="px-6 py-3">Tipo</th>
                <th className="px-6 py-3">Estado</th>
                <th className="px-6 py-3">Acción</th>
              </tr>
            </thead>
            <tbody>
              {citasHoy.map((cita, idx) => (
                <tr key={idx} className="bg-white border-b">
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{cita.hora}</td>
                  <td className="px-6 py-4">{cita.paciente}</td>
                  <td className="px-6 py-4">{cita.tipo}</td>
                  <td className="px-6 py-4">
                    {cita.estado === 'Confirmada' ? (
                      <span className="px-2 py-1 text-xs font-medium text-green-800 bg-green-100 rounded-full">Confirmada</span>
                    ) : (
                      <span className="px-2 py-1 text-xs font-medium text-red-800 bg-red-100 rounded-full">Pendiente</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-semibold text-white bg-[#1193d4] rounded-lg hover:bg-[#0f82c1] transition-colors">
                      <VideoIcon className="w-4 h-4" />
                      <span>Iniciar llamada</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Registros de pacientes */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Registros de pacientes</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="px-6 py-3">Paciente</th>
                <th className="px-6 py-3">Edad</th>
                <th className="px-6 py-3">Última visita</th>
                <th className="px-6 py-3">Diagnóstico</th>
                <th className="px-6 py-3">Acción</th>
              </tr>
            </thead>
            <tbody>
              {pacientes.map((p, idx) => (
                <tr key={idx} className="bg-white border-b">
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{p.nombre}</td>
                  <td className="px-6 py-4">{p.edad}</td>
                  <td className="px-6 py-4">{p.ultimaVisita}</td>
                  <td className="px-6 py-4">{p.diagnostico}</td>
                  <td className="px-6 py-4">
                    <a className="font-medium text-white bg-[#1193d4] px-3 py-1.5 rounded-lg hover:bg-[#0f82c1] transition-colors" href="#">Ver ficha</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;