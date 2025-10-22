import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { Button } from "@/components/ui/button";
import { Pencil, Phone, Mail, MapPin, User, Calendar, Droplets, Bell, BellOff, LockIcon, Plus, Trash2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";

const PacientesProfile = () => {
  return (
    <div className="space-y-6 p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">Información Personal</h1>
        <Button variant="outline" className="border-blue-500 text-blue-600 hover:bg-blue-50">
          <Pencil className="mr-2 h-4 w-4" />
          Editar
        </Button>
      </div>

      {/* Datos Personales */}
      <Card className="border border-gray-200 rounded-xl shadow-sm">
        <CardHeader className="border-b border-gray-200 bg-gray-50">
          <CardTitle className="text-lg font-medium text-gray-800">Datos Personales</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <p className="text-sm text-gray-500 flex items-center">
                <User className="mr-2 h-4 w-4" />
                Nombre Completo
              </p>
              <p className="font-medium">Juan Pérez</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-500 flex items-center">
                <Calendar className="mr-2 h-4 w-4" />
                Fecha de Nacimiento
              </p>
              <p className="font-medium">15/03/1985</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-500">Género</p>
              <p className="font-medium">Masculino</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-500 flex items-center">
                <Droplets className="mr-2 h-4 w-4" />
                Tipo de Sangre
              </p>
              <p className="font-medium">O+</p>
            </div>
            <div className="space-y-2">
              <p>
                <Mail className="mr-2 h-4 w-4" />
                Correo Eletronico
              </p>
              <p className="font-medium">juan.perez@example.com</p>
            </div>
            <div className="space-y-2">
              <p>
                <MapPin className="mr-2 h-4 w-4" />
                Dirección
              </p>
              <p className="font-medium">Direccion ficticia</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contactos de Emergencia */}
      <Card className="border border-gray-200 rounded-xl shadow-sm">
        <CardHeader className="border-b border-gray-200 bg-gray-50">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg font-medium text-gray-800">Contactos de Emergencia</CardTitle>
            <Button
              variant="outline"
              size="sm"
              className="border-blue-500 text-blue-600 hover:bg-blue-50"
              onClick={() => {/* Lógica para añadir contacto */ }}
            >
              <Plus className="h-4 w-4 mr-2" />
              Añadir Contacto
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4 flex-1">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Phone className="h-5 w-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Contacto Principal</p>
                  <p className="text-sm text-gray-500">María Pérez</p>
                  <p className="text-sm text-gray-600">+1 234 567 8901</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="ghost"

                  className="text-gray-500 hover:bg-gray-100"
                  onClick={() => {/* Lógica para editar */ }}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"

                  className="text-red-500 hover:bg-red-50"
                  onClick={() => {/* Lógica para eliminar */ }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Segundo contacto */}
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4 flex-1">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Phone className="h-5 w-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Contacto Secundario</p>
                  <p className="text-sm text-gray-500">Carlos Pérez</p>
                  <p className="text-sm text-gray-600">+1 234 567 8902</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="ghost"

                  className="text-gray-500 hover:bg-gray-100"
                  onClick={() => {/* Lógica para editar */ }}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  className="text-red-500 hover:bg-red-50"
                  onClick={() => {/* Lógica para eliminar */ }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Preferencias de Notificación */}
      <Card className="border border-gray-200 rounded-xl shadow-sm">
        <CardHeader className="border-b border-gray-200 bg-gray-50">
          <CardTitle className="text-lg font-medium text-gray-800">Preferencias de Notificación</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Bell className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="font-medium">Notificaciones por correo</p>
                  <p className="text-sm text-gray-500">Recibir recordatorios y actualizaciones</p>
                </div>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <BellOff className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="font-medium">Notificaciones push</p>
                  <p className="text-sm text-gray-500">Recibir notificaciones en el dispositivo</p>
                </div>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="flex items-center justify-center text-sm text-gray-500 mt-8">
        <LockIcon className="h-4 w-4 mr-2" />
        <span>Tus datos esta seguros y encriptados</span>
      </div>
    </div>
  );
};

export default PacientesProfile;