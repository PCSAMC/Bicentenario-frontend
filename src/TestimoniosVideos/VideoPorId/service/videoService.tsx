// services/videoService.ts
import axios from 'axios';
import { Video } from '../types/VideosData.types'; 

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL, 
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Función para obtener un video por ID
export const getVideoById = async (id: number): Promise<Video> => {
  try {
    const response = await apiClient.get(`/posts/${id}`);
    return response.data.post; 
  } catch (error) {
    throw new Error('Error al obtener el video');
  }
};
