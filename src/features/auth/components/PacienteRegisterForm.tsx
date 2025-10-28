import { useState, useEffect } from 'react';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { PatientRegisterFormData, patientRegisterSchema } from '@/features/auth/validations/patient-register.schema';
import {
  Eye,
  EyeOff,
  CheckCircle,
  XCircle,
  User,
  Mail,
  Phone,
  Calendar,
  Shield,
  UserPlus,
  Loader2,
  AlertCircle,
  IdCard,
  Users
} from 'lucide-react';
import axios from '@/utils/api';

// Estados del formulario
enum FormStatus {
  IDLE = 'idle',
  SUBMITTING = 'submitting',
  SUCCESS = 'success',
  ERROR = 'error'
}

// Configuración de animaciones
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 }
};

export const PacienteRegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formStatus, setFormStatus] = useState<FormStatus>(FormStatus.IDLE);
  const [submitMessage, setSubmitMessage] = useState('');

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting, touchedFields },
    setError,
    clearErrors,
    reset
  } = useForm<PatientRegisterFormData>({
    resolver: zodResolver(patientRegisterSchema),
    mode: 'onChange', // Validación en tiempo real
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      birthDate: '',
      gender: 'unknown',
      dni: '',
      password: '',
      confirmPassword: '',
    },
  });

  // Observar cambios en las contraseñas para validación en tiempo real
  const password = watch('password');
  const confirmPassword = watch('confirmPassword');

  // Validación de fortaleza de contraseña
  const getPasswordStrength = (password: string) => {
    if (!password) return {
      strength: 0,
      label: '',
      color: '',
      checks: {
        length: false,
        lowercase: false,
        uppercase: false,
        number: false,
        special: false
      }
    };

    let strength = 0;
    const checks = {
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };

    strength = Object.values(checks).filter(Boolean).length;

    const strengthConfig = {
      0: { label: '', color: '' },
      1: { label: 'Muy débil', color: 'bg-red-500' },
      2: { label: 'Débil', color: 'bg-orange-500' },
      3: { label: 'Regular', color: 'bg-yellow-500' },
      4: { label: 'Fuerte', color: 'bg-blue-500' },
      5: { label: 'Muy fuerte', color: 'bg-green-500' }
    };

    return { strength, ...strengthConfig[strength as keyof typeof strengthConfig], checks };
  };

  const passwordStrength = getPasswordStrength(password || '');

  // Verificar si las contraseñas coinciden
  const passwordsMatch = password && confirmPassword && password === confirmPassword;

  // Validación de DNI chileno (básica)
  const validateDNI = (dni: string) => {
    const cleanDni = dni.replace(/\D/g, '');
    return cleanDni.length >= 7 && cleanDni.length <= 8;
  };

  const dniValue = watch('dni');
  const isDniValid = dniValue ? validateDNI(dniValue) : false;

  const onSubmit: SubmitHandler<PatientRegisterFormData> = async (data) => {
    try {
      setFormStatus(FormStatus.SUBMITTING);
      clearErrors();

      // Aquí irá la llamada a la API cuando tengas el endpoint
      const payload = {
        ...data,
        // Transformar datos según el DTO cuando esté disponible
        dni: data.dni.replace(/\D/g, ''), // Limpiar DNI
      };

      // Simular llamada a la API por ahora
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Cuando tengas el endpoint real, usar esto:
      // const { data: response } = await axios.post(
      //   `${import.meta.env.VITE_API_URL}/patients/register`,
      //   payload,
      //   {
      //     headers: { "Content-Type": "application/json" },
      //   }
      // );

      setFormStatus(FormStatus.SUCCESS);
      setSubmitMessage('¡Paciente registrado exitosamente!');
      reset(); // Limpiar formulario
      console.log("Registro exitoso:", payload);

    } catch (error: any) {
      setFormStatus(FormStatus.ERROR);
      const errorMessage = error.response?.data?.message || "Ocurrió un error inesperado.";
      setSubmitMessage(errorMessage);
      setError("root", {
        type: "manual",
        message: errorMessage,
      });
    }
  };

  // Limpiar mensaje después de 5 segundos
  useEffect(() => {
    if (formStatus === FormStatus.SUCCESS || formStatus === FormStatus.ERROR) {
      const timer = setTimeout(() => {
        setFormStatus(FormStatus.IDLE);
        setSubmitMessage('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [formStatus]);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-4xl mx-auto p-6"
    >
      <Card className="shadow-xl border-0 bg-linear-to-br from-white to-gray-50">
        <CardHeader className="text-center pb-8">
          <motion.div variants={itemVariants} className="flex items-center justify-center mb-4">
            <div className="p-3 bg-green-500 rounded-full">
              <Users className="h-8 w-8 text-white" />
            </div>
          </motion.div>
          <CardTitle className="text-3xl font-bold text-gray-900">
            Registro de Paciente
          </CardTitle>
          <CardDescription className="text-lg text-gray-600">
            Complete la información para crear su cuenta de paciente
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Alerta de estado */}
            <AnimatePresence>
              {submitMessage && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <Alert className={`${formStatus === FormStatus.SUCCESS
                      ? 'border-green-500 bg-green-50'
                      : 'border-red-500 bg-red-50'
                    }`}>
                    {formStatus === FormStatus.SUCCESS ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-red-600" />
                    )}
                    <AlertDescription className={
                      formStatus === FormStatus.SUCCESS ? 'text-green-800' : 'text-red-800'
                    }>
                      {submitMessage}
                    </AlertDescription>
                  </Alert>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Información Personal */}
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <User className="h-5 w-5 text-green-500" />
                <h3 className="text-xl font-semibold text-gray-900">Información Personal</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Nombres */}
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-sm font-medium">
                    Nombres *
                  </Label>
                  <Input
                    id="firstName"
                    type="text"
                    {...register('firstName')}
                    placeholder="Juan Carlos"
                    className={`transition-all ${errors.firstName
                        ? 'border-red-500 focus:border-red-500'
                        : touchedFields.firstName
                          ? 'border-green-500 focus:border-green-500'
                          : ''
                      }`}
                  />
                  {errors.firstName && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-sm text-red-500 flex items-center gap-1"
                    >
                      <XCircle className="h-3 w-3" />
                      {errors.firstName.message}
                    </motion.p>
                  )}
                </div>

                {/* Apellidos */}
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-sm font-medium">
                    Apellidos *
                  </Label>
                  <Input
                    id="lastName"
                    type="text"
                    {...register('lastName')}
                    placeholder="Pérez González"
                    className={`transition-all ${errors.lastName
                        ? 'border-red-500 focus:border-red-500'
                        : touchedFields.lastName
                          ? 'border-green-500 focus:border-green-500'
                          : ''
                      }`}
                  />
                  {errors.lastName && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-sm text-red-500 flex items-center gap-1"
                    >
                      <XCircle className="h-3 w-3" />
                      {errors.lastName.message}
                    </motion.p>
                  )}
                </div>

                {/* DNI */}
                <div className="space-y-2">
                  <Label htmlFor="dni" className="text-sm font-medium">
                    <IdCard className="h-4 w-4 inline mr-1" />
                    DNI/RUT *
                  </Label>
                  <Input
                    id="dni"
                    type="text"
                    {...register('dni')}
                    placeholder="12.345.678-9"
                    className={`transition-all ${errors.dni
                        ? 'border-red-500 focus:border-red-500'
                        : dniValue && isDniValid
                          ? 'border-green-500 focus:border-green-500'
                          : ''
                      }`}
                  />
                  {dniValue && !errors.dni && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className={`text-sm flex items-center gap-1 ${isDniValid ? 'text-green-600' : 'text-orange-500'
                        }`}
                    >
                      {isDniValid ? (
                        <>
                          <CheckCircle className="h-3 w-3" />
                          DNI válido
                        </>
                      ) : (
                        <>
                          <AlertCircle className="h-3 w-3" />
                          Verificar formato de DNI
                        </>
                      )}
                    </motion.div>
                  )}
                  {errors.dni && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-sm text-red-500 flex items-center gap-1"
                    >
                      <XCircle className="h-3 w-3" />
                      {errors.dni.message}
                    </motion.p>
                  )}
                </div>

                {/* Fecha de Nacimiento */}
                <div className="space-y-2">
                  <Label htmlFor="birthDate" className="text-sm font-medium">
                    <Calendar className="h-4 w-4 inline mr-1" />
                    Fecha de Nacimiento *
                  </Label>
                  <Input
                    id="birthDate"
                    type="date"
                    {...register('birthDate')}
                    className={`transition-all ${errors.birthDate
                        ? 'border-red-500 focus:border-red-500'
                        : touchedFields.birthDate
                          ? 'border-green-500 focus:border-green-500'
                          : ''
                      }`}
                  />
                  {errors.birthDate && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-sm text-red-500 flex items-center gap-1"
                    >
                      <XCircle className="h-3 w-3" />
                      {errors.birthDate.message}
                    </motion.p>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Información de Contacto */}
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <Mail className="h-5 w-5 text-green-500" />
                <h3 className="text-xl font-semibold text-gray-900">Información de Contacto</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Correo Electrónico *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    {...register('email')}
                    placeholder="juan.perez@ejemplo.com"
                    className={`transition-all ${errors.email
                        ? 'border-red-500 focus:border-red-500'
                        : touchedFields.email
                          ? 'border-green-500 focus:border-green-500'
                          : ''
                      }`}
                  />
                  {errors.email && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-sm text-red-500 flex items-center gap-1"
                    >
                      <XCircle className="h-3 w-3" />
                      {errors.email.message}
                    </motion.p>
                  )}
                </div>

                {/* Teléfono */}
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium">
                    <Phone className="h-4 w-4 inline mr-1" />
                    Teléfono *
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    {...register('phone')}
                    placeholder="+56 9 1234 5678"
                    className={`transition-all ${errors.phone
                        ? 'border-red-500 focus:border-red-500'
                        : touchedFields.phone
                          ? 'border-green-500 focus:border-green-500'
                          : ''
                      }`}
                  />
                  {errors.phone && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-sm text-red-500 flex items-center gap-1"
                    >
                      <XCircle className="h-3 w-3" />
                      {errors.phone.message}
                    </motion.p>
                  )}
                </div>

                {/* Género */}
                <div className="space-y-2 md:col-span-2">
                  <Label className="text-sm font-medium">Género *</Label>
                  <Controller
                    name="gender"
                    control={control}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value} // Cambiar defaultValue por value
                      >
                        <SelectTrigger className={` bg-white transition-all ${errors.gender
                            ? 'border-red-500 focus:border-red-500'
                            : touchedFields.gender // Agregar validación visual para campo tocado
                              ? 'border-green-500 focus:border-green-500'
                              : ''
                          }`}>
                          <SelectValue placeholder="Seleccionar género" />
                        </SelectTrigger>
                        <SelectContent className='bg-white'>
                          <SelectItem value="male">Masculino</SelectItem>
                          <SelectItem value="female">Femenino</SelectItem>
                          <SelectItem value="other">Otro</SelectItem>
                          <SelectItem value="unknown">Prefiero no decirlo</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.gender && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-sm text-red-500 flex items-center gap-1"
                    >
                      <XCircle className="h-3 w-3" />
                      {errors.gender.message}
                    </motion.p>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Seguridad */}
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="h-5 w-5 text-green-500" />
                <h3 className="text-xl font-semibold text-gray-900">Configuración de Seguridad</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Contraseña */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium">
                    Contraseña *
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      {...register('password')}
                      placeholder="••••••••"
                      className={`pr-10 transition-all ${errors.password
                          ? 'border-red-500 focus:border-red-500'
                          : password && passwordStrength.strength >= 4
                            ? 'border-green-500 focus:border-green-500'
                            : ''
                        }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>

                  {/* Medidor de fortaleza de contraseña */}
                  {password && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="space-y-2"
                    >
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all duration-300 ${passwordStrength.color}`}
                            style={{ width: `${(passwordStrength.strength / 5) * 100}%` }}
                          />
                        </div>
                        <Badge
                          variant={passwordStrength.strength >= 4 ? "default" : "secondary"}
                          className="text-xs"
                        >
                          {passwordStrength.label}
                        </Badge>
                      </div>

                      <div className="text-xs text-gray-600 space-y-1">
                        <div className="flex flex-wrap gap-2">
                          {Object.entries(passwordStrength.checks || {}).map(([key, isValid]) => (
                            <span
                              key={key}
                              className={`flex items-center gap-1 ${isValid ? 'text-green-600' : 'text-gray-400'}`}
                            >
                              {isValid ? <CheckCircle className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
                              {key === 'length' && '8+ caracteres'}
                              {key === 'lowercase' && 'Minúscula'}
                              {key === 'uppercase' && 'Mayúscula'}
                              {key === 'number' && 'Número'}
                              {key === 'special' && 'Especial'}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {errors.password && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-sm text-red-500 flex items-center gap-1"
                    >
                      <XCircle className="h-3 w-3" />
                      {errors.password.message}
                    </motion.p>
                  )}
                </div>

                {/* Confirmar Contraseña */}
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-sm font-medium">
                    Confirmar Contraseña *
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      {...register('confirmPassword')}
                      placeholder="••••••••"
                      className={`pr-10 transition-all ${errors.confirmPassword
                          ? 'border-red-500 focus:border-red-500'
                          : passwordsMatch
                            ? 'border-green-500 focus:border-green-500'
                            : ''
                        }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
                    >
                      {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>

                  {/* Indicador de coincidencia */}
                  {confirmPassword && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className={`text-sm flex items-center gap-1 ${passwordsMatch ? 'text-green-600' : 'text-red-500'
                        }`}
                    >
                      {passwordsMatch ? (
                        <>
                          <CheckCircle className="h-3 w-3" />
                          Las contraseñas coinciden
                        </>
                      ) : (
                        <>
                          <XCircle className="h-3 w-3" />
                          Las contraseñas no coinciden
                        </>
                      )}
                    </motion.div>
                  )}

                  {errors.confirmPassword && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-sm text-red-500 flex items-center gap-1"
                    >
                      <XCircle className="h-3 w-3" />
                      {errors.confirmPassword.message}
                    </motion.p>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Información adicional
            <motion.div variants={itemVariants} className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                <div className="text-sm text-blue-800">
                  <p className="font-medium mb-1">Información importante:</p>
                  <ul className="space-y-1 text-xs">
                    <li>• Su información será tratada de forma confidencial</li>
                    <li>• Recibirá un correo de confirmación después del registro</li>
                    <li>• Podrá programar citas médicas una vez activada su cuenta</li>
                  </ul>
                </div>
              </div>
            </motion.div>
            */}

            {/* Botón de Submit */}
            <motion.div variants={itemVariants} className="pt-6">
              <Button
                type="submit"
                className="w-full h-12 text-lg font-medium bg-linear-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 transition-all transform hover:scale-[1.02]"
                disabled={isSubmitting || formStatus === FormStatus.SUBMITTING}
              >
                {isSubmitting || formStatus === FormStatus.SUBMITTING ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Registrando...
                  </>
                ) : (
                  <>
                    <UserPlus className="mr-2 h-5 w-5" />
                    Registrarse como Paciente
                  </>
                )}
              </Button>
            </motion.div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PacienteRegisterForm;