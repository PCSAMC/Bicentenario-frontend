// post.ts
import axios from 'axios';
import { CrearTestimonioData } from '../types/crearTestimonioData.types';

// ✅ Usar import.meta.env para Vite
const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const createTestimonio = async (data: CrearTestimonioData, token: string): Promise<any> => {
    try {
        const response = await apiClient.post('/posts', data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error creating testimonio:', error);
        throw error;
    }
   
};
