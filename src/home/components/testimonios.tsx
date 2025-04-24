import { motion } from "framer-motion";
import { Star } from "lucide-react";

function TestimonialsSection() {
  const testimonials = [
    {
      name: "María Fernanda",
      position: "Investigadora Histórica",
      company: "Universidad Mayor de San Andrés",
      text: "Gracias a este sistema pude encontrar testimonios fundamentales para mi estudio sobre la independencia. Es una herramienta valiosa para la historia boliviana.",
      img: "https://i.pravatar.cc/48?img=47",
    },
    {
      name: "José Luis",
      position: "Curador Cultural",
      company: "Archivo Nacional",
      text: "La forma en que se organizan y presentan los testimonios hace que este archivo digital sea único. Un verdadero aporte al Bicentenario.",
      img: "https://i.pravatar.cc/48?img=3",
    },
    {
      name: "Carmen Rojas",
      position: "Docente de Historia",
      company: "Colegio Ayacucho",
      text: "Mis estudiantes han aprendido más sobre Bolivia leyendo relatos reales que con cualquier libro de texto. ¡Increíble recurso educativo!",
      img: "https://i.pravatar.cc/48?img=5",
    },
  ];

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-sm font-semibold text-red-600 uppercase tracking-widest mb-2">
            Testimonios
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            Lo que dicen nuestros usuarios
          </h2>
          <p className="text-base text-gray-600 mt-4 max-w-2xl mx-auto">
            Opiniones de investigadores, docentes y ciudadanos que han utilizado el sistema de archivos del Bicentenario.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              className="border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 bg-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="flex mb-3">
                {[...Array(5)].map((_, idx) => (
                  <Star key={idx} size={18} fill="#facc15" color="#facc15" className="mr-1" />
                ))}
              </div>
              <p className="text-sm text-gray-700 italic mb-4">
                "{t.text}"
              </p>
              <div className="flex items-center">
                <img src={t.img} alt={t.name} className="w-10 h-10 rounded-full mr-3" />
                <div>
                  <p className="text-sm font-semibold text-gray-800">{t.name}</p>
                  <p className="text-xs text-gray-500">{t.position}, {t.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;