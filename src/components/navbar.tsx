import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaUpload, FaSignInAlt, FaUserPlus, FaVideo, FaComments, FaNewspaper, FaUser, FaBars, FaTimes, FaFlag, FaStar } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const location = useLocation();
  const [scrollPosition, setScrollPosition] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('/');

  // Control de scroll para efectos
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Actualizar item activo basado en la ruta
  useEffect(() => {
    setActiveItem(location.pathname);
  }, [location]);

  const isScrolled = scrollPosition > 50;

  // Menú de navegación items
  const navItems = [
    { to: '/', label: 'Inicio', icon: <FaHome /> },
    { to: '/subir', label: 'Subir contenido', icon: <FaUpload /> },
    { to: '/videos', label: 'Videos', icon: <FaVideo /> },
    { to: '/testimonios', label: 'Testimonios', icon: <FaComments /> },
    { to: '/publicaciones', label: 'Publicaciones', icon: <FaNewspaper /> },
    { to: '/perfil', label: 'Mi perfil', icon: <FaUser /> },
  ];

  // Items de autenticación
  const authItems = [
    { to: '/login', label: 'Iniciar sesión', icon: <FaSignInAlt /> },
    { to: '/register', label: 'Registrarse', icon: <FaUserPlus /> },
  ];

  // Variantes para las animaciones
  const navbarVariants = {
    hidden: { y: -100 },
    visible: { y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } }
  };

  const logoVariants = {
    normal: { scale: 1 },
    hover: { scale: 1.05, transition: { yoyo: Infinity, duration: 1 } }
  };

  // Array de colores para elementos decorativos
  const flagColors = ['#E30613', '#F9E300', '#009A3D'];

  return (
    <motion.header 
      initial="hidden"
      animate="visible"
      variants={navbarVariants}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'py-2' : 'py-4'
      }`}
      style={{ 
        backgroundColor: 'rgba(0, 0, 0, 0.95)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
      }}
    >
      {/* Elementos decorativos */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-yellow-500 to-green-600"></div>
      <div className="absolute top-0 left-0 right-0 h-full bg-black/80"></div>
      
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 relative">
        {/* Logo con animación */}
        <Link to="/">
          <motion.div 
            className="flex items-center group"
            whileHover="hover"
            animate="normal"
            variants={logoVariants}
          >
            <div className="relative">
              <div className={`flex items-center justify-center ${isScrolled ? 'w-9 h-9' : 'w-11 h-11'} transition-all duration-300`}>
                {/* Capas circulares con los colores nacionales */}
                {flagColors.map((color, index) => (
                  <motion.div 
                    key={index}
                    className="absolute inset-0 rounded-full"
                    style={{ 
                      backgroundColor: color,
                      zIndex: 3 - index,
                      opacity: 0.85 - (index * 0.2)
                    }}
                    animate={{ 
                      rotate: [0, 360],
                      scale: [1, 1.05, 1]
                    }}
                    transition={{ 
                      duration: 8 + (index * 4),
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                ))}
                
                {/* Estrella central */}
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <FaStar className="text-white text-lg" />
                </div>
              </div>
              
              {/* Efecto de brillo */}
              <motion.div 
                className="absolute inset-0 rounded-full bg-white blur-md opacity-0"
                animate={{ opacity: [0, 0.4, 0] }}
                transition={{ duration: 6, repeat: Infinity, repeatDelay: 3 }}
              />
            </div>
            
            <div className="flex flex-col ml-3">
              <motion.span 
                className={`font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 transition-all duration-300 ${isScrolled ? 'text-xl' : 'text-2xl'}`}
                whileHover={{ scale: 1.05 }}
              >
                Bicentenario
              </motion.span>
              <motion.span 
                className={`font-bold text-white transition-all duration-300 ${isScrolled ? 'text-sm' : 'text-base'} opacity-80`}
              >
                1825 - 2025 Bolivia
              </motion.span>
            </div>
          </motion.div>
        </Link>

        {/* Navegación de escritorio */}
        <nav className="hidden lg:block">
          <div className="flex items-center bg-black/80 rounded-full px-2 border border-white/10">
            <div className="flex">
              {navItems.map((item, index) => {
                const isActive = activeItem === item.to;
                
                return (
                  <Link
                    key={index}
                    to={item.to}
                    className="relative py-2.5 px-4 text-sm font-medium transition-colors duration-200 group"
                    onClick={() => setActiveItem(item.to)}
                  >
                    <span className={`flex items-center ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>
                      <span className="mr-1.5">{item.icon}</span>
                      {item.label}
                    </span>
                    
                    {isActive && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className="absolute bottom-0 left-0 right-0 h-full rounded-full bg-white/10"
                        initial={false}
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>
            
            <div className="mx-3 h-5 w-px bg-white/20"></div>
            
            <div className="flex space-x-2">
              {authItems.map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to={item.to}
                    className={`flex items-center py-1.5 px-4 rounded-full text-sm font-medium transition-all duration-200 ${
                      index === 0 
                        ? 'text-white/90 hover:text-white border border-white/20 hover:border-white/40' 
                        : 'bg-gradient-to-r from-red-600 via-yellow-600 to-green-600 text-white hover:shadow-md hover:shadow-yellow-900/20'
                    }`}
                  >
                    <span className="mr-1.5">{item.icon}</span>
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </nav>

        {/* Botón del menú móvil */}
        <motion.button
          className="lg:hidden bg-black/70 p-2 rounded-full border border-white/10 text-white focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          whileTap={{ scale: 0.9 }}
        >
          {mobileMenuOpen ? (
            <FaTimes className="text-xl" />
          ) : (
            <FaBars className="text-xl" />
          )}
        </motion.button>
      </div>

      {/* Menú móvil */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-black/95 mt-2 mx-4 rounded-xl overflow-hidden border border-white/10 shadow-xl"
          >
            <div className="px-4 py-4 space-y-1 max-h-[70vh] overflow-y-auto">
              {navItems.map((item, index) => {
                const isActive = activeItem === item.to;
                
                return (
                  <motion.div
                    key={index}
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      to={item.to}
                      className={`flex items-center py-3 px-4 text-sm ${
                        isActive 
                          ? 'bg-white/10 text-white rounded-lg' 
                          : 'text-gray-300 hover:text-white'
                      }`}
                      onClick={() => {
                        setActiveItem(item.to);
                        setMobileMenuOpen(false);
                      }}
                    >
                      <span className={`mr-3 ${
                        isActive ? 'text-yellow-400' : 'text-gray-400'
                      }`}>{item.icon}</span>
                      {item.label}
                    </Link>
                  </motion.div>
                );
              })}
              
              <div className="h-px bg-white/10 my-3"></div>
              
              <div className="space-y-2">
                {authItems.map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      to={item.to}
                      className={`flex items-center py-3 px-4 rounded-lg text-sm ${
                        index === 0 
                          ? 'border border-white/20 text-white/90' 
                          : 'bg-gradient-to-r from-red-600 via-yellow-600 to-green-600 text-white'
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span className="mr-3">{item.icon}</span>
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
              
              {/* Distintivo del bicentenario */}
              <div className="mt-4 pt-4 border-t border-white/10 flex justify-center">
                <div className="flex items-center text-xs text-gray-400">
                  <FaFlag className="mr-1 text-yellow-500" />
                  Bicentenario Bolivia 1825-2025
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;