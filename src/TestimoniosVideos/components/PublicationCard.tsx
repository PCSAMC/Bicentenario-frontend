import React, { useState } from 'react';
import { Heart, ThumbsDown, Eye, MessageSquare, Share2, User } from 'lucide-react'; // Added User for placeholder
import { Post } from '../types/potsData.types';
import CommentsSection from '../Comentarios/components/commentContenedor';


interface PublicationCardProps {
  post: Post;
  onPlay?: (postId: number) => void;
}

const PublicationCard: React.FC<PublicationCardProps> = ({ post, onPlay }) => {
  const [likes, setLikes] = useState(post.likes || 0);
  const [dislikes, setDislikes] = useState(post.dislikes || 0);
  const [hasLiked, setHasLiked] = useState(false);
  const [hasDisliked, setHasDisliked] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const elegantColors = {
    primary: '#2C3E50',    // Deep Blue/Charcoal for main text
    secondary: '#7F8C8D',  // Cool Gray for secondary text
    accent: '#1ABC9C',     // Teal for interactive elements and highlights
    background: '#FFFFFF', // White for card background
    lightGray: '#ECF0F1',  // Very light gray for borders, subtle backgrounds
    containerBg: '#F8F9F9',// Slightly off-white for main page background (if card is on it)
    danger: '#E74C3C',     // Muted Red for dislikes or warnings
  };

  const handleLike = () => {
    if (hasLiked) {
      setLikes(likes - 1);
      setHasLiked(false);
    } else {
      setLikes(likes + 1);
      setHasLiked(true);
      if (hasDisliked) {
        setDislikes(dislikes - 1);
        setHasDisliked(false);
      }
    }
  };

  const handleDislike = () => {
    if (hasDisliked) {
      setDislikes(dislikes - 1);
      setHasDisliked(false);
    } else {
      setDislikes(dislikes + 1);
      setHasDisliked(true);
      if (hasLiked) {
        setLikes(likes - 1);
        setHasLiked(false);
      }
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return new Date(dateString).toLocaleDateString('es-BO', options);
  };

  const handlePlayVideo = () => {
    if (onPlay && post.id) {
      onPlay(post.id);
    }
  };

  const renderMedia = () => {
    if (!post.file) return null;
    // Consider adding a play button overlay if it's a video
    return (
      <div className="w-full aspect-video bg-gray-200 rounded-lg overflow-hidden my-4 transition-shadow duration-300 hover:shadow-lg">
        <img
          className="w-full h-full object-cover"
          src={`http://localhost:3010/files/${post.file.route}`}
          alt={post.title}
        />
      </div>
    );
  };

  // Placeholder for avatar or initial
  const renderAvatar = () => {
    if (post.user?.avatarUrl) {
      return <img src={post.user.avatarUrl} alt={post.user.name || 'User Avatar'} className="h-10 w-10 rounded-full object-cover" />;
    }
    return (
      <div 
        className="h-10 w-10 rounded-full flex items-center justify-center text-white font-semibold"
        style={{ backgroundColor: elegantColors.accent }}
      >
        {post.user?.name ? post.user.name.charAt(0).toUpperCase() : <User size={20} />}
      </div>
    );
  };


  return (
    <div 
      className="bg-white rounded-xl shadow-lg overflow-hidden mb-8 max-w-2xl mx-auto transition-all duration-300 hover:shadow-xl"
      style={{ fontFamily: "'Inter', sans-serif" }} // Example elegant font - ensure it's loaded
    >
      {/* Encabezado de la publicación */}
      <div className="p-5 flex items-center justify-between border-b" style={{ borderColor: elegantColors.lightGray }}>
        <div className="flex items-center">
          {renderAvatar()}
          <div className="ml-4">
            <h3 className="font-semibold text-md" style={{ color: elegantColors.primary }}>
              {post.user?.name || 'Usuario Anónimo'}
            </h3>
            <div className="flex items-center text-xs" style={{ color: elegantColors.secondary }}>
              <span>{formatDate(post.createdAt)}</span>
              {post.city && (
                <>
                  <span className="mx-1.5">•</span>
                  <span>
                    {post.city.name}
                    {post.city.departament && `, ${post.city.departament.name}`}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
        {post.type && (
          <div 
            className="px-3 py-1 rounded-full text-xs font-medium"
            style={{ 
              backgroundColor: `${elegantColors.accent}20`, // Accent with opacity
              color: elegantColors.accent 
            }}
          >
            {post.type === 2 ? 'Publicación' : 'Destacado'} 
          </div>
        )}
      </div>
      
      {/* Contenido principal */}
      <div className="p-5">
        <h2 className="text-2xl font-bold mb-3" style={{ color: elegantColors.primary, lineHeight: '1.3' }}>
          {post.title}
        </h2>
        <p className="text-base mb-4 leading-relaxed" style={{ color: elegantColors.secondary }}>
          {post.description}
        </p>
        
        {post.content && post.content !== post.description && (
          <div className="text-base mb-4 leading-relaxed prose prose-sm max-w-none" style={{ color: elegantColors.secondary }} dangerouslySetInnerHTML={{ __html: post.content }} />
          // Using dangerouslySetInnerHTML if post.content can be HTML. Be careful with XSS.
          // If it's plain text: <div className="text-gray-700 mb-4">{post.content}</div>
        )}
        
        {/* Media: Imagen o Video */}
        {renderMedia()}

        {/* Etiquetas */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-5">
            {post.tags.map(tag => (
              <span 
                key={tag.id} 
                className="px-3 py-1 rounded-full text-xs font-medium cursor-pointer transition-colors duration-200"
                style={{ 
                  backgroundColor: elegantColors.lightGray, 
                  color: elegantColors.secondary,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = elegantColors.accent;
                  e.currentTarget.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = elegantColors.lightGray;
                  e.currentTarget.style.color = elegantColors.secondary;
                }}
              >
                #{tag.name}
              </span>
            ))}
          </div>
        )}
      </div>
      
      {/* Estadísticas */}
      <div className="px-5 py-3 border-t border-b" style={{ borderColor: elegantColors.lightGray, backgroundColor: `${elegantColors.lightGray}4D` }}>
        <div className="flex items-center justify-between text-sm" style={{ color: elegantColors.secondary }}>
          <div className="flex items-center">
            <Heart 
              size={18} 
              fill={hasLiked ? elegantColors.accent : "none"} 
              color={hasLiked ? elegantColors.accent : elegantColors.secondary} 
              className="mr-1.5 transition-colors duration-200"
            />
            <span className="font-medium" style={{color: hasLiked ? elegantColors.accent : elegantColors.secondary}}>{likes}</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
                <ThumbsDown size={18} className="mr-1.5" color={hasDisliked ? elegantColors.danger : elegantColors.secondary}/> 
                <span style={{color: hasDisliked ? elegantColors.danger : elegantColors.secondary}}>{dislikes}</span>
            </span>
            <span className="flex items-center">
                <Eye size={18} className="mr-1.5" /> {post.views || 0} Vistas
            </span>
            <span className="flex items-center">
                <MessageSquare size={18} className="mr-1.5" /> {post.commentsCount || 0} Comentarios
            </span>
          </div>
        </div>
      </div>
      
      {/* Botones de acción */}
      <div className="flex justify-around p-2">
        {[
          { label: 'Me gusta', icon: Heart, handler: handleLike, active: hasLiked, activeColor: elegantColors.accent },
          { label: 'No me gusta', icon: ThumbsDown, handler: handleDislike, active: hasDisliked, activeColor: elegantColors.danger },
          { label: 'Comentar', icon: MessageSquare, handler: () => setShowComments(!showComments), active: showComments },
          { label: 'Compartir', icon: Share2, handler: () => { /* Implement share logic */ alert('Compartir presionado'); } }
        ].map((action, index) => {
          const IconComponent = action.icon;
          return (
            <button 
              key={index}
              className={`flex-1 flex items-center justify-center py-3 px-2 rounded-lg transition-all duration-200 ease-in-out transform hover:scale-105 mx-1 group`}
              onClick={action.handler}
              style={{ 
                color: action.active ? (action.activeColor || elegantColors.accent) : elegantColors.secondary,
                backgroundColor: action.active ? `${action.activeColor || elegantColors.accent}20` : 'transparent' // Light background when active
              }}
            >
              <IconComponent 
                size={20} 
                fill={action.active && action.label !== 'Comentar' && action.label !== 'Compartir' ? (action.activeColor || elegantColors.accent) : "none"} 
                className="transition-colors duration-200 group-hover:text-black"
                style={{ color: action.active ? (action.activeColor || elegantColors.accent) : elegantColors.secondary }}
              />
              <span className="ml-2 text-sm font-medium group-hover:text-black" style={{ color: action.active ? (action.activeColor || elegantColors.accent) : elegantColors.secondary }}>
                {action.label}
              </span>
            </button>
          );
        })}
      </div>
      
      {/* Área de comentarios (expandible) */}
      {showComments && (
        <div className="p-5 border-t" style={{ borderColor: elegantColors.lightGray }}>
          <div className="flex items-start mb-4">
             {/* User Avatar for comment input */}
            <div 
                className="h-9 w-9 rounded-full flex items-center justify-center text-white font-semibold mr-3 mt-1 flex-shrink-0"
                style={{ backgroundColor: elegantColors.secondary }}
            >
                {/* Assuming current user's initial or avatar */}
                <User size={18} /> 
            </div>
            <textarea 
              placeholder="Escribe un comentario elegante..." 
              className="w-full border rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:outline-none resize-none"
              style={{ 
                borderColor: elegantColors.lightGray, 
                color: elegantColors.primary,
                backgroundColor: `${elegantColors.lightGray}40` // Slightly different background for textarea
              }}
              rows={3}
            />
          </div>
          
          {/* Example of a comment - you would map through actual comments here */}
          {/* <div className="text-center text-sm py-4" style={{ color: elegantColors.secondary }}>
            No hay comentarios aún. ¡Sé el primero en comentar!
          </div> */}

          {/* Placeholder for displaying actual comments */}
           <div className="space-y-4">
             {/* Example Comment Structure */}
             {/* <div className="flex items-start">
                <div className="h-8 w-8 rounded-full flex items-center justify-center text-white font-semibold mr-3 mt-1 flex-shrink-0" style={{ backgroundColor: elegantColors.accent }}>S</div>
                <div className="bg-gray-50 p-3 rounded-lg w-full">
                    <p className="text-sm font-semibold" style={{color: elegantColors.primary}}>Sara Connor</p>
                    <p className="text-xs text-gray-500 mb-1">Hace 2 horas</p>
                    <p className="text-sm" style={{color: elegantColors.secondary}}>Este es un comentario de ejemplo. ¡Gran publicación!</p>
                </div>
             </div> */}
             <p className="text-center text-sm py-4" style={{ color: elegantColors.secondary }}>
                Cargando comentarios... (o mostrar "No hay comentarios")
             </p>
           </div>

           <button 
             className="mt-4 w-full py-2.5 px-4 rounded-lg text-sm font-semibold text-white transition-colors duration-200"
             style={{ backgroundColor: elegantColors.accent, color: 'white' }}
             onMouseEnter={(e) => e.currentTarget.style.backgroundColor = `${elegantColors.accent}E6`} // Darken on hover
             onMouseLeave={(e) => e.currentTarget.style.backgroundColor = elegantColors.accent}
           >
             Publicar Comentario
           </button>
        </div>
      )}
    </div>
  );
};

export default PublicationCard;
