import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Variantes de animación
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.3,
        delayChildren: 0.3,
        duration: 1.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const buttonVariants = {
    hover: { 
      scale: 1.05,
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
      transition: { type: "spring", stiffness: 400, damping: 10 }
    },
    tap: { scale: 0.95 }
  };

  return (
    <motion.section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Fondo con overlay claro */}
      <motion.div 
        className="absolute inset-0 z-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 20, ease: "easeOut" }}
      >
        <div className="absolute inset-0 bg-white opacity-30 z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-20"></div>
        <motion.img 
          src="/assets/desierto-salar-uyuni-bolivia-1504208619.jpg"
          alt="Bolivia landscapes"
          className="w-full h-full object-cover"
          initial={{ scale: 1 }}
          animate={{ scale: isLoaded ? 1.05 : 1 }}
          transition={{ duration: 30, ease: "easeInOut" }}
        />
      </motion.div>
      
      {/* Partículas decorativas */}
      <div className="absolute inset-0 z-10 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-red-600 opacity-10"
            style={{
              width: `${Math.random() * 8 + 2}px`,
              height: `${Math.random() * 8 + 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
            animate={{
              y: [0, -100],
              opacity: [0, 0.5, 0]
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              repeatType: "loop",
              delay: Math.random() * 5
            }}
          />
        ))}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i + 100}
            className="absolute rounded-full bg-yellow-500 opacity-10"
            style={{
              width: `${Math.random() * 8 + 2}px`,
              height: `${Math.random() * 8 + 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
            animate={{
              y: [0, -100],
              opacity: [0, 0.5, 0]
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              repeatType: "loop",
              delay: Math.random() * 5
            }}
          />
        ))}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i + 200}
            className="absolute rounded-full bg-green-600 opacity-10"
            style={{
              width: `${Math.random() * 8 + 2}px`,
              height: `${Math.random() * 8 + 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
            animate={{
              y: [0, -100],
              opacity: [0, 0.5, 0]
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              repeatType: "loop",
              delay: Math.random() * 5
            }}
          />
        ))}
      </div>

      {/* Contenido principal - Modo claro, expandido y más elegante */}
      <div className="relative z-30 text-white px-4 md:px-6 py-10 w-full max-w-7xl mx-auto">
        <motion.div 
          className=" p-8 md:p-16 "
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          
        >
         
          
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.div 
              className="h-1 w-40 bg-gradient-to-r from-red-500 via-yellow-400 to-green-500 mx-auto mb-6"
              variants={itemVariants}
              initial={{ width: 0 }}
              animate={{ width: 160 }}
              transition={{ duration: 1, delay: 0.5 }}
            />
            
            <motion.h2 
              className="text-yellow-400 font-bold text-xl mb-2 tracking-wider uppercase"
              variants={itemVariants}
            >
              Conmemoración Nacional
            </motion.h2>
            
            <motion.h1 
              className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6 text-white"
              variants={itemVariants}
            >
              Testimonios del<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-yellow-500 to-green-600">
                Bicentenario de Bolivia
              </span>
            </motion.h1>
            
            <motion.div 
              className="h-1 w-60 bg-gradient-to-r from-red-500 via-yellow-400 to-green-500 mx-auto my-8"
              variants={itemVariants}
              initial={{ width: 0 }}
              animate={{ width: 240 }}
              transition={{ duration: 1, delay: 1 }}
            />
            
            <motion.p 
              className="text-base md:text-xl text-black mb-12 leading-relaxed font-light"
              variants={itemVariants}
            >
              Un archivo digital que preserva nuestra memoria colectiva y celebra 
              doscientos años de historia independiente. Descubre y comparte testimonios 
              que dan vida al relato de nuestra identidad nacional.
            </motion.p>
            
            <motion.div 
              className="flex flex-col md:flex-row justify-center gap-6"
              variants={itemVariants}
            >
              <motion.button 
                className="px-10 py-4 bg-red-600 border-2 border-red-600 text-gray-800 hover:text-white text-lg font-medium rounded-full transition-all duration-300 group relative overflow-hidden"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <motion.span 
                  className="absolute inset-0 bg-red-600"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.4 }}
                  style={{ zIndex: -1 }}
                />
                <span className="flex items-center text-white justify-center relative z-10">
                  Explorar Testimonios
                  <motion.svg 
                    className="ml-2 w-5 h-5" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                    initial={{ x: 0 }}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </motion.svg>
                </span>
              </motion.button>
              
              <motion.button 
                className="px-10 py-4 bg-gradient-to-r from-yellow-500 to-yellow-400 text-white text-lg font-medium rounded-full transition-all duration-300 shadow-lg"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                Compartir Mi Historia
              </motion.button>
            </motion.div>
            
      
          </div>
        </motion.div>
      </div>
      
      {/* Elementos decorativos animados circulares */}
      <motion.div 
        className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full border-4 border-yellow-500/10 z-10 hidden md:block"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 0.3, scale: 1 }}
        transition={{ duration: 1.5, delay: 1 }}
      />
      <motion.div 
        className="absolute -top-40 -left-40 w-96 h-96 rounded-full border-4 border-red-500/10 z-10 hidden md:block"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 0.3, scale: 1 }}
        transition={{ duration: 1.5, delay: 1.2 }}
      />
    </motion.section>
  );
}

export default HeroSection;