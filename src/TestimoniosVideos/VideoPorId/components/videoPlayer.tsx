// components/VideoPlayer.tsx
import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, SkipForward, SkipBack, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface VideoPlayerProps {
  src: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [loading, setLoading] = useState(true);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [qualityOptions] = useState(['Auto', '1080p', '720p', '480p', '360p']);
  const [selectedQuality, setSelectedQuality] = useState('Auto');
  
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Colores Rojo Pastel (ejemplos de Tailwind, puedes ajustarlos)
const pastelRed = {
    light: '#FF4D4D', // rojo más vibrante
    DEFAULT: '#FF1A1A', // rojo principal
    dark: '#E60000',   // rojo oscuro
};

  const darkTheme = {
    popupBg: '#262626', // neutral-800
    controlBg: '#404040', // neutral-700
    controlHoverBg: '#525252' // neutral-600
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    
    const handleLoadedMetadata = () => {
      setDuration(video.duration);
      setLoading(false);
    };
    
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    
    // Simulación de carga
    const loadingTimeout = setTimeout(() => {
      if (video.readyState < 3) { // HAVE_FUTURE_DATA
         // No hacer setLoading(false) si el video real aún no ha cargado metadatos
      } else {
        setLoading(false);
      }
    }, 2000); // Mantenemos un timeout mínimo por estética del spinner
    
    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      clearTimeout(loadingTimeout);
    };
  }, [src]);
  
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    
    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
    };
    video.addEventListener('timeupdate', handleTimeUpdate);
    
    const handleVideoEnd = () => {
        setIsPlaying(false);
        setCurrentTime(video.duration); // Asegurar que la barra de progreso llegue al final
    };
    video.addEventListener('ended', handleVideoEnd);

    const handleCanPlay = () => {
      setLoading(false);
    };
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('waiting', () => setLoading(true));
    video.addEventListener('playing', () => setLoading(false));


    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleVideoEnd);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('waiting', () => setLoading(true));
      video.removeEventListener('playing', () => setLoading(false));
    };
  }, []);
  
  useEffect(() => {
    const handleMouseMove = () => {
      setShowControls(true);
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
      controlsTimeoutRef.current = setTimeout(() => {
        if (isPlaying) {
          setShowControls(false);
        }
      }, 3000);
    };
    
    const playerContainer = document.getElementById('video-player-container');
    playerContainer?.addEventListener('mousemove', handleMouseMove);
    playerContainer?.addEventListener('mouseleave', () => {
        if (isPlaying) {
            setShowControls(false);
        }
    });
    
    return () => {
      playerContainer?.removeEventListener('mousemove', handleMouseMove);
      playerContainer?.removeEventListener('mouseleave', () => {
        if (isPlaying) {
            setShowControls(false);
        }
      });
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, [isPlaying]);
  
  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (loading && video.readyState < 3) return; // No permitir play si está cargando y no tiene datos
    
    if (isPlaying) {
      video.pause();
    } else {
      video.play().catch(err => console.error("Error playing video:", err));
    }
    setIsPlaying(!isPlaying);
  };
  
  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !isMuted;
    setIsMuted(!isMuted);
    if (!isMuted && video.volume === 0) { // Unmuting but volume is 0
        video.volume = 0.1; // Set to a low volume
        setVolume(0.1);
    } else if (isMuted && video.volume > 0) { // Muting
        // setIsMuted handles this
    }
  };
  
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;
    const newVolume = parseFloat(e.target.value);
    video.volume = newVolume;
    setVolume(newVolume);
    if (newVolume === 0) {
      setIsMuted(true);
      video.muted = true;
    } else {
      setIsMuted(false);
      video.muted = false;
    }
  };
  
  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    const progressBar = progressBarRef.current;
    if (!video || !progressBar || loading) return;
    const rect = progressBar.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    video.currentTime = pos * video.duration;
    setCurrentTime(pos * video.duration); // Update immediately for better UX
  };
  
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  
  const toggleFullscreen = () => {
    const playerContainer = document.getElementById('video-player-container');
    if (!playerContainer) return;
    if (!document.fullscreenElement) {
      playerContainer.requestFullscreen().then(() => setIsFullscreen(true)).catch(err => console.error('Error attempting to enable fullscreen:', err));
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(err => console.error('Error attempting to exit fullscreen:', err));
    }
  };
  
  const skipForward = () => {
    const video = videoRef.current;
    if (!video || loading) return;
    video.currentTime = Math.min(video.duration, video.currentTime + 10);
  };
  
  const skipBackward = () => {
    const video = videoRef.current;
    if (!video || loading) return;
    video.currentTime = Math.max(0, video.currentTime - 10);
  };
  
  const changePlaybackRate = (rate: number) => {
    const video = videoRef.current;
    if (!video) return;
    video.playbackRate = rate;
    setPlaybackRate(rate);
    // setShowSettings(false); // Keep settings open if user wants to change multiple things
  };
  
  const changeQuality = (quality: string) => {
    setSelectedQuality(quality);
    // setShowSettings(false); // Keep settings open
    // En una implementación real, aquí cambiaríamos la fuente del video y podríamos mostrar un loader
    console.log(`Quality changed to: ${quality}. (Simulated)`);
  };

  const downloadVideo = async () => {
    try {
      const response = await fetch(src, {
        mode: 'cors', // Asegura que el servidor permita CORS
      });
      if (!response.ok) throw new Error('Error al descargar el video');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
  
      // Opcional: puedes obtener nombre desde src o poner uno fijo
      const filename = src.split('/').pop() || 'video.mp4';
      a.download = filename;
      
      document.body.appendChild(a);
      a.click();
      a.remove();
      
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error descargando el video:', error);
      alert('No se pudo descargar el video.');
    }
  };
  
  
  return (
    <div 
      id="video-player-container" 
      className="relative w-full max-w-4xl mx-auto rounded-xl overflow-hidden shadow-2xl bg-black group"
      style={{ aspectRatio: '16/9' }}
      onMouseEnter={() => {
        if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
        setShowControls(true);
      }}
      // onMouseLeave={() => { // This is handled by useEffect for mousemove
      //   if (isPlaying) setShowControls(false);
      // }}
    >
      <video
        ref={videoRef}
        src={src}
        className="w-full h-full object-contain"
        onClick={togglePlay}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        // onEnded handled in useEffect
      />
      
      <AnimatePresence>
        {loading && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center z-20"
          >
            <div className="flex flex-col items-center">
              <div style={{ borderColor: pastelRed.DEFAULT, borderTopColor: 'transparent' }} className="w-16 h-16 border-4 rounded-full animate-spin"></div>
              <p className="text-neutral-200 mt-4 text-sm">Cargando video...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <AnimatePresence>
        {!isPlaying && !loading && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 flex items-center justify-center z-10 cursor-pointer"
            onClick={togglePlay}
          >
            <motion.div 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              style={{ backgroundColor: pastelRed.DEFAULT }}
              className="w-20 h-20 rounded-full bg-opacity-90 flex items-center justify-center"
            >
              <Play size={36} className="text-white ml-1" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <AnimatePresence>
        {(showControls || !isPlaying) && ( // Always show controls if paused
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent pt-12 pb-3 px-4 z-10"
          >
            <div 
              ref={progressBarRef}
              className="w-full h-2.5 bg-neutral-600 rounded-full cursor-pointer mb-3 relative group/progress"
              onClick={handleSeek}
            >
              <div 
                style={{ backgroundColor: pastelRed.DEFAULT }}
                className="absolute top-0 left-0 h-full rounded-full"
                style={{ 
                  width: `${(currentTime / duration) * 100}%`, 
                  backgroundColor: pastelRed.DEFAULT 
                }}
              />
              <div 
                className="absolute top-1/2 h-4 w-4 bg-white rounded-full -translate-y-1/2 -ml-2 opacity-0 group-hover/progress:opacity-100 transition-opacity shadow-md"
                style={{ left: `${(currentTime / duration) * 100}%` }}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <motion.button 
                  whileTap={{ scale: 0.9 }}
                  onClick={togglePlay}
                  style={{ color: pastelRed.light }}
                  className="hover:text-white transition-colors"
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? <Pause size={26} /> : <Play size={26} />}
                </motion.button>
                
                <motion.button 
                  whileTap={{ scale: 0.9 }}
                  onClick={skipBackward}
                   style={{ color: pastelRed.light }}
                  className="hover:text-white transition-colors"
                  aria-label="Skip backward 10 seconds"
                >
                  <SkipBack size={22} />
                </motion.button>
                
                <motion.button 
                  whileTap={{ scale: 0.9 }}
                  onClick={skipForward}
                   style={{ color: pastelRed.light }}
                  className="hover:text-white transition-colors"
                  aria-label="Skip forward 10 seconds"
                >
                  <SkipForward size={22} />
                </motion.button>
                
                
                <div className="text-neutral-200 text-xs font-medium select-none">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="relative" 
                     onMouseEnter={() => setShowVolumeSlider(true)} 
                     onMouseLeave={() => setShowVolumeSlider(false)}>
                  <motion.button 
                    whileTap={{ scale: 0.9 }}
                    onClick={toggleMute}
                    style={{ color: pastelRed.light }}
                    className="hover:text-white transition-colors"
                    aria-label={isMuted ? "Unmute" : "Mute"}
                  >
                    {isMuted || volume === 0 ? <VolumeX size={22} /> : <Volume2 size={22} />}
                  </motion.button>
                  
                  <AnimatePresence>
                    {showVolumeSlider && (
                      <motion.div 
                        initial={{ opacity: 0, width: 0, y:5 }}
                        animate={{ opacity: 1, width: 'auto', y:0 }} // Use 'auto' for width based on content
                        exit={{ opacity: 0, width: 0, y:5 }}
                        className="absolute bottom-10 left-1/2 -translate-x-1/2 rounded-md p-2 z-20"
                        style={{backgroundColor: darkTheme.popupBg}}
                      >
                        <input 
                          type="range" 
                          min="0" 
                          max="1" 
                          step="0.01" 
                          value={volume}
                          onChange={handleVolumeChange}
                          style={{ accentColor: pastelRed.DEFAULT }}
                          className="w-24 h-2 cursor-pointer"
                          aria-label="Volume slider"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                
                <div className="relative">
                  <motion.button 
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowSettings(!showSettings)}
                    style={{ color: pastelRed.light }}
                    className="hover:text-white transition-colors"
                    aria-label="Settings"
                  >
                    <Settings size={22} />
                  </motion.button>
                  
                  <AnimatePresence>
                    {showSettings && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute bottom-10 right-0 rounded-lg p-3 w-48 z-20 shadow-xl"
                        style={{backgroundColor: darkTheme.popupBg}}
                      >
                        <div className="mb-3">
                          <p className="text-neutral-400 text-xs mb-1.5 font-medium select-none">Velocidad</p>
                          <div className="grid grid-cols-4 gap-1">
                            {[0.5, 1, 1.5, 2].map(rate => (
                              <motion.button
                                key={rate}
                                whileHover={{ backgroundColor: pastelRed.DEFAULT, color: 'white' }}
                                className={`text-neutral-200 text-xs py-1 px-1.5 rounded transition-colors duration-150 ease-in-out select-none`}
                                style={{
                                  backgroundColor: playbackRate === rate ? pastelRed.dark : darkTheme.controlBg,
                                  color: playbackRate === rate ? 'white' : undefined
                                }}
                                onClick={() => changePlaybackRate(rate)}
                              >
                                {rate}x
                              </motion.button>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <p className="text-neutral-400 text-xs mb-1.5 font-medium select-none">Calidad</p>
                          <div className="flex flex-col space-y-1">
                            {qualityOptions.map(quality => (
                              <motion.button
                                key={quality}
                                whileHover={{ backgroundColor: pastelRed.DEFAULT, color: 'white' }}
                                className={`text-neutral-200 text-xs py-1 px-2 rounded text-left transition-colors duration-150 ease-in-out select-none`}
                                style={{
                                  backgroundColor: selectedQuality === quality ? pastelRed.dark : darkTheme.controlBg,
                                  color: selectedQuality === quality ? 'white' : undefined
                                }}
                                onClick={() => changeQuality(quality)}
                              >
                                {quality}
                              </motion.button>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <motion.button
  whileTap={{ scale: 0.9 }}
  onClick={downloadVideo}
  style={{ color: pastelRed.light }}
  className="hover:text-white transition-colors cursor-pointer"
  aria-label="Descargar video"
  title="Descargar video"
>
  {/* Ícono de descarga SVG */}
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/>
    <line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
</motion.button>


                <motion.button 
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleFullscreen}
                  style={{ color: pastelRed.light }}
                  className="hover:text-white transition-colors"
                  aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                >
                  <Maximize size={22} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VideoPlayer;