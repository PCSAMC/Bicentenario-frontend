// 📁 /routes/AppRoutes.tsx
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../auth/pages/loginPage';
import RegisterPage from '../auth/pages/registerPage';
import ProtectedRoute from './protectedRoutes';
import HomePage from '../home/pages/homePage';
import PerfilPage from '../perfil/pages/perfilPage';
import AdminDashboardPage from '../admin/pages/adminDashboardPage';
import UnautorizedPage from '../shared/pages/UnautorizedPage';
import SplashPage from '../shared/splashPage/pages/SplahsPage';
import TestimoniosPage from '../TestimoniosVideos/pages/galeriaVideos';
import MainLayout from '../shared/layouts/mainLayaut';
import VideoDetailPage from '../TestimoniosVideos/VideoPorId/pages/videoPage';  // Importa la página de detalles
import MapPage from '../MapaInteractivo/page/MapPage';
export default function AppRoutes() {
  return (
    <Routes>
      {/* Ruta splash sin barra de búsqueda */}
      <Route path="/" element={<SplashPage />} />

      {/* Rutas con barra de búsqueda */}
      <Route element={<MainLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/unauthorized" element={<UnautorizedPage />} />
        <Route path="/galeriaVideos/:typeId" element={<TestimoniosPage />} />
        <Route path='/PerfilPage' element={<PerfilPage />} />
        <Route path='/MapPage' element={<MapPage />} />
        {/* Rutas protegidas para cualquier usuario logueado */}
        <Route path="/home" element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        } />
        
  
        
        {/* Ruta solo para admin */}
        <Route path="/admin" element={
          <ProtectedRoute role="admin">
            <AdminDashboardPage />
          </ProtectedRoute>
        } />
        
        {/* Ruta de detalles del video */}
        <Route path="/video/:videoId" element={<VideoDetailPage />} /> {/* Ruta dinámica para el video */}
        
        {/* Ruta por defecto */}
        <Route path="*" element={<Navigate to="/home" />} />
      </Route>
    </Routes>
  );
}
