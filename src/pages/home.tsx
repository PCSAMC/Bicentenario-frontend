import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaPlay, FaHeadphones, FaNewspaper, FaUpload, FaClock, FaUsers, FaMapMarkedAlt, FaStar, FaCalendarAlt } from 'react-icons/fa';
import Hero from '../components/hero';

const Home = () => {
  // Datos de ejemplo para las secciones
  const featuredVideos = [
    { id: 1, title: "La fundación de Bolivia", thumbnail: "/api/placeholder/300/180", duration: "14:25", views: 1245 },
    { id: 2, title: "Héroes de la independencia", thumbnail: "/api/placeholder/300/180", duration: "08:53", views: 982 },
    { id: 3, title: "Bolivia: 200 años de historia", thumbnail: "/api/placeholder/300/180", duration: "17:30", views: 1587 }
  ];
  
  const testimonials = [
    { id: 1, name: "María Gómez", city: "La Paz", excerpt: "Mi abuelo participó en la Guerra del Chaco y siempre nos contaba...", audio: true },
    { id: 2, name: "Carlos Mamani", city: "Oruro", excerpt: "Las tradiciones de mi familia se remontan a principios del siglo XX...", audio: true },
    { id: 3, name: "Ana Claros", city: "Santa Cruz", excerpt: "Mi bisabuela fue una de las primeras mujeres en...", audio: false }
  ];
  
  const publications = [
    { id: 1, title: "Evolución de la economía boliviana", category: "Economía", date: "15 Feb 2025" },
    { id: 2, title: "Arte y cultura a través del tiempo", category: "Cultura", date: "28 Feb 2025" },
    { id: 3, title: "Tradiciones que perduran", category: "Sociedad", date: "5 Mar 2025" }
  ];
  
  const upcomingEvents = [
    { id: 1, title: "Desfile del Bicentenario", date: "6 Ago 2025", location: "Plaza Murillo, La Paz" },
    { id: 2, title: "Simposio de Historia Nacional", date: "15 Jul 2025", location: "Universidad Mayor de San Andrés" },
    { id: 3, title: "Festival Cultural de los 200 años", date: "1-10 Ago 2025", location: "Nivel Nacional" }
  ];

  // Animaciones
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <div className="bg-black text-white">
      <Hero />
      
      {/* Sección de Introducción */}
      <section className="max-w-6xl mx-auto px-6 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-yellow-500 to-green-500">
            Bicentenario Bolivia: 200 Años de Historia
          </h2>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto mb-8">
            Celebramos 200 años de independencia compartiendo las historias que han forjado nuestra nación. Sube tus videos históricos, testimonios en audio y publicaciones para formar parte de este hito histórico.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-gray-900/80 p-6 rounded-xl border border-white/10"
            >
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center">
                  <FaPlay className="text-white text-2xl" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">Videos Históricos</h3>
              <p className="text-gray-400 mb-4">Comparte grabaciones familiares, documentales o entrevistas que muestren la historia boliviana.</p>
              <Link to="/videos" className="text-yellow-400 hover:text-yellow-300 inline-flex items-center">
                Explorar videos <span className="ml-2">→</span>
              </Link>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-gray-900/80 p-6 rounded-xl border border-white/10"
            >
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-600 to-yellow-800 rounded-full flex items-center justify-center">
                  <FaHeadphones className="text-white text-2xl" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">Testimonios en Audio</h3>
              <p className="text-gray-400 mb-4">Registra tu testimonio o el de tus familiares sobre momentos importantes en la historia de Bolivia.</p>
              <Link to="/testimonios" className="text-yellow-400 hover:text-yellow-300 inline-flex items-center">
                Escuchar testimonios <span className="ml-2">→</span>
              </Link>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-gray-900/80 p-6 rounded-xl border border-white/10"
            >
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-green-800 rounded-full flex items-center justify-center">
                  <FaNewspaper className="text-white text-2xl" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">Publicaciones</h3>
              <p className="text-gray-400 mb-4">Artículos, investigaciones y escritos sobre la historia, cultura e identidad boliviana.</p>
              <Link to="/publicaciones" className="text-yellow-400 hover:text-yellow-300 inline-flex items-center">
                Leer publicaciones <span className="ml-2">→</span>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>
      
      {/* Franja decorativa */}
      <div className="h-2 bg-gradient-to-r from-red-600 via-yellow-500 to-green-600"></div>
      
      {/* Videos Destacados */}
      <section className="py-16 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold">Videos Destacados</h2>
            <Link to="/videos" className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full text-sm transition-colors duration-200">
              Ver todos
            </Link>
          </div>
          
          <motion.div 
            className="grid md:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {featuredVideos.map((video) => (
              <motion.div 
                key={video.id}
                className="bg-gray-900/50 rounded-xl overflow-hidden border border-white/5 group"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <div className="relative">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title} 
                    className="w-full h-40 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                      <FaPlay className="text-white" />
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/70 px-2 py-1 rounded text-xs text-white">
                    {video.duration}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-lg mb-2">{video.title}</h3>
                  <div className="flex items-center text-gray-400 text-sm">
                    <FaClock className="mr-1" />
                    <span className="mr-3">Hace 2 días</span>
                    <FaUsers className="mr-1" />
                    <span>{video.views} vistas</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Contar tu historia */}
      <section className="py-20 bg-gradient-to-r from-yellow-900/20 via-black to-green-900/20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src="/api/placeholder/1600/800" alt="Mapa de Bolivia" className="w-full h-full object-cover" />
        </div>
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Comparte Tu Historia</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Cada relato familiar, cada recuerdo, cada documento o fotografía contribuye a construir la memoria colectiva del Bicentenario de Bolivia.
            </p>
          </div>
          
          <motion.div
            className="flex justify-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link
              to="/subir"
              className="px-8 py-4 bg-gradient-to-r from-red-600 via-yellow-600 to-green-600 rounded-full font-bold text-lg inline-flex items-center"
            >
              <FaUpload className="mr-2" />
              Subir Contenido
            </Link>
          </motion.div>
        </div>
      </section>
      
      {/* Testimonios en Audio */}
      <section className="py-16 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold">Testimonios Recientes</h2>
            <Link to="/testimonios" className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full text-sm transition-colors duration-200">
              Todos los testimonios
            </Link>
          </div>
          
          <motion.div 
            className="grid md:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {testimonials.map((testimony) => (
              <motion.div 
                key={testimony.id}
                className="bg-gray-900/50 p-6 rounded-xl border border-white/5"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-lg">{testimony.name}</h3>
                    <p className="text-gray-400 text-sm flex items-center">
                      <FaMapMarkedAlt className="mr-1" /> {testimony.city}
                    </p>
                  </div>
                  {testimony.audio && (
                    <div className="w-10 h-10 bg-yellow-600 rounded-full flex items-center justify-center">
                      <FaHeadphones className="text-white" />
                    </div>
                  )}
                </div>
                <p className="text-gray-300 mb-4">"{testimony.excerpt}"</p>
                <Link to={`/testimonios/${testimony.id}`} className="text-yellow-400 hover:text-yellow-300 inline-flex items-center text-sm">
                  Leer testimonio completo <span className="ml-2">→</span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Franja decorativa */}
      <div className="h-2 bg-gradient-to-r from-red-600 via-yellow-500 to-green-600"></div>
      
      {/* Publicaciones y Eventos */}
      <section className="py-16 bg-black">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Publicaciones */}
            <div>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold">Publicaciones Recientes</h2>
                <Link to="/publicaciones" className="text-yellow-400 hover:text-yellow-300 text-sm">
                  Ver todas
                </Link>
              </div>
              
              <div className="space-y-4">
                {publications.map((publication) => (
                  <motion.div 
                    key={publication.id}
                    className="bg-gray-900/30 p-4 rounded-lg border border-white/5 hover:border-white/20 transition-colors duration-200"
                    whileHover={{ x: 5 }}
                  >
                    <div className="flex items-center text-xs text-gray-400 mb-1">
                      <span className="bg-white/10 px-2 py-1 rounded">{publication.category}</span>
                      <span className="mx-2">•</span>
                      <span>{publication.date}</span>
                    </div>
                    <h3 className="font-medium">{publication.title}</h3>
                    <Link to={`/publicaciones/${publication.id}`} className="text-yellow-400 hover:text-yellow-300 text-sm inline-flex items-center mt-2">
                      Leer más <span className="ml-1">→</span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* Eventos próximos */}
            <div>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold">Próximos Eventos</h2>
                <Link to="/eventos" className="text-yellow-400 hover:text-yellow-300 text-sm">
                  Calendario completo
                </Link>
              </div>
              
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <motion.div 
                    key={event.id}
                    className="bg-gray-900/30 p-4 rounded-lg border border-white/5 hover:border-white/20 transition-colors duration-200"
                    whileHover={{ x: 5 }}
                  >
                    <h3 className="font-medium">{event.title}</h3>
                    <div className="flex items-center text-gray-400 text-sm mt-2">
                      <FaCalendarAlt className="mr-1" />
                      <span className="mr-3">{event.date}</span>
                      <FaMapMarkedAlt className="mr-1" />
                      <span>{event.location}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA final */}
      <section className="py-16 bg-gradient-to-r from-red-900/30 via-black to-green-900/30 relative">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <FaStar className="text-yellow-500 text-4xl mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Bolivia: 200 años forjando historia
            </h2>
            <p className="text-gray-300 mb-8">
              Un espacio digital para reunir y preservar las historias que han construido nuestra patria. Cada contribución es importante para este archivo histórico del Bicentenario.
            </p>
            <div className="flex justify-center space-x-4">
              <Link to="/register" className="px-6 py-3 bg-gradient-to-r from-red-600 via-yellow-600 to-green-600 rounded-full font-bold">
                Registrarse
              </Link>
              <Link to="/videos" className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full font-medium transition-colors duration-200">
                Explorar
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;