import { useEffect, useState } from 'react';
import { ComentarioData } from '../types/comentariosData.types';
import { ResponseGet } from '../service/responseGetService';

interface UseResponseGetParams {
  idComment: string; // o number, según tipo real
}

export const useResponseGet = ({ idComment }: UseResponseGetParams) => {
  const [responses, setResponses] = useState<ComentarioData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!idComment) return; // evita llamada sin id

    const load = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await ResponseGet({ idComment: Number(idComment) });

        if (res && res.code === 200 && Array.isArray(res.responses)) {
          setResponses(res.responses);
        } else {
          throw new Error('Respuesta inválida del servidor');
        }
      } catch (e: any) {
        setError(e.message || 'Error al obtener respuestas');
        setResponses([]);
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [idComment]);

  return { responses, loading, error };
};
