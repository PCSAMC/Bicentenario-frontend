import { useState } from 'react';
import { ComentDataEnviar,ComentarioResponseCreate } from '../types/comentariosData.types';
import { createComentario } from '../service/comentarioCrearServicr';  // Asegúrate de que esta ruta sea correcta


export const useCreateComment = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleCreateComment = async (data:ComentDataEnviar) => {
    try {
      setLoading(true);
      setError('');
      setSuccess(false);
      // Llamada al servicio para crear el testimonio
      const response = await createComentario(data);
     
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

  return { handleCreateComment, loading, error, success };
};
