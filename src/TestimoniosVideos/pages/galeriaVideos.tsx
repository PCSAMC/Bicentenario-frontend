import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePosts } from '../hooks/usePotsObtener';
import useDepartments from '../hooks/obenerDepratmanetos';
import useEvents from '../../Events/hooks/useEvents';
import SearchBar from '../components/SearchBar';
import TagsFilterContainer from '../components/contenedorTags';
import VideoTestimonialCard from '../components/PostCard';
import Paginador from '../components/Paginador';
import { TestimonioForm } from '../components/formCrearTestimonio';
import PublicationCard from '../components/PublicationCard';
import AudioCard from '../components/AudCard';

export default function TestimoniosPage() {
  const { typeId } = useParams();
  const type = Number(typeId);
  const safeType = isNaN(type) ? undefined : type;

  const navigate = useNavigate();
  const [tagsSeleccionados, setTagsSeleccionados] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [city, setCity] = useState(null);
  const [orden, setOrden] = useState('');
  const [evento, setEvento] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const { departments } = useDepartments();
  const { events } = useEvents();

  const { posts, loading, error, pages } = usePosts({
    token: 'TU_TOKEN',
    filters: {
      ...(safeType !== undefined ? { type: safeType } : {}),
      ...(evento !== null ? { event: evento } : {}),
      ...(city !== null ? { city: city } : {}),
      ...(tagsSeleccionados.length ? { tags: tagsSeleccionados } : {}),
      ...(orden ? { orden } : {}),
      ...(search ? { search } : {}),
      limit: 6,
      page
    }
  });

  // Función para obtener el título de la página según el tipo
  const getPageTitle = () => {
    switch(safeType) {
      case 1:
        return "Testimonios";
      case 2:
        return "Publicaciones";
      default:
        return "Contenido";
    }
  };

  const handlePlayVideo = (postId) => {
    console.log(`Video del post ${postId} reproducido`);
  };

  const handlePlayAudio = (postId) => {
    console.log(`Audio del post ${postId} reproducido`);
  };

  return (
    <div className="p-4">
    
      {/* SearchBar */}
      <SearchBar
        onCreate={handleOpenModal}
        value={search}
        onChange={(val) => {
          setSearch(val);
          setPage(1);
        }}
        onFilterChange={({ ciudad, orden, evento }) => {
          setCity(ciudad);
          setOrden(orden);
          setEvento(evento);
          setPage(1);
        }}
        departments={departments}
        eventos={events || []}
      />

      {/* Contenedor principal: Tags a la izquierda, contenido a la derecha */}
      <div className="mt-6 flex flex-col lg:flex-row gap-6">
        {/* Contenedor de Tags */}
        <aside className="lg:w-1/4 bg-white  rounded-md shadow-md p-4 h-fit sticky top-4">
          <h2 className="text-lg font-semibold mb-2">Filtrar por etiquetas</h2>
          <TagsFilterContainer
            selectedTags={tagsSeleccionados}
            onChange={(nuevos) => {
              setTagsSeleccionados(nuevos);
              setPage(1);
            }}
          />
        </aside>

        {/* Lista de Contenido */}
        <main className="lg:w-3/4">
          {loading && (
            <div className="p-8 text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
              <p className="mt-2">Cargando contenido...</p>
            </div>
          )}
          
          {error && (
            <div className="p-4 bg-red-100 border border-red-300 text-red-700 rounded-md">
              <p>Error: {error}</p>
            </div>
          )}

          {!loading && !error && (
            <>
              {safeType === 1 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {posts.map((post) => (
                    <VideoTestimonialCard key={post.id} post={post} />
                  ))}
                </div>
              ) : safeType === 2 ? (
                // Usando PublicationCard directamente para cada publicación
                <div className="space-y-6">
                  {posts.map((post) => (
                    <PublicationCard key={post.id} post={post} onPlay={handlePlayVideo} />
                  ))}
                </div>
              ) : safeType === 3 ? (
                // Usando AudioCard para contenido de tipo audio
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {posts.map((post, index) => (
                  <AudioCard key={post.id} post={post} index={index} onPlay={handlePlayAudio} />
                ))}
              </div>
              
              ) : (
                <div className="p-4 bg-gray-100 text-center rounded-lg">
                  <p>No hay contenido de este tipo disponible.</p>
                </div>
              )}

              {posts.length === 0 && !loading && (
                <div className="p-4 bg-gray-100 text-center rounded-lg">
                  <p>No se encontraron resultados para tu búsqueda.</p>
                </div>
              )}
            </>
          )}

          <div className="mt-6">
            <Paginador currentPage={page} totalPages={pages} onPageChange={setPage} />
          </div>
        </main>
      </div>

      {/* Modal de creación */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <TestimonioForm isOpen={isModalOpen} onClose={handleCloseModal} />
        </div>
      )}
    </div>
  );
}