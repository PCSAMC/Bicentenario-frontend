import React from 'react';
import { Mic } from 'lucide-react';

interface VoiceSearchButtonProps {
  isListening: boolean;
  onClick: () => void;
}

export const VoiceSearchButton: React.FC<VoiceSearchButtonProps> = ({ isListening, onClick }) => {
  return (
    <button 
      className={`p-2 rounded-full ${isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-gray-100 text-gray-700'}`}
      onClick={onClick}
      aria-label="Búsqueda por voz"
    >
      <Mic size={20} />
    </button>
  );
};
