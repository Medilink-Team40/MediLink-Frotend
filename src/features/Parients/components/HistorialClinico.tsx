import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { FileText, Calendar, Stethoscope, Pill, Activity, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const HistorialClinico = () => {
  // Datos de ejemplo
  const historial = [
    {
      id: 1,
      fecha: "15/10/2023",
      tipo: "Consulta General",
      medico: "Dra. Ana López",
      diagnostico: "Hipertensión arterial",
      tratamiento: "Control de presión arterial",
      notas: "Se recomienda dieta baja en sodio y ejercicio regular"
    },
    {
      id: 2,
      fecha: "01/10/2023",
      tipo: "Examen de Laboratorio",
      medico: "Dr. Carlos Méndez",
      diagnostico: "Perfil lipídico",
      tratamiento: "Análisis de sangre",
      notas: "Resultados dentro de los rangos normales"
    },
    {
      id: 3,
      fecha: "20/09/2023",
      tipo: "Control de rutina",
      medico: "Dra. Sofía Ramírez",
      diagnostico: "Chequeo general",
      tratamiento: "Ninguno",
      notas: "Paciente en buen estado de salud"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Historial Clínico</h2>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Descargar PDF
        </Button>
      </div>

      <div className="space-y-4">
        {historial.map((registro) => (
          <Card key={registro.id} className="overflow-hidden">
            <CardHeader className="bg-gray-50 px-6 py-4 border-b">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <FileText className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">{registro.tipo}</h3>
                    <p className="text-sm text-gray-500">
                      {registro.fecha} • {registro.medico}
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  Ver detalles
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <Stethoscope className="h-4 w-4 mr-2 text-gray-500" />
                    <div>
                      <p className="text-gray-500">Diagnóstico</p>
                      <p className="font-medium">{registro.diagnostico}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <Pill className="h-4 w-4 mr-2 text-gray-500" />
                    <div>
                      <p className="text-gray-500">Tratamiento</p>
                      <p className="font-medium">{registro.tratamiento}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-start text-sm">
                    <Activity className="h-4 w-4 mr-2 text-gray-500 mt-0.5" />
                    <div>
                      <p className="text-gray-500">Notas</p>
                      <p className="font-medium">{registro.notas}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Sección de documentos */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Documentos Adjuntos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { name: "Examen de sangre.pdf", date: "15/10/2023", size: "2.4 MB" },
              { name: "Radiografía de tórax.pdf", date: "01/10/2023", size: "1.8 MB" },
              { name: "Receta médica.pdf", date: "20/09/2023", size: "0.8 MB" }
            ].map((doc, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center space-x-3">
                  <FileText className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="font-medium">{doc.name}</p>
                    <p className="text-sm text-gray-500">
                      {doc.date} • {doc.size}
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HistorialClinico;