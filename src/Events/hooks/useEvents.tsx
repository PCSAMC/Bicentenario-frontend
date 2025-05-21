// hooks/useEvents.ts
import { useState, useEffect } from 'react';
import { Event, EventResponse } from '../types/EventosData.types'; // Asegúrate de que esto esté correctamente importado
import { fetchEvents } from '../services/eventService'; // Importamos la función que obtiene los eventos de la API

const useEvents = () => {
  const [events, setEvents] = useState<Event[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadEvents = async () => {
      setLoading(true);
      setError(null); // Reseteamos el error al hacer una nueva solicitud
      try {
        const response: EventResponse = await fetchEvents();
        setEvents(response.events); // Asumimos que `response.events` es un array de eventos
      } catch (err) {
        setError('No se pudieron cargar los eventos');
      } finally {
        setLoading(false); // Ya terminó la carga
      }
    };

    loadEvents(); // Solo lo cargamos al montar el componente
  }, []); // No dependencias, se ejecuta una sola vez cuando el componente se monta

  return { events, loading, error };
};

export default useEvents;
