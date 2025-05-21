import React, { useState } from 'react';
import { useCreatedFolder } from '../hooks/useCreatedFolder';

const CreateFolderModal: React.FC<{ isOpen: boolean; onClose: () => void; onCreated: () => void }> = ({
  isOpen,
  onClose,
  onCreated,
}) => {
  const [folderName, setFolderName] = useState('');
  const { CreatedFolder, loading, error } = useCreatedFolder();

  const dataUser = localStorage.getItem('user');
  const convertido = dataUser ? JSON.parse(dataUser) : null;
  const idUser = convertido.idUser;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!folderName.trim()) return alert('Por favor ingresa un nombre para la carpeta');
    if (!idUser) return alert('Usuario no autenticado');

    await CreatedFolder({ idUser, name: folderName.trim() });

    // Aquí podrías hacer validaciones extras con error o loading si quieres
    if (!error) {
      setFolderName('');
      onCreated();
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-container" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <h2 id="modal-title" className="text-xl font-bold mb-4">Crear nueva carpeta</h2>

        <form onSubmit={handleSubmit}>
          <label htmlFor="folderName" className="block mb-2 font-medium">
            Nombre de la carpeta
          </label>
          <input
            id="folderName"
            type="text"
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ejemplo: Documentos Importantes"
            disabled={loading}
          />

          {error && <p className="text-red-600 mb-2">{error}</p>}

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className={`px-4 py-2 rounded text-white ${loading ? 'bg-blue-300' : 'bg-blue-600 hover:bg-blue-700'}`}
              disabled={loading}
            >
              {loading ? 'Creando...' : 'Crear'}
            </button>
          </div>
        </form>
      </div>

      <style>{`
        .modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }
        .modal-container {
          background: white;
          padding: 1.5rem;
          border-radius: 8px;
          width: 90%;
          max-width: 400px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  );
};

export default CreateFolderModal;
