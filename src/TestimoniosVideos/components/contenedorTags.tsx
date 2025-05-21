import React from 'react';
import useTags from '../../tags/hooks/useTags'; // Assuming this path is correct
import { tags as TagType } from '../../tags/types/tagsDatos.types'; // Assuming this path is correct

interface TagsFilterContainerProps {
  selectedTags: number[];
  onChange: (newSelectedTags: number[]) => void;
}

const TagsFilterContainer: React.FC<TagsFilterContainerProps> = ({ selectedTags, onChange }) => {
  const { tags, loading, error } = useTags();

  const toggleTag = (tagId: number) => {
    const updatedTags = selectedTags.includes(tagId)
      ? selectedTags.filter((id) => id !== tagId)
      : [...selectedTags, tagId];
    onChange(updatedTags);
  };

  if (loading) {
    return (
      <div className="p-4 text-center">
        <p className="text-rose-600 animate-pulse">Cargando etiquetas...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-md text-center">
        <p className="text-red-700 font-medium">Error al cargar etiquetas:</p>
        <p className="text-red-600 text-sm">{error}</p>
      </div>
    );
  }

  if (!tags || tags.length === 0) {
    return (
      <div className="p-4 text-center">
        <p className="text-gray-500">No hay etiquetas disponibles.</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-xl shadow-sm border border-rose-100 mb-6">
      <div className="flex flex-wrap gap-2.5"> {/* Slightly increased gap for better spacing */}
        {tags.map((tag: TagType) => {
          const isSelected = selectedTags.includes(tag.id);
          return (
            <button
              key={tag.id}
              onClick={() => toggleTag(tag.id)}
              type="button" // Explicitly type buttons
              className={`
                px-4 py-1.5 text-sm font-medium rounded-full border
                outline-none transition-all duration-200 ease-in-out
                transform hover:scale-[1.03] active:scale-[0.98]
                focus-visible:ring-2 focus-visible:ring-offset-2 
                ${
                  isSelected
                    ? 'bg-rose-500 text-white border-rose-500 hover:bg-rose-600 focus-visible:ring-rose-400'
                    : 'bg-white text-rose-600 border-rose-300 hover:bg-rose-50 hover:border-rose-400 hover:text-rose-700 focus-visible:ring-rose-300'
                }
              `}
            >
              {tag.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TagsFilterContainer;