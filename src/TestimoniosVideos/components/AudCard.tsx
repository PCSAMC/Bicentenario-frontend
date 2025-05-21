import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Heart, Share2, Music } from 'lucide-react';
import { Post } from '../types/potsData.types';

interface AudCardProps {
  post: Post;
  onPlay?: (postId: number) => void;
  index: number;
}

const DEFAULT_COVER = "/api/placeholder/300/300";

// Función para formatear tiempo en minutos:segundos
const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

const AudioCard: React.FC<AudCardProps> = ({ post, onPlay, index }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [volume, setVolume] = useState<number>(0.7);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Paleta de colores modernos inspirada en Spotify pero con toques bolivianos
  const colors = {
    primary: '#1DB954',    // Verde Spotify
    secondary: '#D52B1E',  // Rojo boliviano
    accent: '#F9E300',     // Amarillo boliviano
    dark: '#121212',       // Fondo oscuro
    mediumDark: '#282828', // Fondo de tarjeta
    mediumGray: '#404040', // Elementos secundarios
    lightGray: '#B3B3B3',  // Texto secundario
    white: '#FFFFFF',      // Texto principal
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      
      // Manejadores de eventos para actualizar el estado
      const handleTimeUpdate = () => {
        if (audioRef.current) {
          setCurrentTime(audioRef.current.currentTime);
        }
      };
      
      const handleLoadedMetadata = () => {
        if (audioRef.current) {
          setDuration(audioRef.current.duration);
        }
      };
      
      const handleEnded = () => {
        setIsPlaying(false);
        setCurrentTime(0);
        if (audioRef.current) {
          audioRef.current.currentTime = 0;
        }
      };
      
      // Agregar event listeners
      audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
      audioRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);
      audioRef.current.addEventListener('ended', handleEnded);
      
      // Cleanup
      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
          audioRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata);
          audioRef.current.removeEventListener('ended', handleEnded);
        }
      };
    }
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(error => {
          console.error("Error al reproducir audio:", error);
        });
        if (onPlay && post.id) {
          onPlay(post.id);
        }
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const seekTime = (e.nativeEvent.offsetX / target.clientWidth) * duration;
    if (audioRef.current) {
      audioRef.current.currentTime = seekTime;
      setCurrentTime(seekTime);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    if (newVolume === 0) {
      setIsMuted(true);
    } else {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = volume;
        setIsMuted(false);
      } else {
        audioRef.current.volume = 0;
        setIsMuted(true);
      }
    }
  };

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  // Formatear fecha
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('es-BO', options);
  };

  // Verificar si existe el archivo de audio
  const audioUrl = post.file && post.file.route 
    ? `http://localhost:3010/files/${post.file.route.replace(/\\/g, '/')}` 
    : '';

  return (
<div className="rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:shadow-xl w-full max-w-[250px]"
         style={{ backgroundColor: colors.white }}>
      {/* Audio elemento oculto */}
      <audio 
        ref={audioRef} 
        src={audioUrl}
        preload="metadata"
      />
      
      {/* Imagen de portada */}
{/* Imagen de portada */}
<div className="relative w-full" style={{ paddingBottom: '75%' }}>
        <img 
          src={`https://picsum.photos/seed/${index}/400/400`}
          alt={post.title}
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
        
        {/* Botón de reproducción superpuesto */}
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 hover:bg-opacity-30 transition-all duration-300">
          <button 
            className="w-16 h-16 rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-110 opacity-0 hover:opacity-100"
            style={{ backgroundColor: colors.primary }}
            onClick={togglePlay}
          >
            {isPlaying ? (
              <Pause size={26} color={colors.dark} />
            ) : (
              <Play size={26} color={colors.dark} style={{ marginLeft: '3px' }} />
            )}
          </button>
        </div>
        
        {/* Duración del audio */}
        {duration > 0 && (
          <div 
            className="absolute bottom-2 right-2 px-2 py-1 rounded text-xs"
            style={{ backgroundColor: 'rgba(0,0,0,0.7)', color: colors.dark }}
          >
            {formatTime(duration)}
          </div>
        )}
      </div>
      
      {/* Información y controles */}
      <div className="p-2 space-y-2 w-full">

      <div className="mb-3">
          <h3 className="font-bold text-lg truncate" style={{ color: colors.dark }}>
            {post.title}
          </h3>
          <p className="text-sm truncate" style={{ color: colors.dark }}>
            {post.user?.name || 'Usuario desconocido'} • {formatDate(post.createdAt)}
          </p>
        </div>
        
        {/* Barra de progreso */}
        <div className="mb-4">
          <div 
            className="w-full h-1 rounded-full cursor-pointer relative"
            onClick={handleSeek}
            style={{ backgroundColor: colors.dark }}
          >
            <div 
              className="absolute top-0 left-0 h-1 rounded-full"
              style={{ 
                width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%`,
                backgroundColor: colors.primary
              }}
            ></div>
          </div>
          <div className="flex justify-between text-xs mt-1" style={{ color: colors.lightGray }}>
            <span>{formatTime(currentTime)}</span>
            <span>{duration ? formatTime(duration) : '--:--'}</span>
          </div>
        </div>
        
        {/* Controles principales */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <button 
              className="p-2 rounded-full hover:bg-gray-700"
              aria-label="Anterior"
              style={{ color: colors.lightGray }}
            >
              <SkipBack size={18} />
            </button>
            
            <button 
              className="p-3 rounded-full flex items-center justify-center"
              style={{ 
                backgroundColor: isPlaying ? colors.accent : colors.primary,
                color: isPlaying ? colors.white : colors.dark
              }}
              onClick={togglePlay}
              aria-label={isPlaying ? 'Pausar' : 'Reproducir'}
            >
              {isPlaying ? (
                <Pause size={20} />
              ) : (
                <Play size={20} style={{ marginLeft: '2px' }} />
              )}
            </button>
            
            <button 
              className="p-2 rounded-full hover:bg-gray-700"
              aria-label="Siguiente"
              style={{ color: colors.lightGray }}
            >
              <SkipForward size={18} />
            </button>
          </div>
          
          {/* Control de volumen */}
          <div className="flex items-center space-x-2 group relative">
            <button 
              onClick={toggleMute}
              className="hover:text-white"
              aria-label={isMuted ? 'Activar sonido' : 'Silenciar'}
              style={{ color: colors.lightGray }}
            >
              {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
            <div className="hidden group-hover:block absolute -top-10 -left-8 bg-gray-800 p-2 rounded shadow-lg">
              <input 
                type="range" 
                min="0" 
                max="1" 
                step="0.01" 
                value={volume}
                onChange={handleVolumeChange}
                className="w-20"
                aria-label="Volumen"
                style={{ accentColor: colors.primary }}
              />
            </div>
          </div>
        </div>
        
        {/* Descripción breve */}
        <p className="text-sm mb-4" 
           style={{ color: colors.lightGray, 
                    display: '-webkit-box', 
                    WebkitLineClamp: 2, 
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden' }}>
          {post.description}
        </p>
        
        {/* Etiquetas */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map(tag => (
              <span 
                key={tag.id} 
                className="px-2 py-1 rounded-full text-xs font-medium"
                style={{ 
                  backgroundColor: colors.secondary, 
                  color: colors.white
                }}
              >
                #{tag.name}
              </span>
            ))}
          </div>
        )}
      </div>
      
      {/* Acciones */}
      <div className="flex justify-around p-3 border-t" style={{ borderColor: colors.mediumGray }}>
        <button 
          className="flex items-center justify-center py-2 px-4 rounded-md hover:bg-gray-700 transition-colors"
          onClick={toggleLike}
          style={{ 
            color: isLiked ? colors.white : colors.lightGray, 
            backgroundColor: isLiked ? colors.secondary : 'transparent' 
          }}
        >
          <Heart size={18} fill={isLiked ? colors.white : "none"} />
          <span className="ml-2">Me gusta</span>
        </button>
        
        <button 
          className="flex items-center justify-center py-2 px-4 rounded-md hover:bg-gray-700 transition-colors"
          style={{ color: colors.lightGray }}
        >
          <Share2 size={18} />
          <span className="ml-2">Compartir</span>
        </button>
      </div>
      
      {/* Información adicional */}
      <div className="p-3 text-xs border-t" 
           style={{ borderColor: colors.mediumGray, color: colors.lightGray }}>
        <div className="flex justify-between">
          <span>
            {post.city && post.city.name}
            {post.city && post.city.departament && `, ${post.city.departament.name}`}
          </span>
          <span className="flex items-center">
            <span className="mr-1">{post.views || 0}</span> reproducciones
          </span>
        </div>
      </div>
    </div>
  );
};

export default AudioCard;