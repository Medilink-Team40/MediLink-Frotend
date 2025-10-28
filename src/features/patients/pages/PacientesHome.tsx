import { Outlet } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx"
import { Calendar, Clock, MapPin, Stethoscope, User } from "lucide-react"

const PacienteHome: React.FC = () => {
    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800">Bienvenido de nuevo, Usuario</h1>
                <Button className="bg-blue-600 hover:bg-blue-700">
                    <Calendar className="mr-2 h-4 w-4" />
                    Nueva Cita
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Próxima cita */}
                <Card className="md:col-span-2">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Próxima Cita</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                            <div className="bg-blue-100 p-4 rounded-lg">
                                <Calendar className="h-8 w-8 text-blue-600" />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-semibold text-lg">Dra. Ana López</h3>
                                <p className="text-gray-600">Cardióloga</p>

                                <div className="mt-4 space-y-2">
                                    <div className="flex items-center text-sm text-gray-600">
                                        <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                                        <span>Lun, 15 de Octubre 2023</span>
                                    </div>
                                    <div className="flex items-center text-sm text-gray-600">
                                        <Clock className="h-4 w-4 mr-2 text-gray-400" />
                                        <span>10:00 AM - 10:30 AM</span>
                                    </div>
                                    <div className="flex items-center text-sm text-gray-600">
                                        <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                                        <span>Consultorio 304, Piso 3</span>
                                    </div>
                                </div>

                                <div className="mt-4 flex gap-2">
                                    <Button variant="outline" size="sm">
                                        Ver Detalles
                                    </Button>
                                    <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50">
                                        Cancelar Cita
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Tarjetas de resumen */}
                <div className="space-y-4">
                    <Card>
                        <CardContent className="p-4">
                            <div className="flex items-center">
                                <div className="p-3 bg-green-100 rounded-full mr-4">
                                    <User className="h-6 w-6 text-green-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Citas Hoy</p>
                                    <p className="text-2xl font-bold">2</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-4">
                            <div className="flex items-center">
                                <div className="p-3 bg-blue-100 rounded-full mr-4">
                                    <Calendar className="h-6 w-6 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Próxima Cita</p>
                                    <p className="text-lg font-semibold">15 Oct, 10:00 AM</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-4">
                            <div className="flex items-center">
                                <div className="p-3 bg-purple-100 rounded-full mr-4">
                                    <Stethoscope className="h-6 w-6 text-purple-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Médico Asignado</p>
                                    <p className="text-lg font-semibold">Dra. Ana López</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Sección de últimas citas */}
            <Card>
                <CardHeader>
                    <CardTitle>Últimas Citas</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {[1, 2, 3].map((item) => (
                            <div key={item} className="flex items-center justify-between p-4 border-b">
                                <div className="flex items-center space-x-4">
                                    <div className="p-2 bg-gray-100 rounded-full">
                                        <User className="h-5 w-5 text-gray-600" />
                                    </div>
                                    <div>
                                        <p className="font-medium">Dr. Carlos Méndez</p>
                                        <p className="text-sm text-gray-500">Medicina General</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-medium">10 Oct 2023</p>
                                    <p className="text-sm text-gray-500">09:00 AM - 09:30 AM</p>
                                </div>
                                <div>
                                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                                        Completada
                                    </span>
                                </div>
                                <Button variant="ghost" size="sm">
                                    Ver Detalles
                                </Button>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <Outlet />
        </div>
    )
}

export default PacienteHome