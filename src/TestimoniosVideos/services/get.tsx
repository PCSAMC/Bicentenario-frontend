import axios from 'axios';
import { DepartmentsResponse } from '../types/ciudadesData.types';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Asegúrate de que esta URL esté configurada en tu .env
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const DepartmentService = {
  /**
   * Obtiene todos los departamentos con sus ciudades.
   */
  getDepartments: async (): Promise<DepartmentsResponse> => {
    try {
      const response = await apiClient.get('/departaments');
      return response.data;
    } catch (error) {
      console.error('Error al obtener departamentos:', error);
      throw error;
    }
  },
};
