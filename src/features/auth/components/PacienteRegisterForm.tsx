// src/features/auth/components/PacienteRegisterForm.tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { PatientRegisterFormData, patientRegisterSchema } from '@/features/auth/validations/patient-register.schema';

export const PacienteRegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PatientRegisterFormData>({
    resolver: zodResolver(patientRegisterSchema),
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

  const onSubmit = async (data: PatientRegisterFormData) => {
    console.log('Form data:', data);
    // Add your form submission logic here
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* First Name */}
        <div className="space-y-2">
          <Label htmlFor="firstName">Nombres</Label>
          <Input
            id="firstName"
            type="text"
            {...register('firstName')}
            placeholder="Juan"
          />
          {errors.firstName && (
            <p className="text-sm text-red-500">
              {errors.firstName.message}
            </p>
          )}
        </div>

        {/* Last Name */}
        <div className="space-y-2">
          <Label htmlFor="lastName">Apellido</Label>
          <Input
            id="lastName"
            type="text"
            {...register('lastName')}
            placeholder="Pérez"
          />
          {errors.lastName && (
            <p className="text-sm text-red-500">
              {errors.lastName.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email">Correo Electrónico</Label>
          <Input
            id="email"
            type="email"
            {...register('email')}
            placeholder="juan.perez@example.com"
          />
          {errors.email && (
            <p className="text-sm text-red-500">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <Label htmlFor="phone">Teléfono</Label>
          <Input
            id="phone"
            type="tel"
            {...register('phone')}
            placeholder="+56 9 1234 5678"
          />
          {errors.phone && (
            <p className="text-sm text-red-500">
              {errors.phone.message}
            </p>
          )}
        </div>

        {/* Birth Date */}
        <div className="space-y-2">
          <Label htmlFor="birthDate">Fecha de Nacimiento</Label>
          <Input
            id="birthDate"
            type="date"
            {...register('birthDate')}
          />
          {errors.birthDate && (
            <p className="text-sm text-red-500">
              {errors.birthDate.message}
            </p>
          )}
        </div>

        {/* Gender */}
        <div className="space-y-2">
          <Label>Género</Label>
          <select
            {...register('gender')}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <option value="male">Masculino</option>
            <option value="female">Femenino</option>
            <option value="other">Otro</option>
            <option value="unknown">Prefiero no decirlo</option>
          </select>
          {errors.gender && (
            <p className="text-sm text-red-500">
              {errors.gender.message}
            </p>
          )}
        </div>

        {/**DNI */}
        <div className="space-y-2">
          <Label htmlFor="dni">DNI</Label>
          <Input
            id="dni"
            type="text"
            {...register('dni')}
            placeholder="12345678"
          />
          {errors.dni && (
            <p className="text-sm text-red-500">
              {errors.dni.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-2">
          <Label htmlFor="password">Contraseña</Label>
          <Input
            id="password"
            type="password"
            {...register('password')}
            placeholder="••••••••"
          />
          {errors.password && (
            <p className="text-sm text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
          <Input
            id="confirmPassword"
            type="password"
            {...register('confirmPassword')}
            placeholder="••••••••"
          />
          {errors.confirmPassword && (
            <p className="text-sm text-red-500">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
      </div>

      <Button type="submit" className="w-full">
        Registrarse
      </Button>
    </form>
  );
};


export default PacienteRegisterForm