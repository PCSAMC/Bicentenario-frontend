import axios from 'axios';
import {DepartamentDataResponse} from '../types/DepartamentsData.types';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const GetDepartments = async (): Promise<DepartamentDataResponse | undefined> => {
  try {
    const response = await apiClient.get('/Departaments');
    return response.data;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};
