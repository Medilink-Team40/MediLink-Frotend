import { z } from 'zod';
import { FHIRExternalGender } from '@/types/practitioner.types';

export const practitionerRegisterSchema = z.object({
  email: z
    .string({ message: "El email es requerido" })
    .email("Email inválido"),

  password: z
    .string({ message: "La contraseña es requerida" })
    .min(8, "Mínimo 8 caracteres"),

  repeatpassword: z
    .string({ message: "Confirma tu contraseña" }),

  birthDate: z
    .string({ message: "La fecha de nacimiento es requerida" }),

  gender: z.nativeEnum(FHIRExternalGender, {
    message: "Selecciona un género válido"
  }),

  name: z.array(
    z.object({
      use: z.enum(['official', 'usual', 'temp', 'nickname', 'anonymous', 'old', 'maiden']).optional(),
      family: z.string({ message: "Apellido requerido" }),
      given: z.array(z.string().min(1, "Al menos un nombre es requerido")),
      prefix: z.array(z.string()).optional(),
      suffix: z.array(z.string()).optional(),
      text: z.string().optional(),
    })
  ),

  telecom: z.array(
    z.object({
      system: z.enum(['phone', 'fax', 'email', 'pager', 'url', 'sms', 'other']),
      value: z.string({ message: "Valor requerido" }),
      use: z.enum(['home', 'work', 'mobile', 'temp', 'old', 'maiden']),
      rank: z.number().optional(),
    })
  ),
 specialization: z.string().min(1, 'La especialización es requerida'),
  licenseNumber: z.string().min(6, 'Número de licencia debe tener al menos 6 caracteres'),
  professionalId: z.string().optional(),
  workplace: z.string().optional(),
}).refine((data) => data.password === data.repeatpassword, {
  message: "Las contraseñas no coinciden",
  path: ["repeatpassword"],
});

// Infiere el tipo
export type PractitionerRegisterFormData = z.infer<typeof practitionerRegisterSchema>;