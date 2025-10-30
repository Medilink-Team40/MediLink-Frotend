import { useState, useEffect } from 'react';
import { z } from 'zod';
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
import { practitionerRegisterSchema, PractitionerRegisterFormData } from '@/features/auth/validations/practitioner-register.schema';
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
  Stethoscope
} from 'lucide-react';

import { practitionerService } from '@/service/practitionerService';
import { toast } from 'sonner';


// Tipo de datos para el registro de doctor
type PractitionerRegisterData = z.infer<typeof practitionerRegisterSchema>;

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

// Estados del formulario
enum FormStatus {
  IDLE = 'idle',
  SUBMITTING = 'submitting',
  SUCCESS = 'success',
  ERROR = 'error'
}

export const DoctorRegister = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formStatus, setFormStatus] = useState<FormStatus>(FormStatus.IDLE);
  const [submitMessage, setSubmitMessage] = useState('');

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors, isSubmitting, touchedFields },
    reset,
    setError,
    clearErrors
  } = useForm<PractitionerRegisterFormData>({
    resolver: zodResolver(practitionerRegisterSchema),
    defaultValues: {
      email: '',
      password: '',
      repeatpassword: '',
      name: [{
        use: 'official',
        family: '',
        given: [''],
        prefix: [''],
        suffix: [''],
        text: '',
      }],
      telecom: [{
        system: 'phone',
        value: '',
        use: 'work',
        rank: 1
      }],
      gender: 'unknown', // Cambiar a string
      birthDate: '',

    },
  });


  // Observar cambios en las contraseñas para validación en tiempo real
  const password = watch('password');
  const confirmPassword = watch('repeatpassword');

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

  const onSubmit: SubmitHandler<PractitionerRegisterFormData> = async (data) => {
    try {
      setFormStatus(FormStatus.SUBMITTING);
      clearErrors();

      // Tipos válidos según FHIR
      type ValidNameUse = "official" | "usual" | "temp" | "nickname" | "anonymous" | "old" | "maiden";

      // Función helper para validar y retornar use válido
      const getValidNameUse = (use: string | undefined): ValidNameUse => {
        const validUses: ValidNameUse[] = ["official", "usual", "temp", "nickname", "anonymous", "old", "maiden"];

        if (use && validUses.includes(use as ValidNameUse)) {
          return use as ValidNameUse;
        }
        return "official"; // Valor por defecto
      };

      // Construir el payload según el formato FHIR
      const payload = {
        email: data.email,
        password: data.password,
        repeatpassword: data.repeatpassword,
        birthDate: data.birthDate,
        gender: data.gender,
        name: data.name.map(n => ({
          use: n.use || 'official',
          text: n.text || `${n.given.filter(name => name?.trim()).join(' ')} ${n.family}`.trim(),
          family: n.family,
          given: n.given.filter(name => name?.trim()),
          ...(n.prefix?.filter(p => p?.trim()).length && { prefix: n.prefix.filter(p => p?.trim()) }),
          ...(n.suffix?.filter(s => s?.trim()).length && { suffix: n.suffix.filter(s => s?.trim()) })
        })),
        telecom: data.telecom
          .filter(t => t.value?.trim())
          .map((t, index) => ({
            system: t.system || 'phone',
            value: t.value,
            use: t.use || 'work',
            rank: t.rank || index + 1,
          }))
      };


      console.log('Enviando payload:', payload);

      // Usar el practitionerService
      const result = await practitionerService.register(payload);

      if (result.error) {
        throw new Error(result.error.message || 'Error al registrar');
      }


      setFormStatus(FormStatus.SUCCESS);
      setSubmitMessage('¡Doctor registrado exitosamente!');

      toast.success('¡Doctor registrado exitosamente!', {
        description: 'El doctor ha sido registrado en el sistema correctamente.'
      });

      setTimeout(() => {
        reset();
      }, 2000);

      console.log("Registro exitoso:", result.data);

    } catch (error: any) {
      console.error('Error en registro:', error);

      setFormStatus(FormStatus.ERROR);

      // Mejorar el mensaje segun el codigo de estado
      let errorMessage = "Ocurrio un error inesperado.";

      if (error.response?.status === 409) {
        errorMessage = "Este correo electronico ya esta registrado. Por favor, usa otro email.";
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }

      setSubmitMessage(errorMessage);

      toast.error('Error al registrar doctor', {
        description: errorMessage
      });

      // Opcional: Marcar el campo de email como error
      if (error.response?.status === 409) {
        setError("email", {
          type: "manual",
          message: "Este email ya esta registrado",
        });
      }

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
            <div className="p-3 bg-blue-500 rounded-full">
              <UserPlus className="h-8 w-8 text-white" />
            </div>
          </motion.div>
          <CardTitle className="text-3xl font-bold text-gray-900">
            Registro de Doctor
          </CardTitle>
          <CardDescription className="text-lg text-gray-600">
            Complete la información para registrar un nuevo doctor en el sistema
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
                <User className="h-5 w-5 text-blue-500" />
                <h3 className="text-xl font-semibold text-gray-900">Información Personal</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Nombres */}
                <div className="space-y-2">
                  <Label htmlFor="given" className="text-sm font-medium">
                    Nombres *
                  </Label>
                  <Input
                    id="given"
                    type="text"
                    {...register('name.0.given.0')}
                    placeholder="Juan Carlos"
                    className={`transition-all ${errors.name?.[0]?.given?.[0]
                      ? 'border-red-500 focus:border-red-500'
                      : touchedFields.name?.[0]?.given?.[0]
                        ? 'border-green-500 focus:border-green-500'
                        : ''
                      }`}
                  />
                  {errors.name?.[0]?.given?.[0] && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-sm text-red-500 flex items-center gap-1"
                    >
                      <XCircle className="h-3 w-3" />
                      {errors.name[0].given[0]?.message?.toString()}
                    </motion.p>
                  )}
                </div>

                {/* Apellido */}
                <div className="space-y-2">
                  <Label htmlFor="family" className="text-sm font-medium">
                    Apellido *
                  </Label>
                  <Input
                    id="family"
                    type="text"
                    {...register('name.0.family')}
                    placeholder="Pérez González"
                    className={`transition-all ${errors.name?.[0]?.family
                      ? 'border-red-500 focus:border-red-500'
                      : touchedFields.name?.[0]?.family
                        ? 'border-green-500 focus:border-green-500'
                        : ''
                      }`}
                  />
                  {errors.name?.[0]?.family && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-sm text-red-500 flex items-center gap-1"
                    >
                      <XCircle className="h-3 w-3" />
                      {errors.name[0].family?.message?.toString()}
                    </motion.p>
                  )}
                </div>

                {/* Título */}
                <div className="space-y-2">
                  <Label htmlFor="prefix" className="text-sm font-medium">
                    Título/Especialidad
                  </Label>
                  <Input
                    id="prefix"
                    type="text"
                    {...register('name.0.prefix.0')}
                    placeholder="Dr., Odontólogo, Cardiólogo"
                  />
                </div>

                {/* Sufijo */}
                <div className="space-y-2">
                  <Label htmlFor="suffix" className="text-sm font-medium">
                    Sufijo
                  </Label>
                  <Input
                    id="suffix"
                    type="text"
                    {...register('name.0.suffix.0')}
                    placeholder="Jr., Sr., PhD, MD"
                  />
                </div>
              </div>
            </motion.div>

            {/* Información de Contacto */}
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <Mail className="h-5 w-5 text-blue-500" />
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
                    placeholder="doctor@hospital.com"
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
                    {...register('telecom.0.value')}
                    placeholder="+01234567890"
                    className={`transition-all ${errors.telecom?.[0]?.value
                      ? 'border-red-500 focus:border-red-500'
                      : touchedFields.telecom?.[0]?.value
                        ? 'border-green-500 focus:border-green-500'
                        : ''
                      }`}
                  />
                  {errors.telecom?.[0]?.value && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-sm text-red-500 flex items-center gap-1"
                    >
                      <XCircle className="h-3 w-3" />
                      {errors.telecom[0].value?.message?.toString()}
                    </motion.p>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Información Personal Adicional */}
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="h-5 w-5 text-blue-500" />
                <h3 className="text-xl font-semibold text-gray-900">Información Adicional</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Fecha de Nacimiento */}
                <div className="space-y-2">
                  <Label htmlFor="birthDate" className="text-sm font-medium">
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

                {/* Género */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">
                    Género *
                  </Label>
                  <Controller
                    name="gender"
                    control={control}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger className="bg-white">
                          <SelectValue placeholder="Seleccionar género" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          <SelectItem value="male">Masculino</SelectItem>
                          <SelectItem value="female">Femenino</SelectItem>
                          <SelectItem value="other">Otro</SelectItem>
                          <SelectItem value="unknown">Prefiero no decirlo</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.gender && (
                    <p className="text-sm text-red-500">{errors.gender.message}</p>
                  )}
                </div>
              </div>
            </motion.div>





            {/* Seguridad */}
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="h-5 w-5 text-blue-500" />
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
                          ? 'border-blue-500 focus:border-blue-500'
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
                      {errors.password.message?.toString()}
                    </motion.p>
                  )}
                </div>

                {/* Confirmar Contraseña */}
                <div className="space-y-2">
                  <Label htmlFor="repeatpassword" className="text-sm font-medium">
                    Confirmar Contraseña *
                  </Label>
                  <div className="relative">
                    <Input
                      id="repeatpassword"
                      type={showConfirmPassword ? "text" : "password"}
                      {...register('repeatpassword')}
                      placeholder="••••••••"
                      className={`pr-10 transition-all ${errors.repeatpassword
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

                  {errors.repeatpassword && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-sm text-red-500 flex items-center gap-1"
                    >
                      <XCircle className="h-3 w-3" />
                      {errors.repeatpassword.message?.toString()}
                    </motion.p>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Botón de Submit */}
            <motion.div variants={itemVariants} className="pt-6">
              <Button
                type="submit"
                className="w-full h-12 text-lg font-medium bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-[1.02]"
                disabled={isSubmitting || formStatus === FormStatus.SUBMITTING}
              >
                {isSubmitting || formStatus === FormStatus.SUBMITTING ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Registrando Doctor...
                  </>
                ) : (
                  <>
                    <UserPlus className="mr-2 h-5 w-5" />
                    Registrar Doctor
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

export default DoctorRegister;