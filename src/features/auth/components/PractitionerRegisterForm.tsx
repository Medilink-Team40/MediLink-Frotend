// src/features/auth/components/PractitionerRegisterForm.tsx

import { useState } from 'react';
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FHIRExternalGender } from '@/types/practitioner.types';
import { practitionerRegisterSchema, PractitionerRegisterFormData } from '@/features/auth/validations/practitioner-register.schema';
import { Eye, EyeOff } from 'lucide-react';
import axios from '@/lib/api/axiosConfig';




export const PractitionerRegisterForm = () => {

  const [showPassword, setShowPassword] = useState(false);



  type PractitionerRegisterData = z.infer<typeof practitionerRegisterSchema>


  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<PractitionerRegisterFormData>({
    resolver: zodResolver(practitionerRegisterSchema),
    defaultValues: {
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
      gender: FHIRExternalGender.UNKNOWN,
      email: '',
      password: '',
      repeatpassword: '',
      birthDate: '',
    },
  });

  const onSubmit: SubmitHandler<PractitionerRegisterFormData> = async (data) => {
    try {
      const payload: PractitionerRegisterData = {
        email: data.email,
        password: data.password,
        repeatpassword: data.repeatpassword,
        birthDate: data.birthDate,
        gender: data.gender,
        name: data.name.map((n) => ({
          use: n.use ?? 'official',
          family: n.family,
          given: n.given,
          prefix: n.prefix ?? [],
          suffix: n.suffix ?? [],
          text: n.text || `${n.given.join(' ')} ${n.family}`.trim()
        })),
        telecom: data.telecom.map((t) => ({
          system: t.system ?? 'phone',
          value: t.value,
          use: t.use ?? 'work',
          rank: t.rank ?? 1,
        })),
      };
      const { data: response } = await axios.post(
        `${import.meta.env.VITE_API_URL}/practitioners/register`,
        payload,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log(" Registro exitoso:", response);

    } catch (error: any) {
      setError("root", {
        type: "manual",
        message: error.response?.data?.message || "Ocurrió un error inesperado.",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Nombres */}
        <div className="space-y-2">
          <Label htmlFor="given">Nombres</Label>
          <Input
            id="given"
            type="text"
            {...register('name.0.given.0')}
            placeholder="Juan"
          />
          {errors.name?.[0]?.given?.[0] && (
            <p className="text-sm text-red-500">
              {errors.name[0].given[0]?.message?.toString()}
            </p>
          )}
        </div>

        {/* Apellido */}
        <div className="space-y-2">
          <Label htmlFor="family">Apellido</Label>
          <Input
            id="family"
            type="text"
            {...register('name.0.family')}
            placeholder="Pérez"
          />
          {errors.name?.[0]?.family && (
            <p className="text-sm text-red-500">
              {errors.name[0].family?.message?.toString()}
            </p>
          )}
        </div>
        {/* Campos para prefix y suffix */}
         
          <div className="space-y-2">
          <Label htmlFor="prefix">Título (opcional)</Label>
          <Input
            id="prefix"
            type="text"
            {...register('name.0.prefix.0')}
            placeholder="Ej: odontologo, medico"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="suffix">Sufijo (opcional)</Label>
          <Input
            id="suffix"
            type="text"
            {...register('name.0.suffix.0')}
            placeholder="Ej: Jr., Sr., PhD"
          />

        </div> 

         

          {/* Correo Electrónico */}
          <div className="space-y-2">
            <Label htmlFor="email">Correo Electrónico</Label>
            <Input id="email" type="email" {...register('email')} placeholder="juan.perez@example.com" />
            {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
          </div>

          {/* Fecha de Nacimiento */}
          <div className="space-y-2">
            <Label htmlFor="birthDate">Fecha de Nacimiento</Label>
            <Input id="birthDate" type="date" {...register('birthDate')} />
            {errors.birthDate && <p className="text-sm text-red-500">{errors.birthDate.message}</p>}
          </div>

          {/* Género */}
          <div className="space-y-2">
            <Label>Género</Label>
            <select
              {...register('gender')}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value={FHIRExternalGender.MALE}>Masculino</option>
              <option value={FHIRExternalGender.FEMALE}>Femenino</option>
              <option value={FHIRExternalGender.OTHER}>Otro</option>
              <option value={FHIRExternalGender.UNKNOWN}>Prefiero no decirlo</option>
            </select>
            {errors.gender && (
              <p className="text-sm text-red-500">
                {errors.gender.message?.toString()}
              </p>
            )}
          </div>

          {/* Teléfono */}
          <div className="space-y-2">
            <Label htmlFor="phone">Teléfono</Label>
            <Input
              id="phone"
              type="tel"
              {...register('telecom.0.value')}
              placeholder="+56 9 1234 5678"
            />
            {errors.telecom?.[0]?.value && (
              <p className="text-sm text-red-500">
                {errors.telecom[0].value?.message?.toString()}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Contraseña</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"} 
                {...register('password')}
                placeholder="••••••••"
                className="pr-10" 
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
                aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            {errors.password && (
              <p className="text-sm text-red-500">
                {errors.password.message?.toString()}
              </p>
            )}
          </div>


          <div className="space-y-2">
            <Label htmlFor="repeatpassword">Confirmar Contraseña</Label>
            <div className="relative">
              <Input
                id="repeatpassword"
                type={showPassword ? "text" : "password"}
                {...register('repeatpassword')}
                placeholder="••••••••"
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
                aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            {errors.repeatpassword && (
              <p className="text-sm text-red-500">
                {errors.repeatpassword.message?.toString()}
              </p>
            )}
          </div>
        </div>

        {errors.root && (
          <div className="mt-4 text-center text-sm text-red-500">
            {errors.root.message}
          </div>
        )}

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Registrando...' : 'Registrarse'}
        </Button>
    </form>
  );
};