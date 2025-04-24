import { loginCredentials } from '../types/credentialsData.types';
import { registerData } from '../types/registerData.types'; 
import { AuthUser } from '../types/authUserData.type';
import axios from 'axios';

// ✅ Usar import.meta.env para Vite
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // 👈 Usa la variable correcta para Vite
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const loginUsuario = async (data: loginCredentials): Promise<AuthUser> => {
  try {
    const response = await apiClient.post('/auth/login', data);
    console.log('Login response:', data);
    return response.data;
  }catch (error) {
    if (axios.isAxiosError(error) && error.response?.data?.message) {
      alert(error.response.data.message);
    } else {
      alert('Error desconocido');
    }

    throw new Error('Error al registrar el usuario');
  }
};

export const registerUsuario = async (data: registerData): Promise<AuthUser> => {
  try {
    const response = await apiClient.post('/auth/register', data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data?.message) {
      alert(error.response.data.message);
    } else {
      alert('Error desconocido');
    }

    throw new Error('Error al registrar el usuario');
  }
};
