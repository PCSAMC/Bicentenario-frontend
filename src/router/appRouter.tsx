// 📁 /routes/AppRoutes.tsx
import { Routes, Route, Navigate } from 'react-router-dom'

import LoginPage from '../auth/pages/loginPage'
import RegisterPage from '../auth/pages/registerPage'
import ProtectedRoute from './protectedRoutes'
import HomePage from '../home/pages/homePage'
import PerfilPage from '../perfil/pages/perfilPage'
import AdminDashboardPage from '../admin/pages/adminDashboardPage'
import UnautorizedPage from '../shared/pages/UnautorizedPage'
import SplashPage from '../shared/splashPage/pages/SplahsPage'
import VideosGalleryPage from '../TestimoniosVideos/pages/galeriaVideos'



export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<SplashPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/unauthorized" element={<UnautorizedPage />} />
      <Route path='/galeriaVideos' element={<VideosGalleryPage />} />

      {/* Rutas protegidas para cualquier usuario logueado */}
      <Route path="/home" element={
        <ProtectedRoute>
          <HomePage />
        </ProtectedRoute>
      } />

      <Route path="/perfil" element={
        <ProtectedRoute>
          <PerfilPage />
        </ProtectedRoute>
      } />

      {/* Ruta solo para admin */}
      <Route path="/admin" element={
        <ProtectedRoute role="admin">
          <AdminDashboardPage />
        </ProtectedRoute>
      } />

      {/* Ruta por defecto */}
      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  )
}
