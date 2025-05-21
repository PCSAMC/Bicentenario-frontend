import { useEffect, useState } from 'react';
import { ComentarioData, CommentsParamsGet } from '../types/comentariosData.types';
import { GetComments } from '../service/commentsgetService';

export const useCommentsGet = (filters: CommentsParamsGet) => {
  const [comments, setComments] = useState<ComentarioData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      console.log('Loading comments with filters:', filters);
      try {
        setLoading(true);
        const res = await GetComments(filters); // ✅ llamado correcto al servicio

        if (res && res.code === 200) {
          setComments(res.comments);
        } else {
          throw new Error(res?.message || 'Respuesta inválida del servidor');
        }
      } catch (e: any) {
        setError(e.message || 'Error al obtener comentarios');
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    load(); // ✅ importante: llamar a la función
  }, [filters]); // ✅ vuelve a cargar si cambian los filtros

  return { comments, loading, error };
};
