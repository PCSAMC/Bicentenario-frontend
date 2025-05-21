import React, { useState } from 'react';
import { useGetFolderUser } from '../hooks/useGetFolders';
import { Folder, ChevronDown, ChevronRight } from 'lucide-react';

const FolderList = () => {
  // Obtener idUser del localStorage
  const dataUser = localStorage.getItem('user');
  const convertido = dataUser ? JSON.parse(dataUser) : null;
  const idUser = convertido?.idUser || null;

  const [selectedFolder, setSelectedFolder] = useState(null);
  const { folders, loading, error } = useGetFolderUser(idUser);

  // Formato fecha legible
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  if (!idUser) return (
    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded shadow">
      <p className="font-bold">Usuario no autenticado</p>
      <p>Inicie sesión para ver sus carpetas</p>
    </div>
  );

  if (loading) return (
    <div className="flex justify-center items-center h-32">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
    </div>
  );

  if (error) return (
    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded shadow">
      <p className="font-bold">Error:</p>
      <p>{error}</p>
    </div>
  );

  if (!folders || folders.length === 0) return (
    <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 rounded shadow">
      <p className="font-bold">No se encontraron carpetas.</p>
      <p>Cree una nueva carpeta para empezar.</p>
    </div>
  );

  // Colores de la bandera boliviana para la decoración de carpetas
  const bolivianColors = [
    'bg-gradient-to-r from-red-600 to-red-700',
    'bg-gradient-to-r from-yellow-500 to-yellow-600',
    'bg-gradient-to-r from-green-600 to-green-700'
  ];

  const handleFolderClick = (folderId) => {
    setSelectedFolder(selectedFolder === folderId ? null : folderId);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-lg border border-gray-200">
      <div className="mb-6 border-b border-gray-300 pb-4">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <span className="mr-2 text-3xl">📁</span>
          Mis Documentos Históricos
        </h2>
        <p className="text-sm text-gray-600 mt-1">Colección Digital del Bicentenario</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {folders.map((folder, index) => (
          <div 
            key={folder.id}
            className={`relative rounded-lg overflow-hidden transition-all duration-300 transform hover:-translate-y-1 cursor-pointer ${selectedFolder === folder.id ? 'ring-2 ring-blue-500 shadow-xl' : 'shadow-md'}`}
            onClick={() => handleFolderClick(folder.id)}
          >
            {/* Borde superior con colores bolivianos */}
            <div className={`h-3 ${bolivianColors[index % 3]}`}></div>
            
            <div className="bg-gray-50 p-4">
              {/* Pestaña de la carpeta */}
              <div className="absolute -top-1 left-5 w-16 h-6 bg-yellow-100 rounded-t-lg transform -skew-x-12 border-t border-l border-r border-yellow-300"></div>
              
              <div className="flex items-start space-x-3 mb-3 pt-2">
                <div className="flex-shrink-0 mt-1">
                  <Folder 
                    size={32} 
                    className={`${selectedFolder === folder.id ? 'text-yellow-600' : 'text-yellow-500'}`} 
                  />
                </div>
                <div className="flex-grow">
                  <h3 className="font-bold text-lg text-gray-800 truncate">{folder.name}</h3>
                  <p className="text-xs text-gray-500">
                    Creado el: {formatDate(folder.createdAt)}
                  </p>
                </div>
                <div className="flex-shrink-0">
                  {selectedFolder === folder.id ? 
                    <ChevronDown size={20} className="text-gray-600" /> : 
                    <ChevronRight size={20} className="text-gray-600" />
                  }
                </div>
              </div>
              
              {/* Contenido expandible de la carpeta */}
              <div className={`overflow-hidden transition-all duration-300 ${selectedFolder === folder.id ? 'max-h-40' : 'max-h-0'}`}>
                <div className="p-3 bg-white rounded border border-gray-200 mt-2">
                  <p className="text-sm text-gray-700">
                    Contenido de la carpeta. Haga clic para ver los documentos históricos.
                  </p>
                  <div className="mt-2 pt-2 border-t border-gray-100">
                    <button className="text-xs bg-blue-600 hover:bg-blue-700 text-white py-1 px-2 rounded">
                      Ver documentos
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Efecto de sombra para dar profundidad */}
            <div className="absolute inset-x-0 bottom-0 h-1 bg-gray-300 opacity-70"></div>
          </div>
        ))}
      </div>

      <div className="mt-8 pt-4 border-t border-gray-200">
        <p className="text-center text-sm text-gray-500">
          Archivo Digital Bicentenario de Bolivia • Preservando nuestra historia
        </p>
      </div>
    </div>
  );
};

export default FolderList;