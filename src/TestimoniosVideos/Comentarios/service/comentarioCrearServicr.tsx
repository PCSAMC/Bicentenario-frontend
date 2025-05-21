// post.ts
import axios from 'axios';
import { ComentarioResponseCreate,ComentDataEnviar } from '../types/comentariosData.types';

// ✅ Usar import.meta.env para Vite
const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});
export const createComentario = async (data: ComentDataEnviar): Promise<ComentarioResponseCreate> => {
    try {
        const response = await apiClient.post('/comments', data);
        return response.data;
    } catch (error) {
        console.error('Error creating comentario:', error);
        throw error;
    }
};