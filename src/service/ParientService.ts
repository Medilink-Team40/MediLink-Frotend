import axios from '@/lib/api/axiosConfig';
import { FHIRExternalGender } from '@/types/patient.types';


interface PatientData {
    name: string;
    email: string;
    password: string;
    repeatpassword: string;
    birthDate: string;
    gender: FHIRExternalGender;
    dni: string;
}


export const registerPatient = {


    /**
     * Registro de un nuevo paciente
     * @param PatientData 
     * @returns 
     */
    async register(PatientData: PatientData ): Promise<any>{
        try{
            const response = await axios.post('/api/patient/register', PatientData);
            return {
                data: response.data,
                status: response.status,
                message: response.statusText

            } 
        }catch(error:any){
            return{
                error:{
                    message: error.message,
                    status: error.response?.status
                },
                status: error.response?.status || 500,
            }
            throw error;
        }
    },

    /**
     * Actualizar el perfil del paciente
     */

    async updateProfile(PatientData: PatientData): Promise<any>{
        try{
            const response = await axios.put('/api/patient/update', PatientData);
            return {
                data: response.data,
                status: response.status,
                message: response.statusText

            } 
        }catch(error:any){
            return{
                error:{
                    message: error.message,
                    status: error.response?.status
                },
                status: error.response?.status || 500,
            }
            throw error;
        }
    },

    /**
     * Obtener los datos del perfil del paciente
     */

    async getProfile(patientId: string): Promise<any>{
        try{
            const response = await axios.get(`/api/patient/${patientId}`);
            return {
                data: response.data,
                status: response.status,
                message: response.statusText
            } 
        }catch(error:any){
            return{
                error:{
                    message: error.message,
                    status: error.response?.status
                },
                status: error.response?.status || 500,
            }
            throw error;
        }
    }
}