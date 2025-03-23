// src/pages/Videos.tsx
import { Link } from 'react-router-dom';

const videos = [
  {
    id: 1,
    title: 'Desfile en Potosí',
    author: 'Andrea López',
    thumbnail: '/images/potosi.jpg',
    category: 'Cultura',
  },
  {
    id: 2,
    title: 'Documental del Salar',
    author: 'Luis Vargas',
    thumbnail: '/images/salar.jpg',
    category: 'Naturaleza',
  },
  {
    id: 3,
    title: 'Entrevista a abuela que luchó en el 52',
    author: 'Marcos Rodríguez',
    thumbnail: '/images/abuela.jpg',
    category: 'Testimonios',
  },
];

const Videos = () => {
  const categoriasUnicas = [...new Set(videos.map((v) => v.category))];

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-pink-500 mb-8">Videos del Bicentenario</h1>

      {categoriasUnicas.map((cat) => (
        <div key={cat} className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">{cat}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {videos
              .filter((v) => v.category === cat)
              .map((video) => (
                <Link
                  to={`/videos/${video.id}`}
                  key={video.id}
                  className="bg-white shadow rounded-xl overflow-hidden hover:shadow-md transition"
                >
                  <img src={video.thumbnail} alt={video.title} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-pink-500">{video.title}</h3>
                    <p className="text-sm text-gray-600">{video.author}</p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Videos;
