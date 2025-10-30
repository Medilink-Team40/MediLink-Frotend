import React from "react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {useState, useEffect} from "react";
import {Clock, Calendar, Plus, Save, Trash2, AlertCircle, CheckCircle2, Settings, Loader2} from "lucide-react";
import {availabilityService} from "@/service/AvailabilityService";
import {calendarService} from "@/service/calendarService";
import {useAuth} from "@/config/AuthProvider";
import {cn} from "@/lib/utils";
import {toast} from "sonner";

interface AvailabilityRule {
  id?: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
  title?: string;
  description?: string;
}

const DAYS_OF_WEEK = [
  { value: 1, label: 'Lunes' },
  { value: 2, label: 'Martes' },
  { value: 3, label: 'Miercoles' },
  { value: 4, label: 'Jueves' },
  { value: 5, label: 'Viernes' },
  { value: 6, label: 'Sabado' },
  { value: 0, label: 'Domingo' }
];

const DoctorHorarios = () => {
  const { user } = useAuth();
  const [rules, setRules] = useState<AvailabilityRule[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [calendarId, setCalendarId] = useState<string | null>(null);
  const [loadingCalendar, setLoadingCalendar] = useState(true);
  const [newRule, setNewRule] = useState<AvailabilityRule>({
    dayOfWeek: 1,
    startTime: "09:00",
    endTime: "17:30",
    isAvailable: true,
    title: "",
    description: ""
  });

  // Obtener el calendarId cuando el componente monta
  useEffect(() => {
    const initializeCalendar = async () => {
      if (!user?.id) {
        console.error('No hay usuario autenticado');
        setLoadingCalendar(false);
        return;
      }

      try {
        setLoadingCalendar(true);
        console.log('Obteniendo calendario para usuario:', user.id);

        const response = await calendarService.getOrCreateDoctorCalendar(user.id);

        if (response.error) {
          console.error('Error al obtener calendario:', response.error);
          toast.error('Error al cargar calendario');
          return;
        }

        if (response.data?.id) {
          console.log('Calendario obtenido:', response.data.id);
          setCalendarId(response.data.id);
        }
      } catch (error) {
        console.error('Error inesperado al obtener calendario:', error);
        toast.error('Error al inicializar');
      } finally {
        setLoadingCalendar(false);
      }
    };

    initializeCalendar();
  }, [user?.id]);

  // Cargar reglas cuando tengamos el calendarId
  useEffect(() => {
    if (calendarId) {
      loadAvailabilityRules();
    }
  }, [calendarId]);

  const loadAvailabilityRules = async () => {
    if (!calendarId) return;

    setIsLoading(true);
    try {
      const response = await availabilityService.getRulesByCalendar(calendarId);
      if (response.data) {
        console.log('Reglas cargadas:', response.data);
        setRules(response.data);
      }
    } catch (error) {
      console.error('Error al cargar reglas:', error);
      toast.error('Error al cargar horarios');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateRule = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!calendarId) {
      toast.error('No se ha inicializado el calendario');
      return;
    }

    if (newRule.startTime >= newRule.endTime) {
      toast.error('La hora de inicio debe ser anterior a la hora de fin');
      return;
    }

    setIsLoading(true);

    try {
      const ruleData = {
        calendarId,
        dayOfWeek: newRule.dayOfWeek,
        startTime: newRule.startTime,
        endTime: newRule.endTime,
        isAvailable: newRule.isAvailable,
        title: newRule.title || `Disponibilidad ${DAYS_OF_WEEK.find(d => d.value === newRule.dayOfWeek)?.label}`,
        description: newRule.description || `Horario disponible de ${newRule.startTime} a ${newRule.endTime}`
      };

      console.log('Creando regla:', ruleData);
      const response = await availabilityService.createRule(ruleData);

      if (response.error) {
        toast.error('Error al crear regla', {
          description: response.error.message
        });
        return;
      }

      if (response.data) {
        toast.success('Regla creada exitosamente');
        await loadAvailabilityRules();

        setNewRule({
          dayOfWeek: 1,
          startTime: "09:00",
          endTime: "17:30",
          isAvailable: true,
          title: "",
          description: ""
        });
      }
    } catch (error) {
      console.error('Error al crear regla:', error);
      toast.error('Error inesperado al crear regla');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteRule = async (ruleId: string) => {
    if (!ruleId || !confirm('Estas seguro de que quieres eliminar esta regla?')) return;

    setIsLoading(true);
    try {
      const response = await availabilityService.deleteRule(ruleId);

      if (response.error) {
        toast.error('Error al eliminar regla');
        return;
      }

      toast.success('Regla eliminada exitosamente');
      await loadAvailabilityRules();
    } catch (error) {
      console.error('Error al eliminar regla:', error);
      toast.error('Error inesperado al eliminar regla');
    } finally {
      setIsLoading(false);
    }
  };

  const getDayName = (dayOfWeek: number) => {
    return DAYS_OF_WEEK.find(d => d.value === dayOfWeek)?.label || 'Desconocido';
  };

  const createDefaultSchedule = async () => {
    if (!calendarId) {
      toast.error('No se ha inicializado el calendario');
      return;
    }

    setIsLoading(true);
    try {
      const workDays = [1, 2, 3, 4, 5];
      let successCount = 0;

      for (const dayOfWeek of workDays) {
        const ruleData = {
          calendarId,
          dayOfWeek,
          startTime: "09:00",
          endTime: "18:00",
          isAvailable: true,
          title: `Horario laboral ${getDayName(dayOfWeek)}`,
          description: `Disponibilidad estandar para ${getDayName(dayOfWeek)}`
        };

        const response = await availabilityService.createRule(ruleData);
        if (!response.error) {
          successCount++;
        }
      }

      if (successCount > 0) {
        toast.success(`${successCount} reglas creadas exitosamente`);
        await loadAvailabilityRules();
      }
    } catch (error) {
      console.error('Error al crear horario por defecto:', error);
      toast.error('Error al crear horario por defecto');
    } finally {
      setIsLoading(false);
    }
  };

  if (loadingCalendar) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        <span className="ml-2 text-gray-600">Inicializando calendario...</span>
      </div>
    );
  }

  if (!calendarId) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <p className="text-gray-600">No se pudo cargar el calendario</p>
          <Button onClick={() => window.location.reload()} className="mt-4">
            Reintentar
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-100 rounded-xl">
            <Settings className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Administrar Horarios
            </h1>
            <p className="text-gray-600">
              Configura tu disponibilidad para consultas medicas
            </p>
          </div>
        </div>

        {rules.length === 0 && (
          <Button
            onClick={createDefaultSchedule}
            disabled={isLoading}
            variant="outline"
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            Crear Horario por Defecto
          </Button>
        )}
      </div>

      <Card className="bg-white border shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <div className="p-2 bg-green-100 rounded-lg">
              <Plus className="h-4 w-4 text-green-600" />
            </div>
            Agregar Nueva Regla de Disponibilidad
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreateRule} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dayOfWeek" className="text-sm font-medium">
                  Dia de la semana
                </Label>
                <Select
                  value={newRule.dayOfWeek.toString()}
                  onValueChange={(value) => setNewRule({...newRule, dayOfWeek: parseInt(value)})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar dia" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-gray-200 shadow-lg">
                    {DAYS_OF_WEEK.map((day) => (
                      <SelectItem key={day.value} value={day.value.toString()}>
                        {day.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="startTime" className="text-sm font-medium">
                  Hora de inicio
                </Label>
                <Input
                  type="time"
                  id="startTime"
                  value={newRule.startTime}
                  onChange={(e) => setNewRule({...newRule, startTime: e.target.value})}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="endTime" className="text-sm font-medium">
                  Hora de fin
                </Label>
                <Input
                  type="time"
                  id="endTime"
                  value={newRule.endTime}
                  onChange={(e) => setNewRule({...newRule, endTime: e.target.value})}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="isAvailable" className="text-sm font-medium">
                  Estado
                </Label>
                <Select
                  value={newRule.isAvailable ? "available" : "unavailable"}
                  onValueChange={(value) => setNewRule({...newRule, isAvailable: value === "available"})}
                >
                  <SelectTrigger className="bg-white border border-gray-300 hover:border-gray-400 focus:border-blue-500">
                    <SelectValue placeholder="Seleccionar estado" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-gray-200 shadow-lg">
                    <SelectItem
                      value="available"
                      className="bg-white hover:bg-gray-100 focus:bg-gray-100 text-gray-900"
                    >
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        Disponible
                      </div>
                    </SelectItem>
                    <SelectItem
                      value="unavailable"
                      className="bg-white hover:bg-gray-100 focus:bg-gray-100 text-gray-900"
                    >
                      <div className="flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 text-red-600" />
                        No disponible
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-sm font-medium">
                  Titulo (opcional)
                </Label>
                <Input
                  id="title"
                  placeholder="Ej: Consultas matutinas"
                  value={newRule.title}
                  onChange={(e) => setNewRule({...newRule, title: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-medium">
                  Descripcion (opcional)
                </Label>
                <Input
                  id="description"
                  placeholder="Ej: Horario para consultas generales"
                  value={newRule.description}
                  onChange={(e) => setNewRule({...newRule, description: e.target.value})}
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="gap-2 bg-blue-600 hover:bg-blue-700"
            >
              <Save className="h-4 w-4" />
              {isLoading ? 'Guardando...' : 'Agregar Regla'}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="bg-white border shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Clock className="h-4 w-4 text-blue-600" />
            </div>
            Reglas de Disponibilidad Actuales
            {rules.length > 0 && (
              <span className="ml-2 px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                {rules.length} {rules.length === 1 ? 'regla' : 'reglas'}
              </span>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="flex flex-col items-center gap-3">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <p className="text-sm text-gray-600">Cargando reglas...</p>
              </div>
            </div>
          ) : rules.length === 0 ? (
            <div className="text-center py-12">
              <div className="flex flex-col items-center gap-4">
                <div className="p-4 bg-gray-100 rounded-full">
                  <Clock className="h-8 w-8 text-gray-400" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-medium text-gray-900">
                    No hay reglas configuradas
                  </h3>
                  <p className="text-gray-600 max-w-md">
                    Agrega tu primera regla de disponibilidad para que los pacientes
                    puedan agendar citas contigo
                  </p>
                </div>
                <Button
                  onClick={createDefaultSchedule}
                  disabled={isLoading}
                  variant="outline"
                  className="gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Crear Horario Estandar (Lun-Vie 9:00-18:00)
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {rules
                .sort((a, b) => a.dayOfWeek - b.dayOfWeek)
                .map((rule) => (
                  <div
                    key={rule.id || `${rule.dayOfWeek}-${rule.startTime}`}
                    className={cn(
                      "flex items-center justify-between p-4 rounded-xl border transition-all hover:shadow-md",
                      rule.isAvailable
                        ? "border-green-200 bg-green-50"
                        : "border-red-200 bg-red-50"
                    )}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <div className="flex items-center gap-2">
                          <div className={cn(
                            "w-3 h-3 rounded-full",
                            rule.isAvailable ? "bg-green-500" : "bg-red-500"
                          )} />
                          <span className="font-semibold text-lg text-gray-900">
                            {getDayName(rule.dayOfWeek)}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 text-gray-600">
                          <Clock className="h-4 w-4" />
                          <span className="font-medium">
                            {rule.startTime} - {rule.endTime}
                          </span>
                        </div>

                        <span className={cn(
                          "px-3 py-1 rounded-full text-xs font-medium",
                          rule.isAvailable
                            ? "bg-green-200 text-green-800"
                            : "bg-red-200 text-red-800"
                        )}>
                          {rule.isAvailable ? 'Disponible' : 'No disponible'}
                        </span>
                      </div>

                      {(rule.title || rule.description) && (
                        <div className="text-sm text-gray-600 space-y-1">
                          {rule.title && (
                            <div className="font-medium text-gray-700">{rule.title}</div>
                          )}
                          {rule.description && (
                            <div>{rule.description}</div>
                          )}
                        </div>
                      )}
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => rule.id && handleDeleteRule(rule.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      disabled={isLoading}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DoctorHorarios;