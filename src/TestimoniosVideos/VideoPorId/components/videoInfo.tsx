// components/VideoInfo.tsx
import React, { useState, useEffect } from 'react';
import { Video } from '../types/VideosData.types';
import {
  ThumbsUp,
  ThumbsDown,
  Share,
  Flag,
  Star,
  Eye,
  Calendar,
  MapPin,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface VideoInfoProps {
  video: Video;
}

const VideoInfo: React.FC<VideoInfoProps> = ({ video }) => {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [isStarred, setIsStarred] = useState(false);
  const [likeCount, setLikeCount] = useState(video.likes);
  const [dislikeCount, setDislikeCount] = useState(video.dislikes);
  const [starCount, setStarCount] = useState(video.stars);

  // Theme colors - Red focused
  const themeColors = {
    primary: 'red-600',
    primaryHover: 'red-700',
    primaryLightBg: 'red-100', // For active states like 'liked'
    textDark: 'gray-800',
    textMedium: 'gray-700',
    textLight: 'gray-500', // For less prominent text
    iconDefault: 'gray-500',
    iconActive: 'red-600', // For active icons
    cardBg: 'bg-white',
    containerBg: 'bg-gray-50', // For description background etc.
    borderColor: 'gray-200',
    decorativeBanner: 'bg-red-600', // Solid red banner
  };

  // Effect for entry animation
  useEffect(() => {
    const timer = setTimeout(() => {
      const infoElement = document.getElementById('video-info-container');
      if (infoElement) {
        infoElement.classList.remove('opacity-0');
        infoElement.classList.add('opacity-100');
      }
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  // Like handler
  const handleLike = () => {
    if (!liked) {
      setLikeCount(prev => prev + 1);
      if (disliked) {
        setDislikeCount(prev => prev - 1);
        setDisliked(false);
      }
    } else {
      setLikeCount(prev => prev - 1);
    }
    setLiked(!liked);
  };

  // Dislike handler
  const handleDislike = () => {
    if (!disliked) {
      setDislikeCount(prev => prev + 1);
      if (liked) {
        setLikeCount(prev => prev - 1);
        setLiked(false);
      }
    } else {
      setDislikeCount(prev => prev - 1);
    }
    setDisliked(!disliked);
  };

  // Star handler
  const handleStar = () => {
    setIsStarred(!isStarred);
    setStarCount(prev => isStarred ? prev - 1 : prev + 1);
  };

  // Toggle share options
  const toggleShareOptions = () => {
    setShowShareOptions(!showShareOptions);
  };

  // Format date
  const formatDate = (date: string) => {
    const diffInMs = Date.now() - new Date(date).getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 3600 * 24));
    if (diffInDays < 1) return 'Publicado hoy';
    if (diffInDays === 1) return 'Publicado hace 1 día';
    if (diffInDays < 7) return `Publicado hace ${diffInDays} días`;
    if (diffInDays < 30) return `Publicado hace ${Math.floor(diffInDays / 7)} semanas`;
    if (diffInDays < 365) return `Publicado hace ${Math.floor(diffInDays / 30)} meses`;
    return `Publicado hace ${Math.floor(diffInDays / 365)} años`;
  };

  return (
    <motion.div
      id="video-info-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`mt-0  max-w-8xl mx-9xl ${themeColors.cardBg} p-5 sm:p-6 rounded-xl shadow-xl  ${themeColors.borderColor} opacity-0 transition-opacity duration-500`}
    >
      {/* Decorative Banner */}
      <div className={`h-3 w-180 ${themeColors.decorativeBanner} rounded-t-xl mb-6 -mt-5 sm:-mt-6 -mx-5 sm:-mx-6`}></div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className={`text-2xl sm:text-3xl font-bold text-${themeColors.textDark} mb-2`}
      >
        {video.title}
      </motion.h1>

      {/* Views & Date */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className={`flex flex-wrap items-center text-${themeColors.textLight} text-xs sm:text-sm mb-4`}
      >
        <div className="flex items-center mr-4">
          <Eye size={16} className={`mr-1 text-${themeColors.primary}`} />
          <span className={`font-semibold text-${themeColors.textMedium}`}>{video.views.toLocaleString()}</span>
          <span className="ml-1">vistas</span>
        </div>
        <div className="flex items-center">
          <Calendar size={16} className={`mr-1 text-${themeColors.primary}`} />
          <span>{formatDate(video.createdAt)}</span>
        </div>
      </motion.div>

      {/* Divider */}
      <hr className={`my-4 border-${themeColors.borderColor}`} />
      
      {/* User Info & Action Buttons Row */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-5">
        {/* User Info */}
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="flex items-center mb-4 sm:mb-0"
        >
            <div className={`w-10 h-10 rounded-full bg-${themeColors.primary} flex items-center justify-center text-white font-bold text-lg mr-3 border-2 border-white shadow-sm flex-shrink-0`}>
                {video.user.name.charAt(0).toUpperCase()}
            </div>
            <div>
                <p className={`text-base font-semibold text-${themeColors.textDark}`}>{video.user.name}</p>
                <div className={`flex items-center text-xs text-${themeColors.textLight}`}>
                    <MapPin size={14} className={`mr-1 text-${themeColors.primary}`} />
                    <span>{video.city.name}</span>
                </div>
            </div>
        </motion.div>

        {/* Interaction Buttons */}
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap items-center space-x-1 sm:space-x-2" // Reduced space-x for smaller screens if buttons wrap
        >
            {/* Like Button */}
            <motion.button
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                onClick={handleLike}
                className={`flex items-center space-x-1.5 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-lg transition-colors duration-200 ${
                liked ? `bg-${themeColors.primaryLightBg} text-${themeColors.iconActive}` : `text-${themeColors.textMedium} hover:bg-gray-100`
                }`}
            >
                <motion.div animate={liked ? { scale: [1, 1.3, 1] } : {}} transition={{ duration: 0.3 }}>
                <ThumbsUp size={18} className={liked ? `text-${themeColors.iconActive}` : `text-${themeColors.iconDefault}`} />
                </motion.div>
                <span className="text-xs sm:text-sm font-medium">{likeCount.toLocaleString()}</span>
            </motion.button>

            {/* Dislike Button */}
            <motion.button
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                onClick={handleDislike}
                className={`flex items-center space-x-1.5 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-lg transition-colors duration-200 ${
                disliked ? `bg-${themeColors.primaryLightBg} text-${themeColors.iconActive}` : `text-${themeColors.textMedium} hover:bg-gray-100`
                }`}
            >
                <motion.div animate={disliked ? { scale: [1, 1.3, 1] } : {}} transition={{ duration: 0.3 }}>
                <ThumbsDown size={18} className={disliked ? `text-${themeColors.iconActive}` : `text-${themeColors.iconDefault}`} />
                </motion.div>
                <span className="text-xs sm:text-sm font-medium">{dislikeCount.toLocaleString()}</span>
            </motion.button>

            {/* Star Button */}
            <motion.button
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                onClick={handleStar}
                className={`flex items-center space-x-1.5 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-lg transition-colors duration-200 ${
                isStarred ? `bg-yellow-100 text-yellow-500` : `text-${themeColors.textMedium} hover:bg-gray-100`
                }`}
            >
                <motion.div animate={isStarred ? { rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] } : {}} transition={{ duration: 0.4 }}>
                <Star size={18} fill={isStarred ? "currentColor" : "none"} className={isStarred ? 'text-yellow-500' : `text-${themeColors.iconDefault}`} />
                </motion.div>
                <span className="text-xs sm:text-sm font-medium">{starCount.toLocaleString()}</span>
            </motion.button>

            {/* Share Button */}
            <motion.div className="relative">
                <motion.button
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                onClick={toggleShareOptions}
                className={`flex items-center space-x-1.5 px-2.5 py-1.5 sm:px-3 sm:py-2 bg-${themeColors.primary} text-white rounded-lg hover:bg-${themeColors.primaryHover} transition-colors duration-200`}
                >
                <Share size={18} />
                <span className="text-xs sm:text-sm font-medium hidden sm:inline">Compartir</span> {/* Hide text on very small screens */}
                </motion.button>
                <AnimatePresence>
                {showShareOptions && (
                    <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 5 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 5 }}
                    transition={{ duration: 0.15 }}
                    className={`absolute right-0 mt-2 p-2 ${themeColors.cardBg} rounded-lg shadow-xl z-20 w-44 border border-${themeColors.borderColor}`}
                    >
                    <div className="flex flex-col space-y-1">
                        <button className={`w-full flex items-center space-x-2 p-1.5 text-xs text-${themeColors.textMedium} hover:bg-gray-100 rounded-md transition-colors`}>
                            <div className="w-5 h-5 rounded-full bg-gray-600 flex items-center justify-center text-white text-xs font-mono">f</div>
                            <span>Facebook</span>
                        </button>
                        <button className={`w-full flex items-center space-x-2 p-1.5 text-xs text-${themeColors.textMedium} hover:bg-gray-100 rounded-md transition-colors`}>
                            <div className="w-5 h-5 rounded-full bg-gray-600 flex items-center justify-center text-white text-xs font-mono">t</div>
                            <span>Twitter</span>
                        </button>
                        <button className={`w-full flex items-center space-x-2 p-1.5 text-xs text-${themeColors.textMedium} hover:bg-gray-100 rounded-md transition-colors`}>
                            <div className="w-5 h-5 rounded-full bg-gray-600 flex items-center justify-center text-white text-xs font-mono">w</div>
                            <span>WhatsApp</span>
                        </button>
                    </div>
                    </motion.div>
                )}
                </AnimatePresence>
            </motion.div>

            {/* Report Button (Icon Only) */}
            <motion.button
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                title="Reportar" // Tooltip for accessibility
                className={`flex items-center justify-center p-1.5 sm:p-2 rounded-lg text-${themeColors.textMedium} hover:bg-gray-100 border border-transparent hover:border-${themeColors.borderColor} transition-colors duration-200`}
            >
                <Flag size={18} className={`text-${themeColors.iconDefault}`} />
            </motion.button>
        </motion.div>
      </div>


      {/* Description Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mb-6"
      >
        <h3 className={`text-lg font-semibold text-${themeColors.textDark} mb-2`}>Descripción</h3>
        <div className={`${themeColors.containerBg} p-3 sm:p-4 rounded-lg border-l-4 border-${themeColors.primary}`}>
            <p className={`text-sm sm:text-base text-${themeColors.textMedium} leading-relaxed whitespace-pre-wrap`}>
                {video.description}
            </p>
        </div>
      </motion.div>

      {/* Tags Section */}
      {video.tags && video.tags.length > 0 && (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
        >
            <h3 className={`text-md font-semibold text-${themeColors.textDark} mb-2 sm:mb-3`}>Etiquetas</h3>
            <div className="flex flex-wrap gap-2">
                {video.tags.map((tag, index) => (
                <motion.span
                    key={tag.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 + (index * 0.05) }}
                    whileHover={{ scale: 1.05, backgroundColor: themeColors.primary, color: 'white' }}
                    className={`bg-gray-100 text-${themeColors.textMedium} text-xs px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full cursor-pointer transition-all duration-200 hover:shadow-md`}
                >
                    #{tag.name}
                </motion.span>
                ))}
            </div>
        </motion.div>
      )}
      
      {/* Recommendations Section (Placeholder) */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-8"
      >
        {/* Content for recommendations would go here */}
      </motion.div>
    </motion.div>
  );
};

export default VideoInfo;