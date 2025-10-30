

export enum FHIRExternalGender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
  UNKNOWN = 'unknown'
}

interface HumanName {
  use: 'official' | 'nickname' | 'anonymous' | 'old' | 'maiden';
  text: string;
  family: string;
  given: string[];
  prefix?: string[];
  suffix?: string[];
}

interface ContactPoint {
  id?: string;
  system: 'phone' | 'fax' | 'email' | 'pager' | 'url' | 'sms' | 'other';
  value: string;
  use?: 'home' | 'work' | 'temp' | 'old' | 'mobile';
  rank?: number;
  period?: {
    start?: string;
    end?: string;
  };
}

export interface PatientRegisterData {
 email: string,
 password: string,
 repeatpassword: string,
 birthDate: string,
 gender: string | FHIRExternalGender,
 name: HumanName[],
 telecom?: ContactPoint[],

}

interface PatientFormData {
  firstName: string;       
  lastName: string;
  email: string;
  password?: string;
  repeatpassword?: string;
  birthDate: string;
  gender: string | FHIRExternalGender;
  name: HumanName[];
  phone: string;
  dni?: string;

}

export type { HumanName, ContactPoint, PatientFormData}

export default PatientRegisterData;
