import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  UserCheck,
  UserPlus,
  Calendar,
  Activity,
  TrendingUp,
  Clock,
  AlertCircle,
  ChevronRight,
  Plus,
  Settings,
  Bell,
  Search,
  Filter
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

// Configuración de animaciones
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4 }
  },
  hover: {
    scale: 1.02,
    boxShadow: "0 20px 25px -5px rgba(59, 130, 246, 0.1), 0 10px 10px -5px rgba(59, 130, 246, 0.04)",
    transition: { duration: 0.2 }
  }
};

// Datos de ejemplo con tendencias
const statsData = [
  {
    title: "Total de Doctores",
    value: "124",
    trend: "+12%",
    trendDirection: "up",
    icon: Users,
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50",
    iconColor: "text-blue-600",
    description: "vs mes anterior"
  },
  {
    title: "Registros Pendientes",
    value: "8",
    trend: "-25%",
    trendDirection: "down",
    icon: UserPlus,
    color: "from-orange-500 to-orange-600",
    bgColor: "bg-orange-50",
    iconColor: "text-orange-600",
    description: "vs semana anterior"
  },
  {
    title: "Pacientes Activos",
    value: "2,345",
    trend: "+8%",
    trendDirection: "up",
    icon: UserCheck,
    color: "from-green-500 to-green-600",
    bgColor: "bg-green-50",
    iconColor: "text-green-600",
    description: "este mes"
  },
  {
    title: "Citas Hoy",
    value: "67",
    trend: "+15%",
    trendDirection: "up",
    icon: Calendar,
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-50",
    iconColor: "text-purple-600",
    description: "vs ayer"
  }
];

const recentActivity = [
  {
    id: 1,
    type: "registro",
    message: "Dr. María González se registró",
    time: "Hace 5 min",
    status: "pendiente"
  },
  {
    id: 2,
    type: "cita",
    message: "Nueva cita programada",
    time: "Hace 12 min",
    status: "confirmada"
  },
  {
    id: 3,
    type: "registro",
    message: "Dr. Carlos Ruiz completó registro",
    time: "Hace 1 hora",
    status: "aprobado"
  },
  {
    id: 4,
    type: "sistema",
    message: "Backup automático completado",
    time: "Hace 2 horas",
    status: "exitoso"
  }
];

const AdminDashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

   const formatTime = (date: Date) => {
    return date.toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
};

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen from-blue-50 via-white to-white bg-linear-to-b p-4"
    >
      <div className="relative">
        {/* Header con linear  azul */}
        <motion.div
          variants={itemVariants}
          className="bg-linear -to-r from-white-600 to-black-700 text-white"
        >
          <div className="px-8 py-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex flex-col gap-2">
                <h1 className="text-3xl lg:text-4xl font-bold text-black">
                  Panel de Administración
                </h1>
                <p className="text-black text-lg">
                  Bienvenido de nuevo, Administrador
                </p>
                <div className="flex items-center gap-4 text-black text-sm">
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {formatTime(currentTime)}
                  </span>
                  <span>{formatDate(currentTime)}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Button
                  variant="secondary"
                  className="bg-blue-400 border-white text-black hover:bg-blue-500/20"
                >
                  <Bell className="h-4 w-4 mr-2" />
                  Notificaciones
                  <Badge className="ml-2 bg-red-500 text-black">3</Badge>
                </Button>
                <Button
                  variant="secondary"
                  className="bg-blue-400 border-white/20 text-black hover:bg-blue-500/30"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Configuración
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="px-8 py-8">
          <div className="max-w-7xl mx-auto space-y-8">

            {/* Quick Actions */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
              <Button
              onClick={()=> window.location.href='/admin/doctor-register'}
              className="bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
                <Plus className="h-4 w-4 mr-2" />
                Registrar Doctor
              </Button>
              <Button variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50">
                <Search className="h-4 w-4 mr-2" />
                Buscar Pacientes
              </Button>
              <Button variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50">
                <Filter className="h-4 w-4 mr-2" />
                Filtros Avanzados
              </Button>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {statsData.map((stat, index) => (
                <motion.div
                  key={stat.title}
                  variants={cardVariants}
                  whileHover="hover"
                  className="group cursor-pointer"
                >
                  <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className={`inline-flex p-3 rounded-xl ${stat.bgColor} mb-4`}>
                            <stat.icon className={`h-6 w-6 ${stat.iconColor}`} />
                          </div>
                          <p className="text-gray-600 text-sm font-medium mb-1">
                            {stat.title}
                          </p>
                          <p className="text-3xl font-bold text-gray-900 mb-2">
                            {stat.value}
                          </p>
                          <div className="flex items-center gap-2">
                            <Badge
                              variant={stat.trendDirection === 'up' ? 'default' : 'secondary'}
                              className={`${
                                stat.trendDirection === 'up'
                                  ? 'bg-green-100 text-green-700'
                                  : 'bg-orange-100 text-orange-700'
                              }`}
                            >
                              <TrendingUp className={`h-3 w-3 mr-1 ${
                                stat.trendDirection === 'down' ? 'rotate-180' : ''
                              }`} />
                              {stat.trend}
                            </Badge>
                            <span className="text-xs text-gray-500">
                              {stat.description}
                            </span>
                          </div>
                        </div>
                        <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            {/* Dashboard Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

              {/* Activity Feed */}
              <motion.div variants={itemVariants} className="lg:col-span-2">
                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-xl font-bold text-gray-900">
                          Actividad Reciente
                        </CardTitle>
                        <CardDescription>
                          Últimas actividades del sistema
                        </CardDescription>
                      </div>
                      <Button variant="outline" size="sm" className="border-blue-200 text-blue-700">
                        Ver todo
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivity.map((activity, index) => (
                        <motion.div
                          key={activity.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center gap-4 p-4 rounded-lg hover:bg-blue-50/50 transition-colors group"
                        >
                          <div className={`p-2 rounded-full ${
                            activity.type === 'registro' ? 'bg-blue-100' :
                            activity.type === 'cita' ? 'bg-green-100' :
                            'bg-gray-100'
                          }`}>
                            {activity.type === 'registro' && <UserPlus className="h-4 w-4 text-blue-600" />}
                            {activity.type === 'cita' && <Calendar className="h-4 w-4 text-green-600" />}
                            {activity.type === 'sistema' && <Activity className="h-4 w-4 text-gray-600" />}
                          </div>
                          <div className="flex-1">
                            <p className="text-gray-900 font-medium group-hover:text-blue-700 transition-colors">
                              {activity.message}
                            </p>
                            <p className="text-gray-500 text-sm">{activity.time}</p>
                          </div>
                          <Badge
                            variant={activity.status === 'pendiente' ? 'secondary' : 'default'}
                            className={`${
                              activity.status === 'pendiente' ? 'bg-orange-100 text-orange-700' :
                              activity.status === 'aprobado' ? 'bg-green-100 text-green-700' :
                              'bg-blue-100 text-blue-700'
                            }`}
                          >
                            {activity.status}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Quick Stats */}
              <motion.div variants={itemVariants} className="space-y-6">

                {/* Alertas */}
                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg font-bold text-gray-900 flex items-center gap-2">
                      <AlertCircle className="h-5 w-5 text-orange-500" />
                      Alertas del Sistema
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                        <div>
                          <p className="text-sm font-medium text-orange-800">
                            8 registros pendientes de aprobación
                          </p>
                          <p className="text-xs text-orange-600">
                            Requieren revisión manual
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                        <div>
                          <p className="text-sm font-medium text-blue-800">
                            Backup programado para las 23:00
                          </p>
                          <p className="text-xs text-blue-600">
                            Sistema funcionando correctamente
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Estadísticas Rápidas */}
                <Card className="border-0 shadow-lg bg-linear -to-br from-blue-600 to-indigo-700 text-white">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg font-bold">
                      Resumen del Día
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-blue-100">Nuevos Registros</span>
                        <span className="text-2xl font-bold">12</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-blue-100">Citas Completadas</span>
                        <span className="text-2xl font-bold">45</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-blue-100">Doctores Activos</span>
                        <span className="text-2xl font-bold">32</span>
                      </div>
                      <div className="pt-4 border-t border-blue-400">
                        <Button
                          variant="secondary"
                          size="sm"
                          className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20"
                        >
                          Ver Reporte Detallado
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AdminDashboard;