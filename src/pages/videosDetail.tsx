// src/pages/VideoDetail.tsx
import { useParams } from 'react-router-dom';

const dummyVideo = {
  id: 1,
  title: 'Desfile en Potosí',
  author: 'Andrea López',
  description: 'Video del desfile cultural realizado en Potosí por el Bicentenario',
  fileUrl: '/videos/potosi.mp4', // archivo guardado en /public/videos
  thumbnail: '/images/potosi.jpg',
};

const VideoDetail = () => {
  const { id } = useParams();

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <video
        controls
        poster={dummyVideo.thumbnail}
        className="w-full rounded-xl shadow-lg mb-6"
      >
        <source src={dummyVideo.fileUrl} type="video/mp4" />
        Tu navegador no soporta la reproducción de video.
      </video>

      <h1 className="text-3xl font-bold text-pink-500 mb-2">{dummyVideo.title}</h1>
      <p className="text-gray-600 mb-4">Por {dummyVideo.author}</p>
      <p className="text-gray-700">{dummyVideo.description}</p>
    </div>
  );
};

export default VideoDetail;
