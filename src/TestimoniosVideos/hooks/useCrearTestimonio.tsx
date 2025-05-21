import { useState } from 'react';
import { CrearTestimonioData } from '../types/crearTestimonioData.types';
import { testimonioService } from '../services/testimonioServices';  // Asegúrate de que esta ruta sea correcta
import { Code } from 'lucide-react';

export const useCrearTestimonio = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleCrearTestimonio = async (data: Omit<CrearTestimonioData, 'token'>) => {
    try {
      setLoading(true);
      setError('');
      setSuccess(false);

      const dataUser = localStorage.getItem('user');
      const convertido = JSON.parse(dataUser || '{}');
      const token = convertido.token; // Asegúrate de que el token esté en el objeto

      console.log('token:', token);  // Verifica si el token se obtiene correctamente

      if (!token) {
        setError('No hay token de autenticación');
        return;
      }

      // Crear el objeto de datos completo para enviar (sin el token aquí, lo agregamos en el header)
      const testimonioData: CrearTestimonioData = {
        ...data,
        token,
      };

      // Llamada al servicio para crear el testimonio
      const response = await testimonioService.crearTestimonio(testimonioData, token);
     
      if (response && response.code === 201) {
        console.log('Testimonio creado con éxito:', response.message);
        setSuccess(true);
      
      } else {
        setError(`Error: ${response?.message || 'Error desconocido'}`);
      }
    } catch (err) {
      setError('Error al crear testimonio');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return { handleCrearTestimonio, loading, error, success };
};
