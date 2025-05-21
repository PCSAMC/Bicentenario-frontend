import React, { useState } from 'react';
import useTags from '../hooks/useTags';
import { tags } from '../types/tagsDatos.types';

interface TagsSelectionContainerProps {
  onTagsSelect: (selectedTags: tags[]) => void;
}

export const TagsSelectionContainer: React.FC<TagsSelectionContainerProps> = ({
  onTagsSelect,
}) => {
  const { tags: tagsList, loading, error } = useTags();
  const [selectedTags, setSelectedTags] = useState<tags[]>([]);

  const handleTagToggle = (tag: tags) => {
    // Verificar si el tag ya está seleccionado
    const isSelected = selectedTags.some(selectedTag => selectedTag.id === tag.id);
    
    if (isSelected) {
      // Si ya está seleccionado, lo removemos
      setSelectedTags(selectedTags.filter(selectedTag => selectedTag.id !== tag.id));
    } else {
      // Si no está seleccionado, lo agregamos
      setSelectedTags([...selectedTags, tag]);
    }
  };

  // Efecto para notificar cuando cambian los tags seleccionados
  React.useEffect(() => {
    onTagsSelect(selectedTags);
  }, [selectedTags, onTagsSelect]);

  return (
    <div className="bg-white rounded-xl shadow-md p-4 border border-gray-200">
      {/* Header */}
      <div className="mb-4 border-b border-gray-100 pb-2">
        <h2 className="text-lg font-bold text-gray-800">Seleccionar Tags</h2>
        <p className="text-sm text-gray-500">
          {selectedTags.length > 0 
            ? `${selectedTags.length} tag(s) seleccionado(s)` 
            : "Ningún tag seleccionado"}
        </p>
      </div>

      {/* Content */}
      <div className="space-y-4">
        {/* Loading state */}
        {loading && (
          <div className="flex items-center justify-center py-4">
            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
            <p className="ml-3 text-sm text-blue-500">Cargando tags...</p>
          </div>
        )}
        
        {/* Error state */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-3 text-sm rounded">
            <p>{error}</p>
          </div>
        )}

        {/* Tags grid */}
        <div className="flex flex-wrap gap-2">
          {tagsList?.map((tag: tags) => (
            <button
              key={tag.id}
              onClick={() => handleTagToggle(tag)}
              className={`
                px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200
                ${selectedTags.some(selectedTag => selectedTag.id === tag.id)
                  ? 'bg-blue-100 text-blue-800 border-2 border-blue-500'
                  : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'}
              `}
            >
              {tag.name}
            </button>
          ))}
        </div>
        
        {/* Empty state */}
        {tagsList?.length === 0 && !loading && !error && (
          <div className="text-center py-6">
            <svg className="mx-auto h-10 w-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No hay tags disponibles</h3>
            <p className="mt-1 text-xs text-gray-500">No se encontraron tags para mostrar.</p>
          </div>
        )}
      </div>
    </div>
  );
};