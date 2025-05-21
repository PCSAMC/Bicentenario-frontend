import { RestorePasswordEnviar,RestorePasswordResponse } from '../types/ContrasenaRecuperarData.type';
import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const RestorePassword = async (data: RestorePasswordEnviar): Promise<RestorePasswordResponse> => {
    try {
        const response = await apiClient.put('/auth/change-password', data);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.data?.message) {
        alert(error.response.data.message);
        } else {
        alert('Error desconocido');
        }
    
        throw new Error('Error al registrar el usuario');
    }


}
