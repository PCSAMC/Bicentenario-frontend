import { motion } from "framer-motion";
import { Rocket, Search, Users } from "lucide-react";

function PowerSection() {
  return (
    <section className="py-24 px-6 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-20 items-center">
        {/* Texto */}
        <motion.div
          className="flex-1 text-center md:text-left"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center md:justify-start mb-3">
            <Rocket className="text-red-600 w-6 h-6 mr-2" />
            <p className="text-sm font-semibold text-red-600 uppercase tracking-widest">
              Beneficios</p>
          </div>

          <h2 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight tracking-tight">
            El poder de los <span className="inline-block">testimonios históricos</span>
          </h2>

          <motion.p
            className="text-base md:text-lg text-gray-700 mb-10 leading-relaxed font-light max-w-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Explora nuestra colección de testimonios auténticos que fortalecen la memoria del
            Bicentenario de Bolivia. Una herramienta valiosa para investigadores, estudiantes y
            todos los ciudadanos comprometidos con la historia.
          </motion.p>

          <motion.div
            className="space-y-6 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="flex items-start gap-4">
              <Search className="w-6 h-6 text-red-600 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Acceso Rápido</h3>
                <p className="text-sm text-gray-600">
                  Encuentra testimonios en segundos gracias a filtros y búsqueda inteligente.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Users className="w-6 h-6 text-red-600 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Colaboración Activa</h3>
                <p className="text-sm text-gray-600">
                  Interactúa con investigadores y ciudadanos para debatir y construir memoria colectiva.
                </p>
              </div>
            </div>
          </motion.div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="bg-red-600 hover:bg-red-700 text-white text-sm px-6 py-3 rounded-full transition font-medium shadow-md"
            >
              Explorar Testimonios
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="text-red-700 border border-red-600 text-sm px-6 py-3 rounded-full transition font-medium hover:bg-red-50"
            >
              Unirse
            </motion.button>
          </div>
        </motion.div>

        {/* Imagen */}
        <motion.div
          className="flex-1 flex justify-center"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <div className="overflow-hidden rounded-3xl shadow-2xl w-full max-w-4xl">
            <img
              src="https://picsum.photos/seed/testimonios/1200/800"
              alt="Testimonios históricos"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default PowerSection;