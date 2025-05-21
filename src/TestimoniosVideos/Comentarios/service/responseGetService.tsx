import axios from 'axios';
import { ResponseParamsGet, ResponseResponseGet } from '../types/comentariosData.types';

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// data: { idComment: string }
export const ResponseGet = async (data: ResponseParamsGet): Promise<ResponseResponseGet> => {
    console.log('data', data.idComment);
    try {
        const response = await apiClient.get(`/comments/responses/${data.idComment}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching respuestas:', error);
        throw error;
    }
};
