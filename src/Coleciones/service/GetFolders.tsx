import axios from 'axios';
import { GetFolderEnviar,GetFolderResponse } from '../types/foldersData.types';

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const GetFolderUser = async (data: GetFolderEnviar): Promise<GetFolderResponse> => {
    try {
        const response = await apiClient.get(`/user-folders/${data.idUser}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching respuestas:', error);
        throw error;
    }
};
