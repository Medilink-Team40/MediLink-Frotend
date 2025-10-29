export const ROLES = {
  ADMIN: 'admin',
  DOCTOR: 'practitioner', 
  PACIENTE: 'patient',
} as const;


export type Roles = typeof ROLES[keyof typeof ROLES];