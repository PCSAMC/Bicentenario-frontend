import React from 'react';
import { SearchFilter } from '../types/barra.types';

interface FilterPanelProps {
  filters: SearchFilter;
  setFilters: (filters: SearchFilter) => void;
  categories: string[];
  onApply: () => void;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({ 
  filters, 
  setFilters, 
  categories, 
  onApply 
}) => {
  const selectCategory = (category: string) => {
    setFilters({
      ...filters,
      category: filters.category === category ? undefined : category
    });
  };

  return (
    <div className="mt-3 pt-3 border-t border-gray-200">
      <div className="text-sm text-gray-700 mb-2">Filtrar por categoría:</div>
      <div className="flex flex-wrap gap-2">
        {categories.map((category, index) => (
          <button 
            key={index} 
            className={`px-3 py-1 rounded-full text-sm transition-colors ${
              filters.category === category 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-blue-100'
            }`}
            onClick={() => selectCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="flex justify-between mt-3">
        <div className="space-x-2">
          <select 
            className="text-sm border rounded p-1"
            value={filters.sortBy || ''}
            onChange={(e) => setFilters({...filters, sortBy: e.target.value as any})}
          >
            <option value="">Ordenar por</option>
            <option value="recent">Más reciente</option>
            <option value="oldest">Más antiguo</option>
            <option value="relevant">Más relevante</option>
          </select>
          <select 
            className="text-sm border rounded p-1"
            value={filters.dateRange || ''}
            onChange={(e) => setFilters({...filters, dateRange: e.target.value as any})}
          >
            <option value="">Fecha</option>
            <option value="last_year">Último año</option>
            <option value="last_5_years">Últimos 5 años</option>
            <option value="all">Todo</option>
          </select>
        </div>
        <button 
          className="text-sm text-blue-500 font-medium"
          onClick={onApply}
        >
          Aplicar filtros
        </button>
      </div>
    </div>
  );
};