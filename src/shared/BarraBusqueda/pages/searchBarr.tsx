// components/SearchBar/index.tsx
import React, { useState } from 'react';
// Importar componentes
import { SearchInput } from '../components/searchInput';
import { VoiceSearchButton } from '../components/voiceSearchButton';
import { FilterButton } from '../components/filterButton';
import { FilterPanel } from '../components/filterPanel';
import { NotificationButton } from '../components/notificationButton';
import { NotificationsPanel } from '../components/notificationPanel';
import { UserProfileButton } from '../components/userProfileButton';

// Importar hooks
import { useSearch } from '../hooks/useSearch';
import { useVoiceSearch } from '../hooks/useVoiceSearch';
import { useNotifications } from '../hooks/useNotificaciones';

// Categorías de ejemplo para Bolivia
const CATEGORIES = [
  'Historia', 'Cultura', 'Turismo', 'Gastronomía', 'Eventos', 'Artesanía'
];

export const SearchBar: React.FC = () => {
  // Estado UI local
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  
  // Hooks personalizados
  const { 
    searchTerm, 
    setSearchTerm, 
    filters, 
    setFilters, 
    performSearch 
  } = useSearch();
  
  const { 
    isListening, 
    startListening 
  } = useVoiceSearch((text) => setSearchTerm(text));
  
  const { 
    notifications, 
    unreadCount, 
    showNotifications, 
    setShowNotifications, 
    markAsRead 
  } = useNotifications();

  // Manejadores de eventos
  const handleVoiceSearch = () => {
    startListening();
  };

  const toggleFilters = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const applyFilters = () => {
    performSearch();
    // Opcional: cerrar panel de filtros después de aplicar
    // setIsFilterOpen(false);
  };

  const viewAllNotifications = () => {
    // Implementar navegación a página de notificaciones
    console.log('Ver todas las notificaciones');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white shadow-lg rounded-lg p-4">
        {/* Contenedor principal de la barra de búsqueda */}
        <div className="flex items-center gap-2">
          {/* Logo Bolivia */}
          <div className="hidden md:flex items-center mr-2">
            <div className="bg-green-600 w-8 h-8 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">BOL</span>
            </div>
          </div>
          
          {/* Barra de búsqueda */}
          <SearchInput 
            searchTerm={searchTerm} 
            setSearchTerm={setSearchTerm} 
          />

          {/* Botón de búsqueda por voz */}
          <VoiceSearchButton 
            isListening={isListening} 
            onClick={handleVoiceSearch} 
          />

          {/* Botón de filtros */}
          <FilterButton 
            isOpen={isFilterOpen} 
            onClick={toggleFilters} 
          />

          {/* Notificaciones */}
          <div className="relative">
            <NotificationButton 
              count={unreadCount} 
              onClick={() => setShowNotifications(!showNotifications)} 
            />

            {/* Dropdown de notificaciones */}
            {showNotifications && (
              <NotificationsPanel 
                notifications={notifications} 
                onMarkAsRead={markAsRead} 
                onViewAll={viewAllNotifications} 
              />
            )}
          </div>

          {/* Perfil de usuario */}
          <div className="relative">
            <UserProfileButton 
              onClick={() => setShowUserMenu(!showUserMenu)} 
            />
          </div>
        </div>

        {/* Filtros expandibles */}
        {isFilterOpen && (
          <FilterPanel 
            filters={filters}
            setFilters={setFilters}
            categories={CATEGORIES}
            onApply={applyFilters}
          />
        )}
      </div>
    </div>
  );
};