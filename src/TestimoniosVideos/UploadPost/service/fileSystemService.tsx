// post.ts
import axios from 'axios';


const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL_FILE,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const uploadFile = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await apiClient.post('/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });

        return response.data; // Ajusta esto según la respuesta de tu API
    } catch (error) {
        console.error('Error uploading file:', error);
        throw error;
    }
};
