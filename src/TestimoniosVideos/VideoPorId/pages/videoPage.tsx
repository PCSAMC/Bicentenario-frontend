import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useVideo } from '../hooks/useVideo';
import VideoPlayer from '../components/videoPlayer';
import VideoInfo from '../components/videoInfo';
import ErrorMessage from '../components/errorMessage';
import LoadingSpinner from '../components/loadingSpiner';
import { motion } from 'framer-motion';
import { ArrowLeft, Share, Star, Filter, ChevronLeft, ThumbsUp, MessageCircle } from 'lucide-react';
import { usePosts } from '../../hooks/usePotsObtener';
import VideoTestimonialCard from '../../components/PostCard';
import useDepartments from '../../hooks/obenerDepratmanetos';
import useEvents from '../../../Events/hooks/useEvents';
import SearchBar from '../../components/SearchBar';
import { TestimonioForm } from '../../components/formCrearTestimonio';
import TagsFilterContainer from '../../components/contenedorTags';
import CommentsSection from '../../Comentarios/components/commentContenedor';

const VideoDetailPage: React.FC = () => {
  const { videoId } = useParams();
  const { video, loading, error } = useVideo(Number(videoId));
  const [tagsSeleccionados, setTagsSeleccionados] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [city, setCity] = useState<string | null>(null);
  const [orden, setOrden] = useState('');
  const [evento, setEvento] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [userId, setUserId] = useState<number>(0);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const toggleFilters = () => setShowFilters(!showFilters);
  
  const safeType = 1;
  const { departments } = useDepartments();
  const { events } = useEvents();
  
  const { posts, loading: postsLoading, error: postsError, pages } = usePosts({
    token: 'TU_TOKEN',
    filters: {
      ...(safeType !== undefined ? { type: safeType } : {}),
      ...(evento !== null ? { event: Number(evento) } : {}),
      ...(city !== null ? { city: Number(city) } : {}),
      ...(tagsSeleccionados.length ? { tags: tagsSeleccionados } : {}),
      ...(orden ? { orden } : {}),
      ...(search ? { search } : {}),
      limit: 5,
      page
    }
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.body.style.backgroundColor = '#f0f2f5';
    
    const dataUser = localStorage.getItem('user');
    const convertido = JSON.parse(dataUser || '{}');
    console.log('Datos del usuario:', convertido);
    if (convertido) {
      setUserId(convertido.idUser);
      console.log('ID de usuario:', convertido.idUser);
    }
    
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <LoadingSpinner />
          <div className="mt-4 text-lg font-medium text-gray-700">Cargando contenido...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
        <ErrorMessage message={error} />
        <button className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-md font-medium">
          Volver a intentar
        </button>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50"
    >
      {/* Header con navegación */}
      <header className="bg-white  sticky top-0 z-10">
        <div className="max-w-8xl mx-auto">
          {/* Barra de búsqueda */}
          <div className="px-4 pb-4">
            <SearchBar
              onCreate={handleOpenModal}
              value={search}
              onChange={(val) => {
                setSearch(val);
                setPage(1);
              }}
              onFilterChange={({ ciudad, orden, evento }: { ciudad: string | null; orden: string; evento: string | null }) => {
                setCity(ciudad);
                setOrden(orden);
                setEvento(evento);
                setPage(1);
              }}
              departments={departments}
              eventos={events || []}
            />
          </div>
        </div>
      </header>
      
      {/* Contenido principal */}
      <main className="max-w-8xl mx-auto px-4 py-6 bg-white rounded-lg shadow-md">
        {video ? (
          <div className="flex flex-col lg:flex-row lg:space-x-6">
            {/* Columna izquierda: Tags */}
            <div className="lg:w-1/4 mb-6 lg:mb-0">
              <div className="bg-white  rounded-md shadow-md p-4 h-fit sticky top-24">
                <h2 className="text-lg font-semibold mb-2">Filtrar por etiquetas</h2>
                <TagsFilterContainer
                  selectedTags={tagsSeleccionados}
                  onChange={(nuevos) => {
                    setTagsSeleccionados(nuevos);
                    setPage(1);
                  }}
                />
              </div>
            </div>
            
            {/* Columna central: Video e información */}
            <div className="lg:w-1/1.6 mb-6 lg:mb-0">
              {/* Título para dispositivos móviles */}
              <h2 className="text-xl font-bold text-gray-800 mb-4 sm:hidden">
                {video.title}
              </h2>
              
              {/* Sección del Video */}
              <div className="bg-black rounded-xl overflow-hidden shadow-lg mb-6">
                <VideoPlayer src={`http://localhost:3010/files/${video.file?.route}`} />
              </div>
              
              {/* Información del video */}
              <div className="bg-white rounded-xl shadow-md p-6 mb-1">
                <VideoInfo video={video} />
              </div>
              
              {/* Sección de comentarios con el componente CommentsSection */}
              <CommentsSection 
                commentCount={3} 
                postId={Number(videoId)} 
                userId={userId} 
                reloadComments={() => {
                  // Función para recargar comentarios si es necesario
                  console.log('Recargar comentarios');
                }}
              />
            </div>
            
            {/* Columna derecha: Videos relacionados */}
            <div className="lg:w-3/10">
              <div className="bg-white rounded-xl shadow-md overflow-hidden sticky top-24">
                <div className="bg-blue-50 border-b border-blue-100 px-6 py-4">
                  <h3 className="text-lg font-bold text-gray-800 flex items-center">
                    <span>Videos Relacionados</span>
                    <span className="ml-2 text-sm font-normal text-gray-500">({posts?.length || 0})</span>
                  </h3>
                </div>
                
                <div className="p-4">
                  {postsLoading && (
                    <div className="py-8 flex justify-center">
                      <LoadingSpinner />
                    </div>
                  )}
                  
                  {postsError && (
                    <div className="p-4 text-center text-red-500 bg-red-50 rounded-lg">
                      Error: {postsError}
                    </div>
                  )}
                  
                  {!postsLoading && !postsError && posts && (
                    <div className="space-y-4">
                      {posts.length > 0 ? (
                        posts.map((post) => (
                          <VideoTestimonialCard key={post.id} post={post} />
                        ))
                      ) : (
                        <div className="text-center py-8 text-gray-500">
                          No hay videos relacionados disponibles
                        </div>
                      )}
                    </div>
                  )}
                </div>
                
                {posts && posts.length > 0 && pages > 1 && (
                  <div className="bg-gray-50 px-6 py-3 border-t border-gray-100">
                    <div className="flex justify-between items-center">
                      <button 
                        className={`text-blue-600 hover:text-blue-800 font-medium transition-colors ${page === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={page === 1}
                        onClick={() => setPage(page - 1)}
                      >
                        Anterior
                      </button>
                      <span className="text-sm text-gray-500">
                        Página {page} de {pages}
                      </span>
                      <button 
                        className={`text-blue-600 hover:text-blue-800 font-medium transition-colors ${page === pages ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={page === pages}
                        onClick={() => setPage(page + 1)}
                      >
                        Siguiente
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center bg-white rounded-xl shadow-md p-10 mt-4">
            <div className="text-4xl text-gray-300 mb-4">😢</div>
            <p className="text-xl text-gray-700 mb-6">No se encontró el video solicitado</p>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-md font-medium">
              Volver al inicio
            </button>
          </div>
        )}
      </main>
      
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <TestimonioForm isOpen={isModalOpen} onClose={handleCloseModal} />
        </div>
      )}
    </motion.div>
  );
};

export default VideoDetailPage;