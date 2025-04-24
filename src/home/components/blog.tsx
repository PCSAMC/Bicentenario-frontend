import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

function BlogSection() {
  const articles = [
    {
      category: "Historia",
      color: "text-red-600",
      title: "Reflexiones sobre el Bicentenario de Bolivia",
      excerpt: "Un viaje a través de los testimonios que forjan nuestra identidad.",
      author: "Juan Pérez",
      date: "11 Ene 2022",
      time: "5 min lectura",
      img: "https://picsum.photos/seed/blog1/400/250",
    },
    {
      category: "Cultura",
      color: "text-purple-600",
      title: "Voces que cuentan nuestra historia",
      excerpt: "Testimonios que enriquecen nuestra comprensión del pasado boliviano.",
      author: "Ana López",
      date: "11 Ene 2022",
      time: "6 min lectura",
      img: "https://picsum.photos/seed/blog2/400/250",
    },
    {
      category: "Testimonios",
      color: "text-blue-600",
      title: "La historia a través de los ojos del pueblo",
      excerpt: "Descubre cómo los testimonios dan vida a nuestra rica herencia cultural.",
      author: "Carlos Ruiz",
      date: "11 Ene 2022",
      time: "4 min lectura",
      img: "https://picsum.photos/seed/blog3/400/250",
    },
  ];

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
          <div className="text-center md:text-left">
            <p className="text-sm font-semibold text-red-600 uppercase tracking-widest mb-1">Blog</p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-2">
              Artículos sobre el Bicentenario
            </h2>
            <p className="text-base text-gray-600">
              Explora nuestros últimos artículos sobre historia, cultura y testimonios de Bolivia.
            </p>
          </div>
          <button className="text-red-700 border border-red-600 px-5 py-2 rounded-full text-sm hover:bg-red-50 transition font-medium flex items-center gap-2">
            Ver todos <ArrowRight size={16} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {articles.map((article, index) => (
            <motion.div
              key={index}
              className="rounded-xl shadow-md overflow-hidden bg-white hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <img src={article.img} alt={article.title} className="w-full h-48 object-cover" />
              <div className="p-5">
                <span className={`text-xs font-medium ${article.color}`}>{article.category}</span>
                <h3 className="font-semibold text-lg mt-2 mb-2 text-gray-900">
                  {article.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4">{article.excerpt}</p>
                <div className="flex items-center">
                  <div className="w-9 h-9 bg-gray-300 rounded-full mr-3"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">{article.author}</p>
                    <p className="text-xs text-gray-500">
                      {article.date} • {article.time}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default BlogSection;
