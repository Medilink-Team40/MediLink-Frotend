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
      use: z.string().optional(),
      family: z.string({ message: "Apellido requerido" }),
      given: z.array(z.string()),
      prefix: z.array(z.string()).optional(),
      suffix: z.array(z.string()).optional(),
      text: z.string().optional(),
    })
  ),
  
  telecom: z.array(
    z.object({
      system: z.string(),
      value: z.string({ message: "Valor requerido" }),
      use: z.string(),
      rank: z.number().optional(),
    })
  ),
}).refine((data) => data.password === data.repeatpassword, {
  message: "Las contraseñas no coinciden",
  path: ["repeatpassword"],
});

// Infiere el tipo
export type PractitionerRegisterFormData = z.infer<typeof practitionerRegisterSchema>;