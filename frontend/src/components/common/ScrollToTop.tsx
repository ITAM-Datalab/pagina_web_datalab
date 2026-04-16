/**
 * Componente ScrollToTop
 * Hace scroll hacia arriba automáticamente cuando cambia la ruta
 */
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Hacer scroll hacia arriba cuando cambie la ruta
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
