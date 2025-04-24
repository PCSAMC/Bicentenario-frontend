// src/TestimoniosVideos/components/galeriaNavegacion.tsx
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Definición de las propiedades del componente con tipos explícitos
interface GalleryNavigationProps {
  onNext: () => void;
  onPrev: () => void;
  currentPage: number;
  totalPages: number;
}

export function GalleryNavigation({ 
  onNext, 
  onPrev, 
  currentPage, 
  totalPages 
}: GalleryNavigationProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-2xl font-semibold text-gray-700">Videos Destacados</h2>
      <div className="flex gap-2">
        <button 
          onClick={onPrev} 
          disabled={currentPage === 0}
          className={`p-2 rounded-full ${currentPage === 0 ? 'text-gray-400' : 'text-gray-700 hover:bg-gray-200'}`}
        >
          <ChevronLeft size={24} />
        </button>
        <button 
          onClick={onNext} 
          disabled={currentPage === totalPages - 1}
          className={`p-2 rounded-full ${currentPage === totalPages - 1 ? 'text-gray-400' : 'text-gray-700 hover:bg-gray-200'}`}
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
}

export default GalleryNavigation;