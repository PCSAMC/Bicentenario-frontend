
// hooks/useSearch.ts
import { useState, useEffect } from 'react';
import { SearchFilter, SearchResult } from '../types/barra.types';
import { searchService } from '../services/searchService';

export const useSearch = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filters, setFilters] = useState<SearchFilter>({});
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (searchTerm.trim().length < 2) {
      setResults([]);
      return;
    }

    const delayDebounceFn = setTimeout(() => {
      performSearch();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, filters]);

  const performSearch = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const searchResults = await searchService.search(searchTerm, filters);
      setResults(searchResults);
    } catch (err) {
      setError('Error al realizar la búsqueda');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    searchTerm,
    setSearchTerm,
    filters,
    setFilters,
    results,
    isLoading,
    error,
    performSearch
  };
};
