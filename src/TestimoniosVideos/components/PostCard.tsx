import React, { useState } from 'react';
import { Play, Eye, ThumbsUp, ThumbsDown, Calendar, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Importamos los tipos necesarios
import { Post } from '../types/potsData.types';

interface VideoTestimonialCardProps {
  post: Post;
  onPlay?: (postId: number) => void;
}


const VideoTestimonialCard: React.FC<VideoTestimonialCardProps> = ({
  post,
  onPlay
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleNavigateToVideo = () => {
    navigate(`/video/${post.id}`);  // Redirige a la página de detalles del video
  };
  

  // Formatear la fecha
  const formattedDate = new Date(post.createdAt).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
  
  // Formatear números
  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  // Duración del video
  const duration = "3:45";

  // Manejar la previsualización
  const handlePreview = () => {
    if (onPlay) {
      onPlay(post.id);
    }
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-100">
      {/* Ribbon superior estilo bicentenario */}
      <div className="h-1 bg-gradient-to-r from-red-800 via-red-600 to-red-800"></div>
      
      {/* Thumbnail con duración y overlay mejorado */}
      <div 
        className="relative" 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="aspect-video bg-gray-100 relative cursor-pointer" onClick={handleNavigateToVideo}>
          {/* Imagen de miniatura con sombra interna */}
          <video
              src={`http://localhost:3010/files/${post.file?.route}`}
              className="w-full h-full object-cover"
              muted
              playsInline
              preload="metadata"

            />

          <div className={`absolute inset-0 bg-gradient-to-b from-black/20 to-black/50 opacity-0 ${isHovered ? 'opacity-100' : ''} transition-opacity duration-300`}>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-red-600 rounded-full p-3 shadow-lg transform hover:scale-105 transition-transform">
                <Play className="text-white" size={24} fill="white" />
              </div>
            </div>
          </div>
          
          {/* Duración del video con estilo mejorado */}
          <div className="absolute bottom-3 right-3 bg-black/80 text-white text-xs px-2 py-1 rounded-md font-medium">
            {duration}
          </div>
        </div>
      </div>
      
      {/* Información del video con mejor jerarquía visual */}
      <div className="p-4">
        {/* Título destacado */}
        <h3 className="font-bold text-base text-gray-800 mb-2 line-clamp-2 border-l-4 border-red-500 pl-2">
          {post.title}
        </h3>
        
        <div className="flex items-start space-x-3">
          {/* Avatar mejorado */}
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex-shrink-0 flex items-center justify-center shadow-sm">
            <span className="font-bold text-white text-sm">
              {post.user.name.charAt(0).toUpperCase()}
            </span>
          </div>
          
          <div className="flex-1 min-w-0">
            {/* Subtítulo claramente diferenciado */}
            <p className="font-medium text-sm text-gray-700 mb-1">
              {post.user.name}
            </p>
            
            {/* Fecha con ícono */}
            <div className="flex items-center text-xs text-gray-500 mb-2">
              <Calendar className="w-3.5 h-3.5 mr-1 text-red-600" />
              <span>{formattedDate}</span>
            </div>
            
            {/* Ubicación con estilo */}
            {post.city && (
              <div className="flex items-center text-xs text-gray-500 mb-3">
                <MapPin className="w-3.5 h-3.5 mr-1 text-red-600" />
                <span>{post.city.name}, {post.city.departament?.name}</span>
              </div>
            )}
            
            {/* Línea separadora elegante */}
            <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-2"></div>
            
            {/* Estadísticas con mejor diseño */}
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center bg-gray-50 px-2 py-1 rounded-md">
                <Eye className="w-3.5 h-3.5 text-red-600 mr-1" />
                <span className="text-xs font-medium">{formatNumber(post.views)} vistas</span>
              </div>
              
              <div className="flex space-x-3">
                <div className="flex items-center">
                  <ThumbsUp className="w-3.5 h-3.5 text-green-600 mr-1" />
                  <span className="text-xs font-medium">{formatNumber(post.likes)}</span>
                </div>
                
                <div className="flex items-center">
                  <ThumbsDown className="w-3.5 h-3.5 text-gray-500 mr-1" />
                  <span className="text-xs font-medium">{formatNumber(post.dislikes)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Etiquetas si existen */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {post.tags.slice(0, 3).map(tag => (
              <span key={tag.id} className="bg-red-50 text-red-700 text-xs px-2 py-0.5 rounded-full">
                #{tag.name}
              </span>
            ))}
            {post.tags.length > 3 && (
              <span className="text-xs text-gray-500">+{post.tags.length - 3} más</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoTestimonialCard;