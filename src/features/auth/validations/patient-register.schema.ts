// src/features/auth/validations/patient-register.schema.ts
import { z } from 'zod';



export const patientRegisterSchema = z.object({
  firstName: z.string().min(2, "El nombre es requerido"),
  lastName: z.string().min(2, "El apellido es requerido"),
  email: z.string().email("Correo electrónico inválido"),
  phone: z.string().min(8, "Número de teléfono inválido"),
  birthDate: z.string().min(1, "La fecha de nacimiento es requerida"),
  gender: z.string().min(1, "Selecciona un género válido"),

  dni: z.string().optional(),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"]
});

export const patientFhirRegisterSchema = z.object({
  email: z.string().email("Correo electrónico inválido"),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
  repeatpassword: z.string(),
  birthDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Formato de fecha inválido (YYYY-MM-DD)"),
  gender: z.string().min(1, "Selecciona un género válido"),
  name: z.array(z.object({
    use: z.enum(['official', 'usual', 'nickname', 'anonymous', 'old', 'maiden']),
    text: z.string().min(1, "El nombre completo es requerido"),
    family: z.string().min(1, "El apellido es requerido"),
    given: z.array(z.string().min(1, "El nombre es requerido")),
    prefix: z.array(z.string()).optional(),
    suffix: z.array(z.string()).optional()
  })),
  telecom: z.array(z.object({
    id: z.string().optional(),
    system: z.enum(['phone', 'fax', 'email', 'pager', 'url', 'sms', 'other']),
    value: z.string().min(1, "El valor del contacto es requerido"),
    use: z.enum(['home', 'work', 'temp', 'old', 'mobile']),
    rank: z.number().min(1)
  }))
}).refine((data) => data.password === data.repeatpassword, {
  message: "Las contraseñas no coinciden",
  path: ["repeatpassword"]
});

export type PatientRegisterFormData = z.infer<typeof patientRegisterSchema>;
export type PatientFhirRegisterData = z.infer<typeof patientFhirRegisterSchema>;