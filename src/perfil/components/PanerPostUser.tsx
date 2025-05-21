import React, { useState } from 'react';
import { usePosts } from '../../TestimoniosVideos/hooks/usePotsObtener';
import VideoTestimonialCard from '../../TestimoniosVideos/components/PostCard';
import PublicationCard from '../../TestimoniosVideos/components/PublicationCard';
import AudioCard from '../../TestimoniosVideos/components/AudCard';

export default function PanelPostUser() {
  const dataUser = localStorage.getItem('user');
  const convertido = JSON.parse(dataUser || '{}');
  const token = convertido.token;
  const idUser = convertido.idUser;

  // Estado para controlar la pestaña activa
  const [activeTab, setActiveTab] = useState('videos');

  // Estados para mostrar todos o solo algunos elementos
  const [showAllVideos, setShowAllVideos] = useState(false);
  const [showAllPublications, setShowAllPublications] = useState(false);
  const [showAllAudios, setShowAllAudios] = useState(false);
  
  // Estados para la paginación (se mantienen pero no se usan en la UI)
  const [page1, setPage1] = useState(1);
  const [page2, setPage2] = useState(1);
  const [page3, setPage3] = useState(1);

  // Carga de videos - Tipo 1
  const {
    posts: postsType1,
    loading: loading1,
    error: error1,
    pages: pages1,
  } = usePosts({
    token,
    filters: { idUser, type: 1, limit: showAllVideos ? 20 : 4, page: page1 },
  });

  // Carga de publicaciones - Tipo 2
  const {
    posts: postsType2,
    loading: loading2,
    error: error2,
    pages: pages2,
  } = usePosts({
    token,
    filters: { idUser, type: 2, limit: showAllPublications ? 20 : 4, page: page2 },
  });

  // Carga de audios - Tipo 3
  const {
    posts: postsType3,
    loading: loading3,
    error: error3,
    pages: pages3,
  } = usePosts({
    token,
    filters: { idUser, type: 3, limit: showAllAudios ? 20 : 4, page: page3 },
  });

  // Verificación de autenticación
  if (!token || !idUser) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-600 font-medium">Usuario no autenticado.</p>
          <p className="text-red-500 mt-2">Inicia sesión para ver tus publicaciones.</p>
        </div>
      </div>
    );
  }

  // Renderizado de cada tipo de post
  const renderPostByType = (post, type, index) => {
    switch (type) {
      case 1:
        return <VideoTestimonialCard key={post.id} post={post} />;
      case 2:
        const handlePlayVideo = (postId) => {
          console.log(`Playing video for post with ID: ${postId}`);
        };
        return <PublicationCard key={post.id} post={post} onPlay={handlePlayVideo} />;
      case 3:
        const handlePlayAudio = (postId) => {
          console.log(`Playing audio for post with ID: ${postId}`);
        };
        return <AudioCard key={post.id} post={post} index={index} onPlay={handlePlayAudio} />;
      default:
        return <VideoTestimonialCard key={post.id} post={post} />;
    }
  };

  // Componente para mostrar el estado de carga
  const LoadingState = () => (
    <div className="flex justify-center items-center py-12">
      <div className="animate-pulse flex space-x-4">
        <div className="rounded-full bg-gray-200 h-12 w-12"></div>
        <div className="flex-1 space-y-4 py-1">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    </div>
  );

  // Componente para mostrar el estado de error
  const ErrorState = ({ message }) => (
    <div className="bg-red-50 rounded-lg p-4 my-4">
      <p className="text-red-600 text-center">{message}</p>
    </div>
  );

  // Componente para mostrar cuando no hay contenido
  const EmptyState = ({ message }) => (
    <div className="text-center py-12 px-4">
      <div className="inline-block p-4 rounded-full bg-gray-100 mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
        </svg>
      </div>
      <h3 className="text-lg font-medium text-gray-700">No hay contenido disponible</h3>
      <p className="mt-1 text-gray-500">{message}</p>
    </div>
  );

  // Componente para el contenido de cada pestaña
  const TabContent = ({ 
    posts, 
    loading, 
    error, 
    showAll,
    setShowAll, 
    emptyMessage,
    buttonColor
  }) => (
    <div className="bg-white p-6 rounded-b-xl shadow-sm">
      {loading ? (
        <LoadingState />
      ) : error ? (
        <ErrorState message={`Error: ${error}`} />
      ) : !posts || posts.length === 0 ? (
        <EmptyState message={emptyMessage} />
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {posts.map((post, index) => renderPostByType(post, post.type, index))}
          </div>
          
          {posts && posts.length > 4 && (
            <div className="mt-8 text-center">
              <button
                onClick={() => setShowAll(!showAll)}
                className={`px-6 py-2 ${buttonColor} text-white rounded-md hover:opacity-90 transition flex items-center mx-auto`}
              >
                {showAll ? (
                  <>
                    <span>Ver menos</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                  </>
                ) : (
                  <>
                    <span>Ver todos</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Mi Contenido</h1>
      
      {/* NavBar con pestañas */}
      <div className="bg-white rounded-t-xl shadow-sm mb-0 border-b">
        <nav className="flex">
          <button
            onClick={() => setActiveTab('videos')}
            className={`flex items-center px-6 py-4 font-medium text-sm focus:outline-none ${
              activeTab === 'videos'
                ? 'border-b-2 border-yellow-500 text-yellow-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 mr-2 ${activeTab === 'videos' ? 'text-yellow-500' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            Mis Videos
            {postsType1 && postsType1.length > 0 && (
              <span className="ml-2 bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                {postsType1.length}
              </span>
            )}
          </button>
          
          <button
            onClick={() => setActiveTab('publicaciones')}
            className={`flex items-center px-6 py-4 font-medium text-sm focus:outline-none ${
              activeTab === 'publicaciones'
                ? 'border-b-2 border-blue-600 text-blue-700'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 mr-2 ${activeTab === 'publicaciones' ? 'text-blue-600' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
            Mis Publicaciones
            {postsType2 && postsType2.length > 0 && (
              <span className="ml-2 bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                {postsType2.length}
              </span>
            )}
          </button>
          
          <button
            onClick={() => setActiveTab('audios')}
            className={`flex items-center px-6 py-4 font-medium text-sm focus:outline-none ${
              activeTab === 'audios'
                ? 'border-b-2 border-red-500 text-red-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 mr-2 ${activeTab === 'audios' ? 'text-red-500' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
            Mis Audios
            {postsType3 && postsType3.length > 0 && (
              <span className="ml-2 bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                {postsType3.length}
              </span>
            )}
          </button>
        </nav>
      </div>

      {/* Contenido de las pestañas */}
      {activeTab === 'videos' && (
        <TabContent
          posts={postsType1}
          loading={loading1}
          error={error1}
          showAll={showAllVideos}
          setShowAll={setShowAllVideos}
          emptyMessage="Aún no has compartido ningún video testimonio."
          buttonColor="bg-yellow-500"
        />
      )}
      
      {activeTab === 'publicaciones' && (
        <TabContent
          posts={postsType2}
          loading={loading2}
          error={error2}
          showAll={showAllPublications}
          setShowAll={setShowAllPublications}
          emptyMessage="Aún no has creado ninguna publicación."
          buttonColor="bg-blue-600"
        />
      )}
      
      {activeTab === 'audios' && (
        <TabContent
          posts={postsType3}
          loading={loading3}
          error={error3}
          showAll={showAllAudios}
          setShowAll={setShowAllAudios}
          emptyMessage="Aún no has compartido ningún audio."
          buttonColor="bg-red-500"
        />
      )}
    </div>
  );
}