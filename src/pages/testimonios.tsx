import { FaPlay } from 'react-icons/fa';

const testimonios = [
  {
    id: 1,
    title: 'Mi infancia en el Altiplano',
    author: 'Rosa Mamani',
    description: 'Un recuerdo de vida en los Andes en los años 60.',
    audioUrl: '/audios/altiplano.mp3', // Colocar en public/audios/
  },
  {
    id: 2,
    title: 'Mi abuela y la Revolución del 52',
    author: 'Juan Pérez',
    description: 'Relato sobre los cambios tras la revolución.',
    audioUrl: '/audios/revolucion.mp3',
  },
];

const Testimonios = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-green-500 mb-8 text-center">Testimonios del Bicentenario</h1>

      <div className="space-y-6">
        {testimonios.map((t) => (
          <div
            key={t.id}
            className="bg-white rounded-xl shadow p-6 flex items-start gap-6 hover:shadow-md transition"
          >
            <div className="text-green-500 text-3xl mt-1">
              <FaPlay />
            </div>
            <div className="flex-grow">
              <h2 className="text-xl font-semibold text-green-600">{t.title}</h2>
              <p className="text-sm text-gray-500 mb-2">por {t.author}</p>
              <p className="text-gray-700 mb-3">{t.description}</p>
              <audio controls className="w-full">
                <source src={t.audioUrl} type="audio/mpeg" />
                Tu navegador no soporta audio.
              </audio>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonios;
