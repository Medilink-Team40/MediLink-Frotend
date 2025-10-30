import axios from '@/utils/api';
import { PractitionerRegisterData } from '@/types/practitioner.types';

export const practitionerService = {
  /**
   * Registrar un nuevo profesional medico
   * POST /practitioner/register-practitioner
   */
  async register(practitionerData: PractitionerRegisterData): Promise<any> {
    try {
      console.log('Enviando a backend:', practitionerData);
      const response = await axios.post('/practitioner/register-practitioner', practitionerData);
      console.log('Respuesta completa:', {
        status: response.status,
        statusText: response.statusText,
        data: response.data
      });

      return {
        data: response.data,
        status: response.status,
        message: 'Profesional registrado exitosamente'
      };
    } catch (error: any) {
      console.error('Error al registrar practitioner:', error.response?.data || error.message);
      return {
        error: {
          message: error.response?.data?.message || error.message,
          status: error.response?.status,
          details: error.response?.data
        },
        status: error.response?.status || 500,
      };
    }
  },

  /**
   * Obtener mi perfil (practitioner autenticado)
   * GET /practitioner/me
   */
  async getMyProfile(): Promise<any> {
    try {
      console.log('Obteniendo mi perfil de practitioner');
      const response = await axios.get('/practitioner/me');
      console.log('Mi perfil obtenido:', response.data);

      return {
        data: response.data,
        status: response.status,
        message: response.statusText
      };
    } catch (error: any) {
      console.error('Error al obtener mi perfil:', error.response?.data || error.message);
      return {
        error: {
          message: error.response?.data?.message || error.message,
          status: error.response?.status
        },
        status: error.response?.status || 500,
      };
    }
  },

  /**
   * Actualizar perfil del practitioner
   * PATCH /practitioner/update-profile
   */
  async update(practitionerId: string, practitionerData: Partial<PractitionerRegisterData>): Promise<any> {
    try {
      console.log('Actualizando practitioner:', practitionerId, practitionerData);
      const response = await axios.patch('/practitioner/update-profile', practitionerData);
      console.log('Practitioner actualizado exitosamente:', response.data);

      return {
        data: response.data,
        status: response.status,
        message: 'Practitioner actualizado exitosamente'
      };
    } catch (error: any) {
      console.error('Error al actualizar practitioner:', error.response?.data || error.message);
      return {
        error: {
          message: error.response?.data?.message || error.message,
          status: error.response?.status
        },
        status: error.response?.status || 500,
      };
    }
  },

  /**
   * Obtener profesional por ID
   * GET /practitioner/{id}
   */
  async getProfile(practitionerId: string): Promise<any> {
    try {
      console.log('Obteniendo perfil de practitioner:', practitionerId);
      const response = await axios.get(`/practitioner/${practitionerId}`);
      console.log('Perfil obtenido:', response.data);

      return {
        data: response.data,
        status: response.status,
        message: response.statusText
      };
    } catch (error: any) {
      console.error('Error al obtener perfil:', error.response?.data || error.message);
      return {
        error: {
          message: error.response?.data?.message || error.message,
          status: error.response?.status
        },
        status: error.response?.status || 500,
      };
    }
  },

  /**
   * Obtener todos los profesionales
   * GET /practitioners
   */
  async getAll(filters?: any): Promise<any> {
    try {
      const response = await axios.get('/practitioners', { params: filters });
      return {
        data: response.data,
        status: response.status,
        message: response.statusText
      };
    } catch (error: any) {
      return {
        error: {
          message: error.response?.data?.message || error.message,
          status: error.response?.status
        },
        status: error.response?.status || 500,
      };
    }
  },

  /**
   * Obtener citas del practitioner
   * GET /appointments/doctor/{practitionerId}
   */
  async getAppointments(practitionerId: string): Promise<any> {
    try {
      console.log('Obteniendo citas del practitioner:', practitionerId);
      const response = await axios.get(`/appointments/doctor/${practitionerId}`);
      console.log('Citas obtenidas:', response.data);

      return {
        data: response.data,
        status: response.status,
        message: response.statusText
      };
    } catch (error: any) {
      console.error('Error al obtener citas:', error.response?.data || error.message);
      return {
        error: {
          message: error.response?.data?.message || error.message,
          status: error.response?.status
        },
        status: error.response?.status || 500,
      };
    }
  },

  /**
   * Obtener profesionales por especialidad
   * GET /practitioners/specialization/{specialization}
   */
  async getBySpecialization(specialization: string): Promise<any> {
    try {
      const response = await axios.get(`/practitioners/specialization/${specialization}`);
      return {
        data: response.data,
        status: response.status,
        message: response.statusText
      };
    } catch (error: any) {
      return {
        error: {
          message: error.response?.data?.message || error.message,
          status: error.response?.status
        },
        status: error.response?.status || 500,
      };
    }
  },

  /**
   * Buscar practitioners
   * GET /practitioner/search?query={query}
   */
  async searchPractitioners(query: string): Promise<any> {
    try {
      console.log('Buscando practitioners con query:', query);
      const response = await axios.get('/practitioner/search', {
        params: { query }
      });
      console.log('Practitioners encontrados:', response.data);

      return {
        data: response.data,
        status: response.status,
        message: response.statusText
      };
    } catch (error: any) {
      console.error('Error al buscar practitioners:', error.response?.data || error.message);
      return {
        error: {
          message: error.response?.data?.message || error.message,
          status: error.response?.status
        },
        status: error.response?.status || 500,
      };
    }
  },

  /**
   * Eliminar profesional
   * DELETE /practitioners/{practitionerId}
   */
  async delete(practitionerId: string): Promise<any> {
    try {
      const response = await axios.delete(`/practitioners/${practitionerId}`);
      return {
        data: response.data,
        status: response.status,
        message: 'Profesional eliminado exitosamente'
      };
    } catch (error: any) {
      return {
        error: {
          message: error.response?.data?.message || error.message,
          status: error.response?.status
        },
        status: error.response?.status || 500,
      };
    }
  }
};

export default practitionerService;