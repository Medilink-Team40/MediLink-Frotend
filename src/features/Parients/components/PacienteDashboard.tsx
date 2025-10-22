import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Stethoscope,
  FileText,
  User,
  Clock,
  ChevronRight,
  Plus,
  Bell,
  FileSearch,
  HeartPulse,
  Video
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContenxt";
import { cn } from "@/lib/utils";

interface DashboardAction {
  id: string;
  label: string;
  icon: React.ReactNode;
  path: string;
  description: string;
  color: string;
  hoverColor: string;
}

export const PacienteDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const actions: DashboardAction[] = [
    {
      id: "agendar-cita",
      label: "Agendar Cita",
      icon: <Plus className="h-6 w-6" />,
      path: "/agendar-cita",
      description: "Solicita una cita con nuestros especialistas",
      color: "bg-blue-50 text-blue-600",
      hoverColor: "hover:bg-blue-100"
    },
    {
      id: "mis-citas",
      label: "Mis Citas",
      icon: <Calendar className="h-6 w-6" />,
      path: "/citas",
      description: "Revisa y gestiona tus citas programadas",
      color: "bg-emerald-50 text-emerald-600",
      hoverColor: "hover:bg-emerald-100"
    },
    {
      id: "historial",
      label: "Historial Clínico",
      icon: <FileText className="h-6 w-6" />,
      path: "/historial-clinico",
      description: "Accede a tu historial médico completo",
      color: "bg-purple-50 text-purple-600",
      hoverColor: "hover:bg-purple-100"
    },
    {
      id: "recetas",
      label: "Recetas Médicas",
      icon: <FileText className="h-6 w-6" />,
      path: "/recetas",
      description: "Consulta tus recetas y medicamentos",
      color: "bg-amber-50 text-amber-600",
      hoverColor: "hover:bg-amber-100"
    },
    {
      id: "doctores",
      label: "Médicos",
      icon: <Stethoscope className="h-6 w-6" />,
      path: "/doctores",
      description: "Conoce a nuestro equipo médico",
      color: "bg-cyan-50 text-cyan-600",
      hoverColor: "hover:bg-cyan-100"
    },
    {
      id: "perfil",
      label: "Mi Perfil",
      icon: <User className="h-6 w-6" />,
      path: "/perfil",
      description: "Gestiona tu información personal",
      color: "bg-rose-50 text-rose-600",
      hoverColor: "hover:bg-rose-100"
    }
  ];

  // Próxima cita (datos de ejemplo)
  const nextAppointment = {
    date: "Marte, 22 de Agosto",
    time: "10:30 AM",
    doctor: "Dra. Ana López",
    specialty: "Cardiología",
    type: "Presencial"
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* Bienvenida */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            Hola, {user?.nombre || "Paciente"}
          </h1>
          <p className="text-muted-foreground">
            Bienvenido a tu portal de salud
          </p>
        </div>
        <Button variant="outline" className="gap-2">
          <Bell className="h-4 w-4" />
          Notificaciones
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tarjeta de próxima cita */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Clock className="h-5 w-5 text-primary" />
                Próxima cita
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                className="text-primary"
                onClick={() => navigate("/citas")}
              >
                Ver todas
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {nextAppointment ? (
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Calendar className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">{nextAppointment.doctor}</h3>
                    <p className="text-sm text-muted-foreground">
                      {nextAppointment.specialty}
                    </p>
                    <div className="mt-2 flex items-center gap-4 text-sm">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        {nextAppointment.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        {nextAppointment.time}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" className="gap-2">
                    <Video className="h-4 w-4" />
                    Unirse a videollamada
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2">
                    <FileSearch className="h-4 w-4" />
                    Ver detalles
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-6">
                <Calendar className="mx-auto h-10 w-10 text-muted-foreground mb-2" />
                <p className="text-muted-foreground mb-4">
                  No tienes citas programadas
                </p>
                <Button onClick={() => navigate("/agendar-cita")}>
                  Agendar cita
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Estado de salud */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <HeartPulse className="h-5 w-5 text-rose-500" />
              Estado de salud
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Última actualización</span>
                <span className="font-medium">Hoy</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
                  style={{ width: '100%' }}
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Tu salud está en buen estado. Próximo chequeo en 2 meses.
              </p>
            </div>
            <Button variant="outline" className="w-full">
              Ver informe completo
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Acciones rápidas */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Servicios</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {actions.map((action) => (
            <button
              key={action.id}
              onClick={() => navigate(action.path)}
              className={cn(
                "flex items-start p-4 rounded-xl border transition-all hover:shadow-md",
                action.hoverColor
              )}
            >
              <div className={cn("p-3 rounded-lg mr-4", action.color)}>
                {action.icon}
              </div>
              <div className="text-left">
                <h3 className="font-medium text-foreground">{action.label}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {action.description}
                </p>
              </div>
              <ChevronRight className="ml-auto h-5 w-5 text-muted-foreground mt-1" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};


export default PacienteDashboard