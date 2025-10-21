export const ROLES = {
    ADMIN: 'admin',
    PACIENTE: 'paciente',
    DOCTOR: 'doctor'
} as const ;


export type Roles = typeof ROLES[keyof typeof ROLES];