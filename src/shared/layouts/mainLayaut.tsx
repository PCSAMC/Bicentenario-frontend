import { Outlet, useLocation } from 'react-router-dom';
import NavBar from '../../home/components/navbar';

export default function MainLayout() {
  const location = useLocation();
  
  // Verificamos si estamos en las páginas de login o register
  const isLoginOrRegister = location.pathname === '/login' || location.pathname === '/register';
  const isHome = location.pathname === '/home';  // Comprobamos si estamos en la página de inicio

  return (
    <div className="min-h-screen relative">
      {/* Solo mostramos el NavBar si no estamos en login o register */}
      {!isLoginOrRegister && <NavBar isFixed={isHome} />}

      {/* Mostrar contenido con padding-top en home, o sin padding-top si es login/register */}
      <div className={isLoginOrRegister ? '' : 'pt-[10px]'}>
        <Outlet />
      </div>
    </div>
  );
}
