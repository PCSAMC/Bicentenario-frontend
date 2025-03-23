// Modificación del AppRouter.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/home';
import Footer from '../components/footer';
import Navbar from '../components/navbar';
import Upload from '../pages/upload';
import Login from '../pages/login';
import Register from '../pages/register';
import Videos from '../pages/videos';
import VideoDetail from '../pages/videosDetail';
import Testimonios from '../pages/testimonios';
import Publicaciones from '../pages/publicaciones';
import Profile from '../pages/Perfil';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow pt-16"> {/* Ajusta el pt-16 según la altura de tu Navbar */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/subir" element={<Upload />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/videos" element={<Videos />} />
            <Route path="/videos/:id" element={<VideoDetail />} />
            <Route path="/testimonios" element={<Testimonios />} />
            <Route path="/publicaciones" element={<Publicaciones />} />
            <Route path="/perfil" element={<Profile />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default AppRouter;