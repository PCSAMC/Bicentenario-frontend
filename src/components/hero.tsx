import React, { useEffect, useState, useRef } from 'react';
import { FaFlag, FaCalendarAlt, FaHistory, FaMicrophone, FaVideo, FaUserFriends, FaMapMarkedAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const heroRef = useRef(null);
  
  useEffect(() => {
    setIsLoaded(true);
    
    // Efecto de partículas en movimiento
    const interval = setInterval(() => {
      if (heroRef.current) {
        const particles = heroRef.current.querySelectorAll('.particle');
        particles.forEach(particle => {
          const randomX = Math.random() * 10 - 5;
          const randomY = Math.random() * 10 - 5;
          particle.style.transform = `translate(${randomX}px, ${randomY}px)`;
        });
      }
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);
  
  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: { 
        duration: 1,
        delay: custom * 0.2,
        ease: [0.43, 0.13, 0.23, 0.96]
      }
    })
  };
  
  const scaleInVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (custom) => ({
      opacity: 1,
      scale: 1,
      transition: { 
        duration: 0.8,
        delay: custom * 0.2,
        ease: [0.43, 0.13, 0.23, 0.96]
      }
    })
  };
  
  const buttonHoverVariants = {
    hover: { 
      scale: 1.05,
      boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
      transition: { type: "spring", stiffness: 400, damping: 10 }
    }
  };
  
  // Datos para los números animados
  const stats = [
    { icon: <FaHistory />, label: "Años de Historia", value: "200" },
    { icon: <FaMapMarkedAlt />, label: "Departamentos", value: "9" },
    { icon: <FaUserFriends />, label: "Culturas", value: "36+" },
  ];

  return (
    <section 
      ref={heroRef}
      className="relative h-screen overflow-hidden bg-gradient-to-br from-gray-950 via-blue-950 to-purple-950 text-center flex flex-col justify-center items-center"
    >
      {/* Partículas de fondo con animación */}
      {Array.from({ length: 30 }).map((_, i) => (
        <div 
          key={i}
          className={`particle absolute w-2 h-2 rounded-full bg-opacity-20 transition-transform duration-1000 ease-in-out ${
            i % 3 === 0 ? 'bg-red-500' : i % 3 === 1 ? 'bg-yellow-500' : 'bg-green-500'
          }`}
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.5 + 0.1,
            width: `${Math.random() * 8 + 2}px`,
            height: `${Math.random() * 8 + 2}px`,
            filter: `blur(${Math.random() * 2}px)`
          }}
        />
      ))}
      
      {/* Efecto de luz radial */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2/3 h-2/3 rounded-full bg-blue-400 opacity-5 blur-3xl"></div>
      
      {/* Líneas decorativas en el fondo */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-10"></div>
        <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-10"></div>
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-yellow-500 to-transparent opacity-10"></div>
        <div className="absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-transparent via-green-500 to-transparent opacity-10"></div>
      </div>
      
      {/* Contenido principal con animaciones */}
      <div className="relative z-10 px-6 w-full max-w-7xl mx-auto">
        {/* Seal/Emblem */}
        <motion.div
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          variants={scaleInVariants}
          custom={0}
          className="mb-4 mx-auto"
        >
          <div className="relative inline-block">
            <div className="w-16 h-16 md:w-24 md:h-24 rounded-full border-2 border-yellow-500 flex items-center justify-center bg-blue-950 bg-opacity-50 mb-3">
              <FaFlag className="text-yellow-500 text-2xl md:text-4xl" />
            </div>
            <div className="absolute -top-1 -left-1 -right-1 -bottom-1 rounded-full border border-yellow-500 opacity-50 animate-ping"></div>
          </div>
        </motion.div>
        
        {/* Título principal con animación */}
        <motion.div
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          variants={fadeInUpVariants}
          custom={1}
          className="mb-2"
        >
          <span className="inline-block text-sm md:text-base uppercase tracking-widest text-yellow-500 font-semibold">República de Bolivia</span>
        </motion.div>
        
        <motion.div
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          variants={fadeInUpVariants}
          custom={2}
          className="mb-3"
        >
          <h1 className="text-4xl md:text-7xl font-extrabold">
            <span className="text-white">Bicentenario</span>
            <span className="ml-2 md:ml-4 text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-yellow-500 to-green-500">2025</span>
          </h1>
        </motion.div>
        
        {/* Números animados */}
        <motion.div 
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          variants={fadeInUpVariants}
          custom={3}
          className="flex flex-wrap justify-center gap-8 my-8"
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center px-4">
              <div className="flex items-center justify-center text-3xl md:text-5xl font-bold mb-1">
                <span className="mr-2 text-white">{stat.value}</span>
                <span className={`text-xl ${index % 3 === 0 ? 'text-red-500' : index % 3 === 1 ? 'text-yellow-500' : 'text-green-500'}`}>
                  {stat.icon}
                </span>
              </div>
              <div className="text-xs md:text-sm text-gray-400 uppercase tracking-wide">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
        
        {/* Línea decorativa */}
        <motion.div
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          variants={scaleInVariants}
          custom={4}
          className="flex justify-center my-6"
        >
          <div className="h-0.5 w-24 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500"></div>
        </motion.div>
        
        {/* Descripción */}
        <motion.p
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          variants={fadeInUpVariants}
          custom={5}
          className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto mb-8 leading-relaxed"
        >
          Celebra dos siglos de independencia, soberanía y pluralidad con testimonios, 
          videos, documentos históricos y expresiones culturales de todos los bolivianos.
        </motion.p>
        
        {/* Iconos de características */}
        <motion.div
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          variants={fadeInUpVariants}
          custom={6}
          className="flex flex-wrap justify-center gap-6 md:gap-10 mb-10"
        >
          {[
            { icon: <FaHistory />, label: "Historia" },
            { icon: <FaVideo />, label: "Videos" },
            { icon: <FaMicrophone />, label: "Testimonios" },
            { icon: <FaMapMarkedAlt />, label: "Explorar" }
          ].map((item, index) => (
            <motion.div 
              key={index}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="flex flex-col items-center group cursor-pointer"
            >
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-2 
                ${index % 4 === 0 ? 'bg-red-900 text-red-500' : 
                  index % 4 === 1 ? 'bg-yellow-900 text-yellow-500' : 
                  index % 4 === 2 ? 'bg-green-900 text-green-500' : 
                  'bg-blue-900 text-blue-500'} 
                group-hover:bg-opacity-80 transition-colors`}>
                <span className="text-2xl">{item.icon}</span>
              </div>
              <span className="text-gray-300 text-sm group-hover:text-white transition-colors">{item.label}</span>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Botones de acción */}
        <motion.div
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          variants={fadeInUpVariants}
          custom={7}
          className="flex flex-col sm:flex-row justify-center items-center gap-4"
        >
          <motion.button
            variants={buttonHoverVariants}
            whileHover="hover"
            className="relative overflow-hidden bg-gradient-to-r from-red-600 via-yellow-600 to-green-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg group"
          >
            <span className="absolute -top-10 left-0 right-0 h-40 bg-white opacity-20 transform rotate-12 translate-x-12 -translate-y-2 group-hover:translate-x-96 transition-all duration-1000 ease-in-out"></span>
            <div className="relative flex items-center justify-center">
              <FaCalendarAlt className="mr-2" />
              Explorar Eventos
            </div>
          </motion.button>
          
          <motion.button
            variants={buttonHoverVariants}
            whileHover="hover"
            className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 px-8 rounded-lg border border-gray-700 shadow-lg"
          >
            <div className="flex items-center justify-center">
              <FaUserFriends className="mr-2" />
              Compartir Historia
            </div>
          </motion.button>
        </motion.div>
      </div>
      
      {/* Wiphala pattern bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-3 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500"></div>
      
      {/* Esquinas decorativas */}
      <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-red-500 opacity-50"></div>
      <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-yellow-500 opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-green-500 opacity-50"></div>
      <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-blue-500 opacity-50"></div>
    </section>
  );
};

export default Hero;
  