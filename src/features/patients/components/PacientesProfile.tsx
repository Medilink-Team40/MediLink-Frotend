import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Phone, Mail, MapPin, User, Calendar, Droplets, Bell, BellOff, LockIcon, Plus, Trash2, X } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Contact {
  id: string;
  name: string;
  phone: string;
  email: string;
  relationship: string;
  isPrimary: boolean;
}

const PacientesProfile = () => {
  // Estados para el perfil
  const [isEditing, setIsEditing] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [profileData, setProfileData] = useState({
    name: "Juan Pérez",
    email: "juan.perez@example.com",
    phone: "+56 9 1234 5678",
    address: "Av. Principal 1234, Santiago",
    birthDate: "1990-05-15",
    bloodType: "O+",
  });

  // Estados para contactos de emergencia
  const [isAddContactOpen, setIsAddContactOpen] = useState(false);
  const [newContact, setNewContact] = useState({
    name: '',
    phone: '',
    email: '',
    relationship: 'Familiar'
  });
  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: '1',
      name: 'María Pérez',
      phone: '+56 9 1234 5678',
      email: 'maria@example.com',
      relationship: 'Familiar',
      isPrimary: true
    }
  ]);

  // Manejadores de perfil
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setIsEditing(false);
    toast.success("¡Perfil actualizado!", {
      description: "Tus datos se han guardado correctamente.",
    });
  };

  // Manejadores de notificaciones
  const toggleNotifications = () => {
    setNotifications(!notifications);
    toast.info(notifications ? "Notificaciones desactivadas" : "Notificaciones activadas", {
      description: `Las notificaciones están ahora ${notifications ? 'desactivadas' : 'activadas'}.`,
    });
  };

  // Manejadores de contactos
  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewContact(prev => ({ ...prev, [name]: value }));
  };

  const handleAddContact = () => {
    if (!newContact.name || !newContact.phone) {
      toast.error('Por favor completa los campos obligatorios');
      return;
    }

    const contact = {
      ...newContact,
      id: Date.now().toString(),
      isPrimary: contacts.length === 0
    };

    setContacts(prev => [...prev, contact]);
    setNewContact({ name: '', phone: '', email: '', relationship: 'Familiar' });
    setIsAddContactOpen(false);
    toast.success('Contacto agregado correctamente');
  };

  const handleDeleteContact = (id: string) => {
    setContacts(prev => {
      const newContacts = prev.filter(contact => contact.id !== id);
      // Si eliminamos el contacto principal y hay más contactos, hacer el primero como principal
      if (newContacts.length > 0 && !newContacts.some(c => c.isPrimary)) {
        newContacts[0].isPrimary = true;
      }
      return newContacts;
    });
    toast.info('Contacto eliminado');
  };

  const setAsPrimary = (id: string) => {
    setContacts(prev =>
      prev.map(contact => ({
        ...contact,
        isPrimary: contact.id === id
      }))
    );
    toast.success('Contacto principal actualizado');
  };

  return (
    <div className="space-y-6 p-6 max-w-4xl mx-auto">
      {/* Encabezado */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">Información Personal</h1>
        {isEditing ? (
          <div className="space-x-2">
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Cancelar
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleSave}>
              Guardar Cambios
            </Button>
          </div>
        ) : (
          <Button
            variant="outline"
            className="border-blue-500 text-blue-600 hover:bg-blue-50"
            onClick={() => setIsEditing(true)}
          >
            <Pencil className="mr-2 h-4 w-4" />
            Editar
          </Button>
        )}
      </div>

      {/* Tarjeta de Datos Personales */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-gray-500" />
            <span>Datos Personales</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Nombre Completo</Label>
              {isEditing ? (
                <Input
                  name="name"
                  value={profileData.name}
                  onChange={handleInputChange}
                />
              ) : (
                <p className="text-gray-700">{profileData.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Correo Electrónico</Label>
              {isEditing ? (
                <Input
                  type="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleInputChange}
                  disabled
                  className='bg-gray-100'
                  aria-label='Correo Eletronico (no editable)'
                />
              ) : (
                <div className="flex items-center gap-2 text-gray-700">
                  <Mail className="h-4 w-4" />
                  {profileData.email}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label>Teléfono</Label>
              {isEditing ? (
                <Input
                  type="tel"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleInputChange}
                />
              ) : (
                <div className="flex items-center gap-2 text-gray-700">
                  <Phone className="h-4 w-4" />
                  {profileData.phone}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label>Dirección</Label>
              {isEditing ? (
                <Input
                  name="address"
                  value={profileData.address}
                  onChange={handleInputChange}
                />
              ) : (
                <div className="flex items-center gap-2 text-gray-700">
                  <MapPin className="h-4 w-4" />
                  {profileData.address}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label>Fecha de Nacimiento</Label>
              {isEditing ? (
                <Input
                  type="date"
                  name="birthDate"
                  value={profileData.birthDate}
                  onChange={handleInputChange}
                />
              ) : (
                <div className="flex items-center gap-2 text-gray-700">
                  <Calendar className="h-4 w-4" />
                  {new Date(profileData.birthDate).toLocaleDateString()}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label>Tipo de Sangre</Label>
              {isEditing ? (
                <select
                  name="bloodType"
                  value={profileData.bloodType}
                  onChange={handleInputChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                >
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              ) : (
                <div className="flex items-center gap-2 text-gray-700">
                  <Droplets className="h-4 w-4" />
                  {profileData.bloodType}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tarjeta de Contactos de Emergencia */}
      <Card>
        <CardHeader className="border-b border-gray-200 bg-gray-50">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg font-medium text-gray-800">
              Contactos de Emergencia
            </CardTitle>
            <Dialog open={isAddContactOpen} onOpenChange={setIsAddContactOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-blue-500 text-blue-600 hover:bg-blue-50"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Añadir Contacto
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Agregar Contacto de Emergencia</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label>Nombre completo *</Label>
                    <Input
                      name="name"
                      value={newContact.name}
                      onChange={handleContactChange}
                      placeholder="Nombre del contacto"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Teléfono *</Label>
                    <Input
                      name="phone"
                      type="tel"
                      value={newContact.phone}
                      onChange={handleContactChange}
                      placeholder="+56 9 1234 5678"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Correo electrónico</Label>
                    <Input
                      name="email"
                      type="email"
                      value={newContact.email}
                      onChange={handleContactChange}
                      placeholder="contacto@ejemplo.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Relación</Label>
                    <select
                      name="relationship"
                      value={newContact.relationship}
                      onChange={handleContactChange}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                    >
                      <option value="Familiar">Familiar</option>
                      <option value="Amigo">Amigo</option>
                      <option value="Vecino">Vecino</option>
                      <option value="Otro">Otro</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsAddContactOpen(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={handleAddContact}>Guardar Contacto</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-6">
            {contacts.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No hay contactos de emergencia registrados</p>
            ) : (
              contacts.map(contact => (
                <div key={contact.id} className="flex items-start justify-between group">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className={`p-3 rounded-full ${contact.isPrimary ? 'bg-blue-100' : 'bg-gray-100'}`}>
                      <Phone className={`h-5 w-5 ${contact.isPrimary ? 'text-blue-600' : 'text-gray-500'}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <p className="font-medium">{contact.name}</p>
                        {contact.isPrimary && (
                          <span className="px-2 py-0.5 text-xs bg-blue-100 text-blue-800 rounded-full">
                            Principal
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">{contact.relationship}</p>
                      <p className="text-sm text-gray-600 flex items-center">
                        <Phone className="h-3.5 w-3.5 mr-1" />
                        {contact.phone}
                      </p>
                      {contact.email && (
                        <p className="text-sm text-gray-600 flex items-center">
                          <Mail className="h-3.5 w-3.5 mr-1" />
                          {contact.email}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {!contact.isPrimary && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setAsPrimary(contact.id)}
                        className="text-blue-600 hover:bg-blue-50"
                      >
                        Hacer principal
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-500 hover:bg-red-50"
                      onClick={() => handleDeleteContact(contact.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Tarjeta de Preferencias de Notificación */}
      <Card>
        <CardHeader className="border-b border-gray-200 bg-gray-50">
          <CardTitle className="text-lg font-medium text-gray-800">
            Preferencias de Notificación
          </CardTitle>
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
              <Switch
                checked={notifications}
                onCheckedChange={toggleNotifications}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <BellOff className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="font-medium">Notificaciones push</p>
                  <p className="text-sm text-gray-500">Recibir notificaciones en el dispositivo</p>
                </div>
              </div>
              <Switch
                checked={notifications}
                onCheckedChange={toggleNotifications}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Zona de Peligro
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-600">
            <LockIcon className="h-5 w-5" />
            <span>Zona de Peligro</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Eliminar Cuenta</h3>
                <p className="text-sm text-gray-500">
                  Elimina permanentemente tu cuenta y todos los datos asociados.
                </p>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="destructive">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Eliminar Cuenta
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>¿Estás seguro de eliminar tu cuenta?</DialogTitle>
                    <p className="text-sm text-gray-500">
                      Esta acción no se puede deshacer. Todos tus datos serán eliminados permanentemente.
                    </p>
                  </DialogHeader>
                  <div className="flex justify-end space-x-2 mt-4">
                    <Button variant="outline">Cancelar</Button>
                    <Button variant="destructive">Eliminar</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardContent>
      </Card>
*/}
      {/* Mensaje de seguridad */}
      <div className="flex items-center justify-center text-sm text-gray-500 mt-8">
        <LockIcon className="h-4 w-4 mr-2" />
        <span>Tus datos están seguros y encriptados</span>
      </div>
    </div>
  );
};

export default PacientesProfile;