import { SearchFilter, SearchResult } from '../types/barra.types';

// Datos de ejemplo para simular una API
const mockResults: SearchResult[] = [
  {
    id: '1',
    title: 'Historia del Bicentenario de Bolivia',
    description: 'Documentación histórica sobre la independencia y el bicentenario de Bolivia.',
    category: 'Historia',
    date: '2023-05-15',
    imageUrl: '/images/bicentenario.jpg',
    url: '/historia/bicentenario'
  },
  {
    id: '2',
    title: 'Eventos Culturales por el Bicentenario',
    description: 'Calendario de eventos culturales en celebración del bicentenario en todo el país.',
    category: 'Eventos',
    date: '2023-07-22',
    imageUrl: '/images/eventos-culturales.jpg',
    url: '/eventos/culturales'
  },
  {
    id: '3',
    title: 'Gastronomía Tradicional Boliviana',
    description: 'Platos típicos y tradicionales de las diferentes regiones de Bolivia.',
    category: 'Gastronomía',
    date: '2023-06-10',
    url: '/cultura/gastronomia'
  }
];

// En un entorno real, estas funciones harían llamadas a una API
export const searchService = {
  search: async (query: string, filters: SearchFilter): Promise<SearchResult[]> => {
    // Simular retardo de red
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Filtrado por el término de búsqueda
    let results = mockResults.filter(item => 
      item.title.toLowerCase().includes(query.toLowerCase()) || 
      item.description.toLowerCase().includes(query.toLowerCase())
    );
    
    // Aplicar filtros adicionales
    if (filters.category) {
      results = results.filter(item => item.category === filters.category);
    }
    
    // Ordenar resultados
    if (filters.sortBy) {
      results = [...results].sort((a, b) => {
        if (filters.sortBy === 'recent') {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        } else if (filters.sortBy === 'oldest') {
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        }
        return 0; // 'relevant' u otras opciones
      });
    }
    
    return results;
  },
  
  getSuggestions: async (query: string): Promise<string[]> => {
    // Simular retardo de red
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const suggestions = [
      'bicentenario de bolivia',
      'historia de la independencia bolivia',
      'patrimonio cultural bolivia',
      'eventos bicentenario la paz',
      'museos históricos bolivia'
    ];
    
    return suggestions.filter(s => s.includes(query.toLowerCase()));
  },
  
  getRecentSearches: async (): Promise<string[]> => {
    // En un entorno real, esto se obtendría del almacenamiento local o de una base de datos
    return [
      'patrimonio cultural',
      'museos en sucre',
      'gastronomía tradicional'
    ];
  },
  
  saveRecentSearch: async (query: string): Promise<void> => {
    // En un entorno real, aquí se guardaría en el almacenamiento local o en una base de datos
    console.log('Saving recent search:', query);
  }
};