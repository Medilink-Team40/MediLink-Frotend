

export enum FHIRExternalGender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
  UNKNOWN = 'unknown'
}
interface PatientData {
 name: string,
 email: string,
 password: string,
 repeatpassword: string,
 birthDate: string,
 gender: string | FHIRExternalGender,   
}

export default PatientData;
