import axios from 'axios';
import { UserDataEnviar,UserDataResponse } from '../types/PerfilData.types';

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const GetUserIdService = async (data: UserDataEnviar): Promise<UserDataResponse> => {
    try {
        const response = await apiClient.get(`/users/${data.id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching respuestas:', error);
        throw error;
    }
};
