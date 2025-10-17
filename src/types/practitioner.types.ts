// src/types/practitioner.types.ts
export enum FHIRExternalGender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
  UNKNOWN = 'unknown'
}

export interface PractitionerName {
  use?: string;
  family: string;
  given: string[];
  prefix?: string[];
  suffix?: string[];
  text?: string;
}

export interface Telecom {
  system: string;
  value: string;
  use: string;
}[];

export interface PractitionerRegisterData {
  email: string;
  password: string;
  repeatpassword: string;
  birthDate: string;
  gender: FHIRExternalGender;
  name: PractitionerName[];
  telecom: Telecom[];
}