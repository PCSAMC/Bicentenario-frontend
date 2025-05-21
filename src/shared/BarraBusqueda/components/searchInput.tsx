import React from 'react';
import { Search, X } from 'lucide-react';

interface SearchInputProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  placeholder?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({ 
  searchTerm, 
  setSearchTerm, 
  placeholder = "Buscar contenido sobre Bolivia..." 
}) => {
  const clearSearch = () => {
    setSearchTerm('');
  };

  return (
    <div className="relative flex-grow">
      <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2">
        <Search className="text-gray-500 w-5 h-5" />
        <input
          type="text"
          placeholder={placeholder}
          className="bg-transparent border-none outline-none w-full ml-2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <button onClick={clearSearch} className="text-gray-500">
            <X size={18} />
          </button>
        )}
      </div>
    </div>
  );
};
