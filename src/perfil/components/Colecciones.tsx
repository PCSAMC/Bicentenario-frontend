import { useState } from 'react';
import CreateFolderModal from '../../Coleciones/components/ModalCreatedFolder';

const Colecciones = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFolderCreated = () => {
    alert('Carpeta creada exitosamente');
  };

  return (
    <div>
      <button
        onClick={() => setIsModalOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Nueva Carpeta
      </button>

      <CreateFolderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreated={handleFolderCreated}
      />
    </div>
  );
};

export default Colecciones;
