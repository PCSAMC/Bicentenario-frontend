
import { useState, useEffect } from 'react';
import { getVideoById } from '../service/videoService';  
import { Video } from '../types/VideosData.types';  

export const useVideo = (id: number) => {
  const [video, setVideo] = useState<Video | null>(null);  
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState<string | null>(null);  

  
  useEffect(() => {
    const fetchVideo = async () => {
      try {
        setLoading(true);  
        const data = await getVideoById(id); 
        console.log('Video data:', data);
        setVideo(data); 
      } catch (error) {
        setError(error instanceof Error ? error.message : String(error));
      } finally {
        setLoading(false); 
      }
    };

    fetchVideo();  
  }, [id]); 

  return { video, loading, error }; 
};
