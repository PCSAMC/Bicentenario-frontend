import React from 'react';
import { Sliders } from 'lucide-react';

interface FilterButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export const FilterButton: React.FC<FilterButtonProps> = ({ isOpen, onClick }) => {
  return (
    <button 
      className={`p-2 rounded-full ${isOpen ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'}`}
      onClick={onClick}
      aria-label="Filtros de búsqueda"
    >
      <Sliders size={20} />
    </button>
  );
};
