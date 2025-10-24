// src/features/auth/validations/patient-register.schema.ts
import { z } from 'zod';

export const patientRegisterSchema = z.object({
  firstName: z.string().min(2, "El nombre es requerido"),
  lastName: z.string().min(2, "El apellido es requerido"),
  email: z.string().email("Correo electrónico inválido"),
  phone: z.string().min(8, "Número de teléfono inválido"),
  birthDate: z.string().min(1, "La fecha de nacimiento es requerida"),
  gender: z.enum(['male', 'female', 'other', 'unknown']),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"]
});

export type PatientRegisterFormData = z.infer<typeof patientRegisterSchema>;