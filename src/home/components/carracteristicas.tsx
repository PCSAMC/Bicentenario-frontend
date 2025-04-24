import { motion } from "framer-motion";
import { UserCheck, FileText, SearchCheck, ArrowRight } from "lucide-react";

function FeaturesSection() {
  const features = [
    {
      icon: <UserCheck className="w-6 h-6 text-red-600" />,
      title: "Gestión de Usuarios Eficiente y Segura",
      description:
        "Los usuarios pueden registrarse, personalizar su perfil y acceder a funciones exclusivas de forma segura.",
      img: "https://picsum.photos/seed/gestion/400/250",
    },
    {
      icon: <FileText className="w-6 h-6 text-red-600" />,
      title: "Carga de Testimonios en Múltiples Formatos",
      description:
        "El sistema permite la carga de relatos en texto, audio y video para una documentación rica y diversa.",
      img: "https://picsum.photos/seed/carga/400/250",
    },
    {
      icon: <SearchCheck className="w-6 h-6 text-red-600" />,
      title: "Búsqueda Avanzada para Encontrar Testimonios",
      description:
        "Encuentra testimonios relevantes usando filtros por fecha, región, autor y palabra clave.",
      img: "https://picsum.photos/seed/busqueda/400/250",
    },
  ];

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto text-center">
        <motion.p
          className="text-sm font-semibold text-red-600 uppercase tracking-widest mb-3"
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Innovación
        </motion.p>
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Características destacadas de nuestro sistema
        </motion.h2>
        <motion.p
          className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto mb-14"
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Accede a un sistema completo para la gestión, búsqueda y publicación de testimonios históricos
          del Bicentenario de Bolivia. Todo lo que necesitas para preservar y explorar nuestra historia.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-14">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="text-left rounded-2xl shadow-md overflow-hidden bg-white hover:shadow-lg transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <img src={feature.img} alt={feature.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="bg-red-600 hover:bg-red-700 text-white text-sm px-6 py-3 rounded-full transition font-medium"
          >
            Descubrir más
          </motion.button>
          <button className="text-red-700 text-sm flex items-center font-medium hover:underline">
            Únete ahora <ArrowRight size={16} className="ml-1" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;
