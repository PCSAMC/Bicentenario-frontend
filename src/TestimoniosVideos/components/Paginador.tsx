import React from 'react';

interface PaginadorProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Paginador: React.FC<PaginadorProps> = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-4 p-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
      >
        ← Anterior
      </button>

      <span className="text-sm font-medium">
        Página {currentPage} de {totalPages}
      </span>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
      >
        Siguiente →
      </button>
    </div>
  );
};

export default Paginador;
