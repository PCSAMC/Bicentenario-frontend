import React, { useState, useEffect } from 'react';
import { Search, ChevronLeft, ChevronRight, Play, Volume2, MessageSquare, Heart, Share2 } from 'lucide-react';

// Datos de ejemplo para testimonios
const testimoniosData = {
  videos: [
    { id: 1, titulo: "Mi experiencia con el programa", autor: "María García", fecha: "12/04/2025", likes: 145, comentarios: 23, thumbnail: "/api/placeholder/320/180", url: "#" },
    { id: 2, titulo: "Cómo cambió mi vida", autor: "Juan Pérez", fecha: "10/04/2025", likes: 89, comentarios: 12, thumbnail: "/api/placeholder/320/180", url: "#" },
    { id: 3, titulo: "Mi participación en el bicentenario", autor: "Ana Martínez", fecha: "05/04/2025", likes: 201, comentarios: 34, thumbnail: "/api/placeholder/320/180", url: "#" },
    { id: 4, titulo: "Lo que aprendí este año", autor: "Carlos López", fecha: "01/04/2025", likes: 76, comentarios: 9, thumbnail: "/api/placeholder/320/180", url: "#" }
  ],
  publicaciones: [
    { id: 1, titulo: "Reflexiones sobre nuestra historia", autor: "Laura Torres", fecha: "15/04/2025", likes: 112, comentarios: 18, imagen: "/api/placeholder/320/180", contenido: "Una experiencia increíble participar en este proyecto que honra nuestras raíces..." },
    { id: 2, titulo: "Lo que significa para mí", autor: "Roberto Sánchez", fecha: "11/04/2025", likes: 67, comentarios: 8, imagen: "/api/placeholder/320/180", contenido: "Después de tanto esfuerzo, ver los resultados me llena de orgullo..." },
    { id: 3, titulo: "Un viaje al pasado", autor: "Elena Rojas", fecha: "07/04/2025", likes: 95, comentarios: 14, imagen: "/api/placeholder/320/180", contenido: "Recordar nuestra historia nos ayuda a construir un mejor futuro..." }
  ],
  audios: [
    { id: 1, titulo: "Entrevista sobre mi participación", autor: "Miguel Flores", fecha: "14/04/2025", likes: 54, comentarios: 7, duracion: "4:32", thumbnail: "/api/placeholder/320/180" },
    { id: 2, titulo: "Podcast especial bicentenario", autor: "Patricia Vega", fecha: "09/04/2025", likes: 123, comentarios: 21, duracion: "12:45", thumbnail: "/api/placeholder/320/180" },
    { id: 3, titulo: "Mi testimonio personal", autor: "Fernando Ruiz", fecha: "03/04/2025", likes: 87, comentarios: 11, duracion: "7:18", thumbnail: "/api/placeholder/320/180" }
  ]
};

