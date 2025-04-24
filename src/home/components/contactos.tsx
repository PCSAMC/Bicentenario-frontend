import { motion } from "framer-motion";
import { Mail, Phone, MapPin as Office } from "lucide-react";

function ContactSection() {
  const contacts = [
    {
      icon: <Mail size={28} className="text-red-600" />,
      title: "Correo Electrónico",
      description:
        "¿Tienes preguntas o sugerencias? Escríbenos y te responderemos lo antes posible.",
      link: "mailto:contacto@bicentenario.bo",
      linkText: "contacto@bicentenario.bo",
    },
    {
      icon: <Phone size={28} className="text-red-600" />,
      title: "Teléfono",
      description:
        "Llámanos de lunes a viernes de 8:00 a 18:00. Estaremos encantados de atenderte.",
      link: "tel:+59122123456",
      linkText: "+591 2 2123456",
    },
    {
      icon: <Office size={28} className="text-red-600" />,
      title: "Dirección de Oficina",
      description:
        "Ven a visitarnos en nuestra sede central. Estamos ubicados en el corazón histórico de La Paz.",
      link: "https://www.google.com/maps",
      linkText: "Calle Socabaya 123, La Paz, Bolivia",
    },
  ];

  return (
    <section className="py-24 px-6 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-sm font-semibold text-red-600 uppercase tracking-widest mb-2">
            Contáctanos
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            Estamos aquí para ayudarte
          </h2>
          <p className="text-base text-gray-600 mt-4 max-w-2xl mx-auto">
            Ya sea que tengas preguntas, sugerencias o simplemente quieras saludarnos, puedes comunicarte con nosotros por estos medios:
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {contacts.map((item, i) => (
            <motion.div
              key={i}
              className="bg-white text-center border border-gray-200 rounded-xl p-8 shadow-sm hover:shadow-md transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="mb-4">{item.icon}</div>
              <h3 className="font-bold text-lg text-gray-800 mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600 mb-3">{item.description}</p>
              <a
                href={item.link}
                className="text-sm text-red-600 hover:underline font-medium"
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.linkText}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
