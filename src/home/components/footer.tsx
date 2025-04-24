import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail, Phone, Facebook, Twitter, Instagram, Youtube, Linkedin, ChevronUp, Globe, Calendar, Book } from 'lucide-react';

function Footer() {
  const [hoverSection, setHoverSection] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const pageHeight = document.body.offsetHeight - 200;
      if (scrollPosition > pageHeight) {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const linkSections = [
    {
      title: "Descubre Bolivia",
      icon: Globe,
      links: ["Historia Nacional", "Culturas Ancestrales", "Naturaleza y Geografía", "Patrimonio Cultural"]
    },
    {
      title: "El Bicentenario",
      icon: Calendar,
      links: ["Cronología Histórica", "Personajes Clave", "Impacto Social", "Celebraciones"]
    },
    {
      title: "Recursos",
      icon: Book,
      links: ["Biblioteca Digital", "Galerías Fotográficas", "Documentos Históricos", "Material Educativo"]
    }
  ];

  const wavePathVariants = {
    initial: { 
      d: "M0,96 C320,64 480,128 720,96 C960,64 1120,128 1200,96 L1200,0 L0,0 Z" 
    },
    animate: {
      d: "M0,96 C320,128 480,64 720,96 C960,128 1120,64 1200,96 L1200,0 L0,0 Z",
      transition: { 
        repeat: Infinity,
        repeatType: "reverse",
        duration: 10, 
        ease: "easeInOut" 
      }
    }
  };

  return (
    <motion.footer 
      className="relative pt-24 pb-12 overflow-hidden bg-red-700 text-white"
      style={{ backgroundImage: "url('/assets/footer-bg.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={containerVariants}
    >
   

      <div className="max-w-7xl mx-auto px-6">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Branding Section */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-1"
          >
            <div className="flex items-center mb-6">
              <div className="relative flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-600 via-yellow-400 to-green-600 animate-spin-slow opacity-70 blur-sm"></div>
                <div className="bg-white p-3 rounded-full relative z-10">
                  <div className="h-12 w-12 bg-gradient-to-r from-red-600 via-yellow-400 to-green-600 rounded-full flex items-center justify-center overflow-hidden">
                    <span className="text-2xl font-bold text-white">200</span>
                  </div>
                </div>
              </div>
              <motion.div 
                className="ml-4 text-white font-bold text-xl"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <span className="text-red-400">Bi</span>
                <span className="text-yellow-400">cen</span>
                <span className="text-green-400">tenario</span>
              </motion.div>
            </div>

            <motion.p 
              className="text-white/80 mb-6 text-sm"
              variants={itemVariants}
            >
              Celebrando 200 años de historia, patrimonio y cultura boliviana. Un recorrido por nuestra identidad nacional y los caminos de nuestra independencia.
            </motion.p>

            <motion.div 
              className="space-y-4 mb-8"
              variants={itemVariants}
            >
              <div className="flex items-center text-white/90 hover:text-yellow-300 transition-colors duration-300">
                <MapPin size={16} className="mr-3 flex-shrink-0" />
                <span className="text-sm">Palacio Quemado, Plaza Murillo, La Paz, Bolivia</span>
              </div>
              <div className="flex items-center text-white/90 hover:text-yellow-300 transition-colors duration-300">
                <Mail size={16} className="mr-3 flex-shrink-0" />
                <span className="text-sm">contacto@bicentenario.gob.bo</span>
              </div>
              <div className="flex items-center text-white/90 hover:text-yellow-300 transition-colors duration-300">
                <Phone size={16} className="mr-3 flex-shrink-0" />
                <span className="text-sm">+591 2-2714400</span>
              </div>
            </motion.div>

            <motion.div 
              className="flex space-x-4 mb-6"
              variants={itemVariants}
            >
              {[Facebook, Twitter, Instagram, Youtube, Linkedin].map((Icon, i) => (
                <motion.a 
                  key={i} 
                  href="#" 
                  className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-all duration-300"
                  whileHover={{ y: -4, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon size={18} className="text-white" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Link Sections */}
          {linkSections.map((section, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="lg:col-span-1"
              onHoverStart={() => setHoverSection(i)}
              onHoverEnd={() => setHoverSection(null)}
            >
              <motion.h4 
                className="text-yellow-300 font-bold mb-6 pb-2 border-b border-white/10 flex items-center"
                whileHover={{ x: 4 }}
              >
                {section.icon && 
                  <span className="mr-2">
                    <section.icon size={18} className="inline" />
                  </span>
                }
                {section.title}
              </motion.h4>
              <ul className="space-y-3">
                {section.links.map((link, j) => (
                  <motion.li 
                    key={j}
                    whileHover={{ x: 6 }}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      transition: { delay: 0.1 * j }
                    }}
                  >
                    <a 
                      href="#" 
                      className="text-white/70 hover:text-yellow-300 text-sm flex items-center transition-colors duration-300"
                    >
                      <span className="mr-2 text-yellow-500/60">•</span>
                      {link}
                      <motion.span
                        initial={{ width: 0, opacity: 0 }}
                        animate={hoverSection === i ? { width: "auto", opacity: 1 } : { width: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="ml-1 overflow-hidden"
                      >
                        <ChevronUp size={12} className="rotate-90" />
                      </motion.span>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Newsletter */}
        <motion.div 
          className="relative mx-auto mb-16 max-w-3xl text-center"
          variants={itemVariants}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 via-yellow-500/20 to-green-600/20 blur-xl rounded-xl"></div>
          <div className="relative z-10 bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
            <h4 className="text-white font-bold text-xl mb-2">Mantente Conectado</h4>
            <p className="text-white/70 mb-6">Recibe noticias y eventos del Bicentenario</p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input 
                type="email" 
                placeholder="Tu correo electrónico" 
                className="flex-grow bg-white/20 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-red-600 via-yellow-500 to-green-600 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center"
              >
                Suscribirse
                <ChevronUp size={18} className="ml-2 rotate-90" />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div 
          className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center"
          variants={itemVariants}
        >
          <motion.div 
            className="text-white/60 text-sm mb-4 md:mb-0"
            whileHover={{ color: "#FFFFFF" }}
          >
            © {new Date().getFullYear()} Bicentenario de Bolivia. Todos los derechos reservados.
          </motion.div>
          <motion.div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {["Política de Privacidad", "Términos de Uso", "Accesibilidad", "Mapa del Sitio"].map((item, i) => (
              <motion.a 
                key={i} 
                href="#" 
                className="text-white/60 text-sm hover:text-yellow-300 transition-colors duration-300"
                whileHover={{ x: 2 }}
              >
                {item}
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Back to top button */}
      <motion.button
        className="absolute right-6 bottom-12 bg-gradient-to-r from-red-600 to-green-600 rounded-full p-3 text-white shadow-lg shadow-red-900/30"
        whileHover={{ y: -4, scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <ChevronUp size={24} />
      </motion.button>

      {/* Animated accent element */}
      <div className="absolute -left-20 top-1/2 transform -translate-y-1/2">
        <motion.div 
          className="h-96 w-96 bg-yellow-500/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      </div>
      <div className="absolute -right-20 bottom-0">
        <motion.div 
          className="h-80 w-80 bg-red-500/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ 
            duration: 7,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 1
          }}
        />
      </div>
    </motion.footer>
  );
}

export default Footer;