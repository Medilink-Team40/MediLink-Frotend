import axios from '@/utils/api';

interface HumanName {
  use: 'official' | 'usual' | 'nickname' | 'anonymous' | 'old' | 'maiden';
  text: string;
  family: string;
  given: string[];
  prefix?: string[];
  suffix?: string[];
}

interface ContactPoint {
  system: 'phone' | 'fax' | 'email' | 'pager' | 'url' | 'sms' | 'other';
  value: string;
  use: 'home' | 'work' | 'temp' | 'old' | 'mobile';
  rank: number;
}

interface PatientRegisterPayload {
  email: string;
  password: string;
  birthDate: string;
  gender: string;
  name: HumanName[];
  telecom: ContactPoint[];
}

interface PatientData {
  id: string;
  name: string;
  email: string;
  birthDate: string;
  gender: string;
  dni?: string;
}

export const PatientService = {
  async register(patientData: PatientRegisterPayload): Promise<any> {
    try {
      console.log('Enviando datos al backend:', patientData);

      const response = await axios.post('/patient', patientData);

      console.log('Respuesta del backend:', response.data);

      return {
        data: response.data,
        status: response.status,
        message: response.statusText
      }
    } catch (error: any) {
      console.error('Error en PatientService.register:', error.response?.data || error.message);

      return {
        error: {
          message: error.response?.data?.message || error.message,
          status: error.response?.status,
          details: error.response?.data
        },
        status: error.response?.status || 500,
      }
    }
  },

  async updateProfile(patientData: Partial<PatientData>): Promise<any> {
    try {
      const response = await axios.put('/patient/update', patientData);
      return {
        data: response.data,
        status: response.status,
        message: response.statusText
      }
    } catch (error: any) {
      return {
        error: {
          message: error.response?.data?.message || error.message,
          status: error.response?.status
        },
        status: error.response?.status || 500,
      }
    }
  },

  async getProfile(patientId: string): Promise<any> {
    try {
      const response = await axios.get(`/patient/${patientId}`);
      return {
        data: response.data,
        status: response.status,
        message: response.statusText
      }
    } catch (error: any) {
      return {
        error: {
          message: error.response?.data?.message || error.message,
          status: error.response?.status
        },
        status: error.response?.status || 500,
      }
    }
  },

  async getAppointments(patientId: string): Promise<any> {
    try {
      const response = await axios.get(`/patient/${patientId}/appointments`);
      return {
        data: response.data,
        status: response.status,
        message: response.statusText
      }
    } catch (error: any) {
      return {
        error: {
          message: error.response?.data?.message || error.message,
          status: error.response?.status
        },
        status: error.response?.status || 500,
      }
    }
  },

  async getMedicalHistory(patientId: string): Promise<any> {
    try {
      const response = await axios.get(`/patient/${patientId}/medical-history`);
      return {
        data: response.data,
        status: response.status,
        message: response.statusText
      }
    } catch (error: any) {
      return {
        error: {
          message: error.response?.data?.message || error.message,
          status: error.response?.status
        },
        status: error.response?.status || 500,
      }
    }
  },

  async getPrescriptions(patientId: string): Promise<any> {
    try {
      const response = await axios.get(`/patient/${patientId}/prescriptions`);
      return {
        data: response.data,
        status: response.status,
        message: response.statusText
      }
    } catch (error: any) {
      return {
        error: {
          message: error.response?.data?.message || error.message,
          status: error.response?.status
        },
        status: error.response?.status || 500,
      }
    }
  }
};

export default PatientService;