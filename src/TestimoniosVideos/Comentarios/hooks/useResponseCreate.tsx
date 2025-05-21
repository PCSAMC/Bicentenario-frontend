import { useState } from 'react';
import { ResponseDataEnviar,RespuestaResponse } from '../types/comentariosData.types';
import {CreateResponse} from '../service/responseCreateService';  // Asegúrate de que esta ruta sea correcta


export const useCreateResponse = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleCreateResponse = async (data:ResponseDataEnviar) => {
    try {
      setLoading(true);
      setError('');
      setSuccess(false);
      // Llamada al servicio para crear el testimonio
      const response = await CreateResponse(data);
     
      if (response && response.code === 200) {
        console.log('commentario creado con éxito:', response.message);
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

  return { handleCreateResponse, loading, error, success };
};
