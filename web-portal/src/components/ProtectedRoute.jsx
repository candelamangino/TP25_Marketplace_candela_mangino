// src/components/ProtectedRoute.jsx
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom'; // Usamos Navigate, la "herramienta" del hook useNavigate

// Este componente recibe el componente que debe renderizar (element) si está logueado
export default function ProtectedRoute({ element }) {
  // 1. Extraemos el estado de autenticación del Contexto
  const { isAuthenticated, user } = useAuth(); 

  // 2. Lógica de Protección
  if (!isAuthenticated) {
    // Si NO está logueado, lo mandamos al login.
    // 'replace' borra la historia de navegación, impidiendo volver a la ruta protegida con el botón 'atrás'.
    return <Navigate to="/login" replace />;
  }

  // Si SÍ está logueado, renderizamos el componente solicitado (el Dashboard)
  return element;
}