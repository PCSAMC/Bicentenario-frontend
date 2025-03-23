import React, { useState } from 'react';
import { Camera, Mic, PenTool, Upload as UploadIcon, Info, X } from 'lucide-react';

const Upload = () => {
  const [tab, setTab] = useState('video');
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState('');
  const [showTip, setShowTip] = useState(true);

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files[0]) {
      setFileName(e.dataTransfer.files[0].name);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-500 via-yellow-400 to-green-500 p-0.5 rounded-2xl mb-10">
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-8">
          <h1 className="text-4xl md:text-5xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-yellow-400 to-green-500 mb-4">
            Bicentenario de Bolivia
          </h1>
          <p className="text-center text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-6">
            Sé parte de la historia. Comparte tus recuerdos, pensamientos y celebraciones en este momento histórico para nuestro país.
          </p>
        </div>
      </div>

      {/* Tip banner */}
      {showTip && (
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8 rounded-lg flex items-start">
          <Info className="text-blue-500 mr-3 mt-0.5 flex-shrink-0" size={20} />
          <div className="flex-grow">
            <p className="text-blue-700">¡Todo el contenido subido será revisado por nuestro equipo antes de publicarse en la plataforma del Bicentenario!</p>
          </div>
          <button onClick={() => setShowTip(false)} className="text-blue-500 hover:text-blue-700">
            <X size={20} />
          </button>
        </div>
      )}

      {/* Tabs */}
      <div className="flex justify-center gap-4 mb-8">
        <button
          className={`px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 flex items-center ${
            tab === 'video'
              ? 'bg-gradient-to-r from-red-400 to-red-600 text-white shadow-lg'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          onClick={() => setTab('video')}
        >
          <Camera className={`mr-2 ${tab === 'video' ? 'animate-pulse' : ''}`} size={18} />
          Video
        </button>
        <button
          className={`px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 flex items-center ${
            tab === 'audio'
              ? 'bg-gradient-to-r from-green-400 to-green-600 text-white shadow-lg'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          onClick={() => setTab('audio')}
        >
          <Mic className={`mr-2 ${tab === 'audio' ? 'animate-pulse' : ''}`} size={18} />
          Testimonio
        </button>
        <button
          className={`px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 flex items-center ${
            tab === 'post'
              ? 'bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-lg'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          onClick={() => setTab('post')}
        >
          <PenTool className={`mr-2 ${tab === 'post' ? 'animate-pulse' : ''}`} size={18} />
          Publicación
        </button>
      </div>

      {/* Content Container with animation */}
      <div className="transition-all duration-500 transform">
        {/* Video Form */}
        {tab === 'video' && (
          <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8 space-y-6 border border-red-100 dark:border-red-900">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-red-500 flex items-center">
                <Camera className="mr-2" size={24} />
                Compartir un video
              </h2>
              <span className="text-sm text-gray-500">Estilo YouTube</span>
            </div>
            
            <div className="space-y-4">
              <div className="group">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Título del video</label>
                <input
                  type="text"
                  placeholder="Ej: Mi celebración del Bicentenario en La Paz"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                />
              </div>
              
              <div className="group">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Descripción</label>
                <textarea
                  placeholder="Cuéntanos sobre tu video..."
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                  rows={3}
                ></textarea>
              </div>
              
              <div 
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-all ${
                  isDragging ? 'border-red-500 bg-red-50 dark:bg-red-900/20' : 'border-gray-300 dark:border-gray-700'
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <UploadIcon className="mx-auto text-red-500 mb-4" size={32} />
                <p className="mb-2 text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-semibold">Haz clic para seleccionar</span> o arrastra y suelta tu video
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">MP4, MOV o AVI (máx. 1GB)</p>
                <input 
                  type="file" 
                  accept="video/*" 
                  className="hidden" 
                  id="video-file" 
                  onChange={handleFileChange}
                />
                <label 
                  htmlFor="video-file" 
                  className="mt-4 inline-block px-6 py-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition cursor-pointer"
                >
                  Seleccionar archivo
                </label>
                {fileName && (
                  <div className="mt-4 text-sm text-gray-700 dark:text-gray-300">
                    Archivo seleccionado: <span className="font-medium">{fileName}</span>
                  </div>
                )}
              </div>
            </div>
            
            <button className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-lg hover:from-red-600 hover:to-red-700 transition-all transform hover:scale-[1.02] font-medium flex items-center justify-center">
              <UploadIcon className="mr-2" size={18} />
              Subir video
            </button>
          </div>
        )}

        {/* Audio Form */}
        {tab === 'audio' && (
          <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8 space-y-6 border border-green-100 dark:border-green-900">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-green-500 flex items-center">
                <Mic className="mr-2" size={24} />
                Compartir un testimonio
              </h2>
              <span className="text-sm text-gray-500">Estilo Spotify</span>
            </div>
            
            <div className="space-y-4">
              <div className="group">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Título del testimonio</label>
                <input
                  type="text"
                  placeholder="Ej: Memorias de mi abuelo sobre Bolivia"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                />
              </div>
              
              <div className="group">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Descripción o contexto</label>
                <textarea
                  placeholder="Proporciona contexto sobre este testimonio..."
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                  rows={3}
                ></textarea>
              </div>
              
              <div 
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-all ${
                  isDragging ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : 'border-gray-300 dark:border-gray-700'
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <UploadIcon className="mx-auto text-green-500 mb-4" size={32} />
                <p className="mb-2 text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-semibold">Haz clic para seleccionar</span> o arrastra y suelta tu archivo de audio
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">MP3, WAV o M4A (máx. 100MB)</p>
                <input 
                  type="file" 
                  accept="audio/*" 
                  className="hidden" 
                  id="audio-file"
                  onChange={handleFileChange}
                />
                <label 
                  htmlFor="audio-file" 
                  className="mt-4 inline-block px-6 py-2 bg-green-100 text-green-600 rounded-full hover:bg-green-200 transition cursor-pointer"
                >
                  Seleccionar archivo
                </label>
                {fileName && (
                  <div className="mt-4 text-sm text-gray-700 dark:text-gray-300">
                    Archivo seleccionado: <span className="font-medium">{fileName}</span>
                  </div>
                )}
              </div>
            </div>
            
            <button className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-lg hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-[1.02] font-medium flex items-center justify-center">
              <UploadIcon className="mr-2" size={18} />
              Subir testimonio
            </button>
          </div>
        )}

        {/* Post Form */}
        {tab === 'post' && (
          <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8 space-y-6 border border-blue-100 dark:border-blue-900">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-blue-500 flex items-center">
                <PenTool className="mr-2" size={24} />
                Crear una publicación
              </h2>
              <span className="text-sm text-gray-500">Estilo Instagram</span>
            </div>
            
            <div className="space-y-4">
              <div className="group">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tu mensaje</label>
                <textarea
                  placeholder="Comparte tus pensamientos sobre el Bicentenario de Bolivia..."
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  rows={4}
                ></textarea>
              </div>
              
              <div 
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-all ${
                  isDragging ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-300 dark:border-gray-700'
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <UploadIcon className="mx-auto text-blue-500 mb-4" size={32} />
                <p className="mb-2 text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-semibold">Haz clic para seleccionar</span> o arrastra y suelta tu imagen
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">JPG, PNG o GIF (máx. 10MB)</p>
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  id="image-file"
                  onChange={handleFileChange}
                />
                <label 
                  htmlFor="image-file" 
                  className="mt-4 inline-block px-6 py-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition cursor-pointer"
                >
                  Seleccionar archivo
                </label>
                {fileName && (
                  <div className="mt-4 text-sm text-gray-700 dark:text-gray-300">
                    Archivo seleccionado: <span className="font-medium">{fileName}</span>
                  </div>
                )}
              </div>
            </div>
            
            <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-[1.02] font-medium flex items-center justify-center">
              <UploadIcon className="mr-2" size={18} />
              Publicar contenido
            </button>
          </div>
        )}
      </div>

      {/* Footer note */}
      <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>Tu contribución ayudará a documentar este momento histórico para las futuras generaciones.</p>
        <p className="mt-1">¿Tienes preguntas? <a href="#" className="text-blue-500 hover:underline">Contáctanos</a></p>
      </div>
    </div>
  );
};

export default Upload;