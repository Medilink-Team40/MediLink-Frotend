import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState, useEffect } from 'react';
import {
  Pencil,
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Stethoscope,
  Shield,
  Save,
  X,
  Loader2
} from 'lucide-react';
import { toast } from "sonner";
import { useAuth } from '@/config/AuthProvider';
import { practitionerService } from '@/service/practitionerService';
import axios from '@/utils/api';
import {
  Practitioner,
  FHIRExternalGender,
  PractitionerName,
  Telecom,
  getPractitionerDisplayName,
  getPractitionerWorkPhone,
  getPractitionerWorkEmail
} from '@/types/practitioner.types';

interface DoctorProfileData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthDate: string;
  gender: FHIRExternalGender;
  specialization: string;
  licenseNumber: string;
  workplace: string;
}

const DoctorProfile = () => {
  const { user, loading: authLoading } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [practitionerId, setPractitionerId] = useState<string | null>(null);
  const [profileData, setProfileData] = useState<DoctorProfileData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    birthDate: '',
    gender: FHIRExternalGender.UNKNOWN,
    specialization: '',
    licenseNumber: '',
    workplace: ''
  });

  useEffect(() => {


    if (!authLoading && user && user.id) {
        loadProfileData();
    } else {
      console.warn('No se pudo cargar el perfil: usuario no autenticado o ID no disponible');
    }
  }, [user, authLoading]);

  const loadProfileData = async () => {
    try {
      setLoading(true);
      let response;
      let fallbackUsed = false;

      // Estrategia 1: Intentar con el endpoint /practitioner/me
      console.log('Estrategia 1: Intentando /practitioner/me');
      response = await practitionerService.getMyProfile();

      // Si el endpoint /practitioner/me falla, intentar con el ID directo
      if (response.error && (response.status === 500 || response.status >= 400)) {
        console.log(`/practitioner/me fallo con ${response.status}. Intentando estrategia 2...`);
        fallbackUsed = true;

        const userId = user?.id;
        if (userId) {
          console.log('Estrategia 2: Intentando GET /practitioner/{id}');
          try {
            const directResponse = await axios.get(`/practitioner/${userId}`);
            response = {
              data: directResponse.data,
              status: directResponse.status,
              message: 'Perfil obtenido exitosamente'
            };
          } catch (error: any) {
            console.error('Estrategia 2 fallo:', error.response?.status, error.response?.data);

            // Si es 404, el doctor no existe
            if (error.response?.status === 404) {
              console.log('Doctor no encontrado. Mostrando formulario para crear perfil...');
              setProfileData({
                firstName: user?.firstName || '',
                lastName: user?.lastName || '',
                email: user?.email || '',
                phone: '',
                birthDate: '',
                gender: FHIRExternalGender.UNKNOWN,
                specialization: '',
                licenseNumber: '',
                workplace: ''
              });

              setPractitionerId(userId);

              toast.info('Perfil no encontrado', {
                description: 'Completa tu informacion profesional para crear tu perfil.',
              });

              setIsEditing(true);
              return;
            }

            // Si es otro error, propagar
            response = {
              error: {
                message: error.response?.data?.message || error.message,
                status: error.response?.status
              },
              status: error.response?.status || 500
            };
          }
        } else {
          throw new Error('No se pudo obtener el ID del usuario para cargar el perfil');
        }
      }

      console.log('Respuesta final del servicio:', response);
      console.log('Data especifica:', response.data);

      if (response.error) {
        throw new Error(response.error.message || 'Error al cargar el perfil');
      }

      if (response.data) {
        const practitioner: Practitioner = response.data;

        const finalPractitionerId = practitioner.keycloakId || user?.id;
        console.log('Guardando practitionerId:', finalPractitionerId);
        setPractitionerId(finalPractitionerId);

        const names = practitioner.name || [];
        const telecoms = practitioner.telecom || [];
        const firstQualification = practitioner.qualification?.[0];

        const newProfileData = {
          firstName: names[0]?.given?.[0] || '',
          lastName: names[0]?.family || '',
          email: practitioner.email || '',
          phone: getPractitionerWorkPhone(telecoms),
          birthDate: practitioner.birthDate || '',
          gender: practitioner.gender || FHIRExternalGender.UNKNOWN,
          specialization: firstQualification?.code || '',
          licenseNumber: practitioner.identifier?.[0]?.value || '',
          workplace: ''
        };

        console.log('Datos del perfil procesados:', newProfileData);
        setProfileData(newProfileData);

        const successMessage = fallbackUsed
          ? 'Perfil cargado correctamente (usando metodo alternativo)'
          : 'Perfil cargado correctamente';

        toast.success(successMessage);
      } else {
        console.warn('No se recibieron datos en la respuesta');
        throw new Error('No se recibieron datos del perfil');
      }
    } catch (error: any) {
      console.error('Error loading profile:', error);
      toast.error('Error al cargar el perfil', {
        description: error.message || 'No se pudieron obtener tus datos. Intentalo de nuevo.'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof DoctorProfileData, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    if (!practitionerId) {
      toast.error('Error', {
        description: 'No se pudo identificar el ID del profesional'
      });
      return;
    }

    try {
      setLoading(true);

      const updateData = {
        keycloakId: practitionerId,
        email: profileData.email,
        birthDate: profileData.birthDate,
        gender: profileData.gender,
        name: [{
          use: 'official' as const,
          family: profileData.lastName,
          given: [profileData.firstName],
          text: `${profileData.firstName} ${profileData.lastName}`
        }] as PractitionerName[],
        telecom: [{
          system: 'phone' as const,
          value: profileData.phone,
          use: 'work' as const,
          rank: 1
        }, {
          system: 'email' as const,
          value: profileData.email,
          use: 'work' as const,
          rank: 2
        }] as Telecom[],
        specialization: profileData.specialization,
        licenseNumber: profileData.licenseNumber
      };

      console.log('Intentando guardar datos:', updateData);
      console.log('Con practitionerId:', practitionerId);

      let response;
      const hasExistingProfile = profileData.firstName || profileData.lastName || profileData.email;

      if (!hasExistingProfile) {
        console.log('Creando nuevo perfil con register...');
        response = await practitionerService.register(updateData as any);
      } else {
        console.log('Actualizando perfil existente...');
        response = await practitionerService.update(practitionerId, updateData);
      }

      if (response.error) {
        throw new Error(response.error.message || 'Error al guardar');
      }

      setIsEditing(false);
      toast.success("Perfil guardado", {
        description: "Tus datos se han guardado correctamente.",
      });

      loadProfileData();

    } catch (error: any) {
      console.error('Error saving profile:', error);
      toast.error('Error al guardar el perfil', {
        description: error.message || 'Intentalo de nuevo mas tarde'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    loadProfileData();
  };

  if (authLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        <span className="ml-2 text-gray-600">Autenticando...</span>
      </div>
    );
  }

  if (loading && !isEditing) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        <span className="ml-2 text-gray-600">Cargando perfil...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6 max-w-4xl mx-auto">


      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">Informacion Personal</h1>
        {isEditing ? (
          <div className="space-x-2">
            <Button
              variant="outline"
              onClick={handleCancel}
              disabled={loading}
            >
              <X className="mr-2 h-4 w-4" />
              Cancelar
            </Button>
            <Button
              className="bg-blue-600 hover:bg-blue-700"
              onClick={handleSave}
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Save className="mr-2 h-4 w-4" />
              )}
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

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-gray-500" />
            Datos Personales
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Nombre</Label>
              {isEditing ? (
                <Input
                  value={profileData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  placeholder="Nombre"
                />
              ) : (
                <p className="text-gray-700">{profileData.firstName || 'No especificado'}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Apellido</Label>
              {isEditing ? (
                <Input
                  value={profileData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  placeholder="Apellido"
                />
              ) : (
                <p className="text-gray-700">{profileData.lastName || 'No especificado'}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Correo Electronico</Label>
              {isEditing ? (
                <Input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="correo@ejemplo.com"
                />
              ) : (
                <div className="flex items-center gap-2 text-gray-700">
                  <Mail className="h-4 w-4" />
                  {profileData.email || 'No especificado'}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label>Telefono</Label>
              {isEditing ? (
                <Input
                  type="tel"
                  value={profileData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="+1234567890"
                />
              ) : (
                <div className="flex items-center gap-2 text-gray-700">
                  <Phone className="h-4 w-4" />
                  {profileData.phone || 'No especificado'}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label>Fecha de Nacimiento</Label>
              {isEditing ? (
                <Input
                  type="date"
                  value={profileData.birthDate}
                  onChange={(e) => handleInputChange('birthDate', e.target.value)}
                />
              ) : (
                <div className="flex items-center gap-2 text-gray-700">
                  <Calendar className="h-4 w-4" />
                  {profileData.birthDate ? new Date(profileData.birthDate).toLocaleDateString('es-ES') : 'No especificado'}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label>Genero</Label>
              {isEditing ? (
                <Select
                  value={profileData.gender}
                  onValueChange={(value) => handleInputChange('gender', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar genero" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={FHIRExternalGender.MALE}>Masculino</SelectItem>
                    <SelectItem value={FHIRExternalGender.FEMALE}>Femenino</SelectItem>
                    <SelectItem value={FHIRExternalGender.OTHER}>Otro</SelectItem>
                    <SelectItem value={FHIRExternalGender.UNKNOWN}>Prefiero no decirlo</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <p className="text-gray-700">
                  {profileData.gender === FHIRExternalGender.MALE ? 'Masculino' :
                   profileData.gender === FHIRExternalGender.FEMALE ? 'Femenino' :
                   profileData.gender === FHIRExternalGender.OTHER ? 'Otro' : 'No especificado'}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Stethoscope className="h-5 w-5 text-gray-500" />
            Informacion Profesional
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Especializacion</Label>
              {isEditing ? (
                <Input
                  value={profileData.specialization}
                  onChange={(e) => handleInputChange('specialization', e.target.value)}
                  placeholder="Cardiologia, Pediatria, etc."
                />
              ) : (
                <p className="text-gray-700">{profileData.specialization || 'No especificado'}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Numero de Licencia</Label>
              {isEditing ? (
                <Input
                  value={profileData.licenseNumber}
                  onChange={(e) => handleInputChange('licenseNumber', e.target.value)}
                  placeholder="LIC123456"
                />
              ) : (
                <div className="flex items-center gap-2 text-gray-700">
                  <Shield className="h-4 w-4" />
                  {profileData.licenseNumber || 'No especificado'}
                </div>
              )}
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label>Lugar de Trabajo</Label>
              {isEditing ? (
                <Input
                  value={profileData.workplace}
                  onChange={(e) => handleInputChange('workplace', e.target.value)}
                  placeholder="Hospital, Clinica, etc."
                />
              ) : (
                <div className="flex items-center gap-2 text-gray-700">
                  <MapPin className="h-4 w-4" />
                  {profileData.workplace || 'No especificado'}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DoctorProfile;