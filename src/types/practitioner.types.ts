// src/types/practitioner.types.ts
export enum FHIRExternalGender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
  UNKNOWN = 'unknown'
}

export interface PractitionerName {
  use?: 'official' | 'usual' | 'temp' | 'nickname' | 'anonymous' | 'old' | 'maiden';
  family: string;
  given: string[];
  prefix?: string[];
  suffix?: string[];
  text?: string;
}

export interface Telecom {
  system: 'phone' | 'fax' | 'email' | 'pager' | 'url' | 'sms' | 'other';
  value: string;
  use: 'home' | 'work' | 'mobile' | 'temp' | 'old' | 'maiden';
  rank?: number;
}[];

export interface PractitionerRegisterData {
  email: string;
  password: string;
  repeatpassword: string;
  birthDate: string;
  gender: FHIRExternalGender;
  name: PractitionerName[];
  telecom: Telecom[];
  specialization?: string;
  licenseNumber?: string;
}


export interface Practitioner{
  id: string;
  keycloakId: string;
  email: string;
  birthDate: string;
  gender: FHIRExternalGender;
  name: PractitionerName[];
  telecom: Telecom[];
  specialization?: string;
  licenseNumber?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}


export const getPractitionerDisplayName = (names: PractitionerName[]): string => {
  const officialName = names.find(name => name.use === 'official') || names[0];
  return officialName.text || `${officialName.given.join(' ')} ${officialName?.family}` || '';
};

export const getPractitionerFamilyName = (names: PractitionerName[]): string => {
  const officialName = names.find(name => name.use === 'official') || names[0];
  return officialName?.family || '';
};

export const getPractitionerGivenNames = (names: PractitionerName[]): string[] => {
  const officialName = names.find(name => name.use === 'official') || names[0];
  return officialName?.given || [];
}

export const getPractitionerWorkPhone = (telecoms: Telecom[]): string => {
  const workPhone = telecoms.find(t => t.system === 'phone' && t.use === 'work');
  return workPhone?.value || '';
};

export const getPractitionerWorkEmail = (telecoms: Telecom[]): string => {
  const workEmail = telecoms.find(t => t.system === 'email' && t.use === 'work');
  return workEmail?.value || '';
};