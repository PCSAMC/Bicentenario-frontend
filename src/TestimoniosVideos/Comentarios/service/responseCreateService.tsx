// post.ts
import axios from 'axios';
import { ResponseDataEnviar,RespuestaResponse } from '../types/comentariosData.types';

// ✅ Usar import.meta.env para Vite
const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});
export const CreateResponse = async (data: ResponseDataEnviar): Promise<RespuestaResponse> => {
    try {
        const response = await apiClient.post('/comments/response', data);
        return response.data;
    } catch (error) {
        console.error('Error creating comentario:', error);
        throw error;
    }
};