// Componente principal
export default function TestimoniosGaleria() {
  const [categoriaActiva, setCategoriaActiva] = useState('videos');
  const [itemSeleccionado, setItemSeleccionado] = useState(null);
  const [busqueda, setBusqueda] = useState('');
  
  const handleCategoriaChange = (categoria) => {
    setCategoriaActiva(categoria);
    setItemSeleccionado(null);
  };
  
  const handleSeleccionItem = (item) => {
    setItemSeleccionado(item);
  };
  
  const handleVolver = () => {
    setItemSeleccionado(null);
  };
  
  const handleBusquedaChange = (e) => {
    setBusqueda(e.target.value);
  };
  
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="bg-blue-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Testimonios Bicentenario</h1>
          <div className="relative w-64">
            <input
              type="text"
              placeholder="Buscar testimonios..."
              className="w-full py-2 px-4 pr-10 rounded-lg text-gray-800"
              value={busqueda}
              onChange={handleBusquedaChange}
            />
            <Search className="absolute right-3 top-2.5 text-gray-500" size={18} />
          </div>
        </div>
      </header>
      
      {/* Contenido principal */}
      <main className="container mx-auto p-4">
        {!itemSeleccionado ? (
          <>
            {/* Navegación de categorías */}
            <div className="flex justify-center mb-8 mt-4">
              <nav className="bg-white rounded-lg shadow-md p-1 flex">
                <button 
                  className={`px-6 py-3 rounded-lg font-medium transition-colors ${categoriaActiva === 'videos' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                  onClick={() => handleCategoriaChange('videos')}
                >
                  Videos
                </button>
                <button 
                  className={`px-6 py-3 rounded-lg font-medium transition-colors ${categoriaActiva === 'publicaciones' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                  onClick={() => handleCategoriaChange('publicaciones')}
                >
                  Publicaciones
                </button>
                <button 
                  className={`px-6 py-3 rounded-lg font-medium transition-colors ${categoriaActiva === 'audios' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                  onClick={() => handleCategoriaChange('audios')}
                >
                  Audios
                </button>
              </nav>
            </div>
            
            {/* Galería de testimonios */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">
                {categoriaActiva === 'videos' && 'Galería de Videos'}
                {categoriaActiva === 'publicaciones' && 'Galería de Publicaciones'}
                {categoriaActiva === 'audios' && 'Galería de Audios'}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {testimoniosData[categoriaActiva].map(item => (
                  <div 
                    key={item.id} 
                    className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transform transition-transform hover:scale-105"
                    onClick={() => handleSeleccionItem(item)}
                  >
                    <div className="relative h-48">
                      <img src={item.thumbnail || item.imagen} alt={item.titulo} className="w-full h-full object-cover" />
                      
                      {categoriaActiva === 'videos' && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                          <div className="bg-blue-600 p-3 rounded-full">
                            <Play size={24} className="text-white" />
                          </div>
                        </div>
                      )}
                      
                      {categoriaActiva === 'audios' && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                          <div className="bg-green-600 p-3 rounded-full">
                            <Volume2 size={24} className="text-white" />
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="p-4">
                      <h3 className="font-bold text-lg mb-1 text-gray-800">{item.titulo}</h3>
                      <p className="text-gray-600 mb-2">{item.autor} • {item.fecha}</p>
                      
                      {categoriaActiva === 'publicaciones' && (
                        <p className="text-gray-700 mb-4 line-clamp-3">{item.contenido}</p>
                      )}
                      
                      {categoriaActiva === 'audios' && (
                        <p className="text-gray-700 mb-2">Duración: {item.duracion}</p>
                      )}
                      
                      <div className="flex items-center text-gray-500 text-sm mt-2">
                        <span className="flex items-center mr-4">
                          <Heart size={16} className="mr-1" /> {item.likes}
                        </span>
                        <span className="flex items-center">
                          <MessageSquare size={16} className="mr-1" /> {item.comentarios}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          /* Vista detallada del testimonio seleccionado */
          <div className="bg-white rounded-xl shadow-lg p-6">
            <button 
              className="flex items-center text-blue-600 mb-6 hover:text-blue-800 transition-colors"
              onClick={handleVolver}
            >
              <ChevronLeft size={20} />
              <span className="ml-1">Volver a la galería</span>
            </button>
            
            {categoriaActiva === 'videos' && (
              <div className="mb-6">
                <div className="aspect-w-16 aspect-h-9 bg-black rounded-xl overflow-hidden mb-4">
                  <div className="flex items-center justify-center h-full">
                    <img src="/api/placeholder/720/405" alt="Video preview" className="w-full" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-blue-600 p-6 rounded-full cursor-pointer hover:bg-blue-700 transition-colors">
                        <Play size={32} className="text-white" />
                      </div>
                    </div>
                  </div>
                </div>
                <h1 className="text-2xl font-bold mb-2">{itemSeleccionado.titulo}</h1>
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <p className="text-lg text-gray-700">{itemSeleccionado.autor}</p>
                    <p className="text-gray-500">{itemSeleccionado.fecha}</p>
                  </div>
                  <div className="flex space-x-4">
                    <button className="flex items-center text-gray-600 hover:text-blue-600">
                      <Heart size={20} className="mr-1" />
                      <span>{itemSeleccionado.likes}</span>
                    </button>
                    <button className="flex items-center text-gray-600 hover:text-blue-600">
                      <MessageSquare size={20} className="mr-1" />
                      <span>{itemSeleccionado.comentarios}</span>
                    </button>
                    <button className="flex items-center text-gray-600 hover:text-blue-600">
                      <Share2 size={20} />
                    </button>
                  </div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-700">
                    Este es un testimonio sobre la experiencia del autor en los eventos del bicentenario. 
                    El video muestra momentos destacados y reflexiones personales sobre la importancia de este hito histórico.
                  </p>
                </div>
              </div>
            )}
            
            {categoriaActiva === 'publicaciones' && (
              <div className="mb-6">
                <img src={itemSeleccionado.imagen} alt={itemSeleccionado.titulo} className="w-full rounded-xl mb-6 max-h-96 object-cover" />
                <h1 className="text-2xl font-bold mb-2">{itemSeleccionado.titulo}</h1>
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <p className="text-lg text-gray-700">{itemSeleccionado.autor}</p>
                    <p className="text-gray-500">{itemSeleccionado.fecha}</p>
                  </div>
                  <div className="flex space-x-4">
                    <button className="flex items-center text-gray-600 hover:text-blue-600">
                      <Heart size={20} className="mr-1" />
                      <span>{itemSeleccionado.likes}</span>
                    </button>
                    <button className="flex items-center text-gray-600 hover:text-blue-600">
                      <MessageSquare size={20} className="mr-1" />
                      <span>{itemSeleccionado.comentarios}</span>
                    </button>
                    <button className="flex items-center text-gray-600 hover:text-blue-600">
                      <Share2 size={20} />
                    </button>
                  </div>
                </div>
                <div className="prose max-w-none">
                  <p className="text-gray-700 mb-4">{itemSeleccionado.contenido}</p>
                  <p className="text-gray-700 mb-4">
                    Esta publicación es parte de una serie de testimonios recopilados para conmemorar el bicentenario.
                    Los participantes comparten sus experiencias y reflexiones sobre este importante hito histórico.
                  </p>
                  <p className="text-gray-700">
                    A través de estas historias personales, podemos comprender mejor el impacto que este evento ha tenido en 
                    nuestra comunidad y cómo ha influido en nuestra identidad colectiva.
                  </p>
                </div>
              </div>
            )}
            
            {categoriaActiva === 'audios' && (
              <div className="mb-6">
                <div className="bg-gradient-to-r from-blue-800 to-purple-800 rounded-xl p-8 mb-6 text-white flex items-center">
                  <img src={itemSeleccionado.thumbnail} alt={itemSeleccionado.titulo} className="w-32 h-32 object-cover rounded-lg shadow-lg mr-6" />
                  <div>
                    <h1 className="text-3xl font-bold mb-2">{itemSeleccionado.titulo}</h1>
                    <p className="text-xl mb-1">{itemSeleccionado.autor}</p>
                    <p className="opacity-80">{itemSeleccionado.fecha} • {itemSeleccionado.duracion}</p>
                  </div>
                </div>
                
                <div className="bg-gray-100 p-6 rounded-xl mb-6">
                  <div className="relative w-full h-12 bg-gray-200 rounded-full mb-4">
                    <div className="absolute left-0 top-0 h-full w-1/3 bg-blue-600 rounded-full"></div>
                    <div className="absolute left-1/3 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white rounded-full border-2 border-blue-600"></div>
                  </div>
                  <div className="flex justify-between items-center text-gray-700">
                    <span>1:32</span>
                    <div className="flex space-x-6">
                      <button className="p-3 bg-blue-600 rounded-full text-white hover:bg-blue-700">
                        <Play size={24} />
                      </button>
                    </div>
                    <span>{itemSeleccionado.duracion}</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <p className="text-lg font-medium text-gray-800">Testimonio audio</p>
                    <p className="text-gray-500">{itemSeleccionado.fecha}</p>
                  </div>
                  <div className="flex space-x-4">
                    <button className="flex items-center text-gray-600 hover:text-blue-600">
                      <Heart size={20} className="mr-1" />
                      <span>{itemSeleccionado.likes}</span>
                    </button>
                    <button className="flex items-center text-gray-600 hover:text-blue-600">
                      <MessageSquare size={20} className="mr-1" />
                      <span>{itemSeleccionado.comentarios}</span>
                    </button>
                    <button className="flex items-center text-gray-600 hover:text-blue-600">
                      <Share2 size={20} />
                    </button>
                  </div>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-700">
                    En este audio, el autor comparte su testimonio personal sobre su participación en los eventos 
                    del bicentenario y cómo esta experiencia ha influido en su vida y en su comprensión de nuestra historia común.
                  </p>
                </div>
              </div>
            )}
            
            {/* Sección de comentarios */}
            <div className="mt-8">
              <h3 className="text-xl font-bold mb-4">Comentarios ({itemSeleccionado.comentarios})</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-start mb-2">
                    <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
                    <div>
                      <p className="font-medium">Carmen Rodríguez</p>
                      <p className="text-gray-500 text-sm">Hace 2 días</p>
                    </div>
                  </div>
                  <p className="text-gray-700">¡Excelente testimonio! Me siento identificada con muchas de las experiencias que compartes.</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-start mb-2">
                    <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
                    <div>
                      <p className="font-medium">Pablo Mendoza</p>
                      <p className="text-gray-500 text-sm">Hace 3 días</p>
                    </div>
                  </div>
                  <p className="text-gray-700">Gracias por compartir tu experiencia. Es importante que estas historias se conserven para las futuras generaciones.</p>
                </div>
              </div>
              
              <div className="mt-6">
                <textarea 
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Escribe un comentario..."
                  rows="3"
                ></textarea>
                <div className="flex justify-end mt-2">
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Comentar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 mt-12">
        <div className="container mx-auto text-center">
          <p>© 2025 Testimonios Bicentenario. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}