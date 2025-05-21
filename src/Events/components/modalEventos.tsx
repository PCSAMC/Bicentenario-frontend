import React, { useState } from 'react';
import { Event } from '../types/EventosData.types';
import useEvents from '../hooks/useEvents';

interface EventSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectEvent: (event: Event) => void;
}

export const EventSelectionModal: React.FC<EventSelectionModalProps> = ({
  isOpen,
  onClose,
  onSelectEvent,
}) => {
  const { events, loading, error } = useEvents();
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const handleEventSelect = (event: Event) => {
    setSelectedEvent(event);
  };

  const handleConfirmSelection = () => {
    if (selectedEvent) {
      onSelectEvent(selectedEvent);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-blue-50 bg-opacity-90 backdrop-blur-sm transition-opacity" onClick={onClose}>
      <div 
        className="relative w-full max-w-3xl max-h-[90vh] overflow-auto m-4 bg-white rounded-xl shadow-2xl transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800">Seleccionar un Evento</h2>
        </div>

        {/* Body */}
        <div className="p-6">
          {/* Loading and error states */}
          {loading && (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              <p className="ml-3 text-lg text-blue-500 font-medium">Cargando eventos...</p>
            </div>
          )}
          
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
              <p>{error}</p>
            </div>
          )}

          {/* Events grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-4">
            {events?.map((event) => (
              <div
                key={event.id}
                onClick={() => handleEventSelect(event)}
                className={`
                  cursor-pointer group relative overflow-hidden rounded-lg transition-all duration-300
                  border-2 shadow-md hover:shadow-lg p-4 h-48
                  ${selectedEvent?.id === event.id 
                    ? 'border-blue-500 bg-blue-50 transform scale-[1.02]' 
                    : 'border-gray-200 bg-white hover:bg-gray-50'}
                `}
              >
                {/* Selected badge */}
                {selectedEvent?.id === event.id && (
                  <div className="absolute -top-1 -right-1">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 ring-2 ring-white">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </div>
                )}
                
                <div className="flex flex-col h-full">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">{event.title}</h3>
                  <p className="text-gray-600 text-sm line-clamp-3 flex-grow">{event.description}</p>
                  
                  {/* Selection indicator at bottom */}
                  <div className="mt-4 pt-2 border-t border-gray-100">
                    <span 
                      className={`inline-flex items-center text-xs font-medium transition-colors
                      ${selectedEvent?.id === event.id 
                        ? 'text-blue-600' 
                        : 'text-gray-500 group-hover:text-blue-500'}
                      `}
                    >
                      {selectedEvent?.id === event.id ? 'Seleccionado' : 'Hacer clic para seleccionar'}
                      <svg xmlns="http://www.w3.org/2000/svg" className="ml-1 h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Empty state */}
          {events?.length === 0 && !loading && !error && (
            <div className="text-center py-10">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900">No hay eventos disponibles</h3>
              <p className="mt-1 text-gray-500">No se encontraron eventos para mostrar.</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-100">
          <button 
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            Cancelar
          </button>
          <button 
            onClick={handleConfirmSelection}
            disabled={!selectedEvent}
            className={`px-4 py-2 text-sm font-medium text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors
              ${!selectedEvent 
                ? 'bg-blue-400 cursor-not-allowed opacity-60' 
                : 'bg-blue-600 hover:bg-blue-700'}
            `}
          >
            Confirmar Selección
          </button>
        </div>
      </div>
    </div>
  );
};