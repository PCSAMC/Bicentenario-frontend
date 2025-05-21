// components/LoadingSpinner.tsx
import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="p-8 text-center">
      <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      <p className="mt-2">Cargando...</p>
    </div>
  );
};

export default LoadingSpinner;
