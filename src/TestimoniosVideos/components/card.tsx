// src/TestimoniosVideos/components/card.tsx

// Interfaz para definir la estructura de un objeto de video
interface Video {
    id: number;
    title: string;
    description: string;
    thumbnail: string;
    duration: string;
    // Añade aquí cualquier otra propiedad que tenga tu objeto video
  }
  
  // Propiedades del componente Card
  interface CardProps {
    video: Video;
    onSelect: (video: Video) => void;
  }
  
  // Componente Card con tipos explícitos
  export function VideoCard({ video, onSelect }: CardProps) {
    return (
      <div 
        className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition hover:scale-105"
        onClick={() => onSelect(video)}
      >
        <div className="relative">
          <img 
            src={video.thumbnail} 
            alt={video.title} 
            className="w-full aspect-video object-cover"
          />
          <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm">
            {video.duration}
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-bold text-gray-800 mb-2">{video.title}</h3>
          <p className="text-gray-600 text-sm line-clamp-2">{video.description}</p>
        </div>
      </div>
    );
  }
  
  // Exportación por defecto (opcional)
  export default VideoCard;