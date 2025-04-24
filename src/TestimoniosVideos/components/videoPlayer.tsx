
// src/components/VideoPlayer.jsx
import { Play, Pause } from 'lucide-react';
interface Video {
    id: number;
    title: string;
    description: string;
    thumbnail: string;
    duration: string;
    // Añade aquí cualquier otra propiedad que tenga tu objeto video
  }
  
// Propiedades del componente VideoPlayer
interface VideoPlayerProps {
  video: Video | null;
  isPlaying: boolean;
  togglePlayPause: () => void;
}
export function VideoPlayer({ video, isPlaying, togglePlayPause }: VideoPlayerProps) {
  if (!video) {
    return (
      <div className="aspect-video bg-gray-200 flex items-center justify-center text-gray-500">
        <p className="text-xl">Selecciona un video para comenzar</p>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="aspect-video bg-gray-900 flex items-center justify-center">
        <img 
          src={video.thumbnail} 
          alt={video.title} 
          className="max-w-full max-h-full" 
        />
        <button 
          className="absolute inset-0 flex items-center justify-center"
          onClick={togglePlayPause}
        >
          <div className="bg-black bg-opacity-40 rounded-full p-4">
            {isPlaying ? (
              <Pause size={48} className="text-white" />
            ) : (
              <Play size={48} className="text-white" />
            )}
          </div>
        </button>
      </div>
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{video.title}</h2>
        <p className="text-gray-600 mb-4">{video.description}</p>
        <div className="flex items-center text-gray-500">
          <span className="bg-gray-200 px-3 py-1 rounded-full text-sm">
            {video.duration}
          </span>
        </div>
      </div>
    </div>
  );
}