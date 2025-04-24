import { useState } from 'react';
interface Video {
    id: number;
    title: string;
    description: string;
    thumbnail: string;
    duration: string;
    // Añade aquí cualquier otra propiedad que tenga tu objeto video
  }


export function useVideoGallery({videos, videosPerPage = 3}: { videos: Video[]; videosPerPage?: number }) {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [page, setPage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const totalPages = Math.ceil(videos.length / videosPerPage);
  
  const displayedVideos = videos.slice(
    page * videosPerPage,
    (page + 1) * videosPerPage
  );
  
  const nextPage = () => {
    setPage((prev) => (prev < totalPages - 1 ? prev + 1 : prev));
  };

  const prevPage = () => {
    setPage((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleVideoSelect = (video: Video) => {
    setSelectedVideo(video);
    setIsPlaying(true);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return {
    selectedVideo,
    isPlaying,
    page,
    totalPages,
    displayedVideos,
    nextPage,
    prevPage,
    handleVideoSelect,
    togglePlayPause,
    setPage
  };
}