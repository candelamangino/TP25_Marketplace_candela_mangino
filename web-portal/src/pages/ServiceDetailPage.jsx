// src/pages/ServiceDetailPage.jsx
import { useParams, Link } from 'react-router-dom';
import { useServices } from '../context/ServiceContext';
import { useAuth } from '../context/AuthContext';

export default function ServiceDetailPage() {
  // 1. OBTENER EL ID DE LA URL
  const { serviceId } = useParams(); 
  
  // 2. OBTENER ESTADO GLOBAL
  const { services } = useServices();
  const { user } = useAuth();

  // 3. BUSCAR EL SERVICIO ESPECÍFICO
  // Si el servicio no existe, find devuelve undefined
  const service = services.find(s => s.id === serviceId);

  if (!service) {
    return (
        <div style={{ padding: '20px' }}>
            <h2>Servicio no encontrado</h2>
            <p>El servicio con ID **{serviceId}** no existe o fue eliminado.</p>
            <Link to="/" style={{ color: 'blue' }}>Volver al Dashboard</Link>
        </div>
    );
  }
  
  // 4. Lógica para diferenciar vistas
  const isAuthor = user.id === service.authorId;
  const isServicePro = user.role === 'PROVEEDOR_SERVICIO';
  
  return (
    <div style={{ padding: '20px' }}>
      <h2>Detalle del Servicio: {service.title}</h2>
      <p style={{ color: '#555' }}>Solicitado por: {service.authorName}</p>
      <p>Descripción: {service.description}</p>
      <p>Estado: **{service.status}**</p>
      
      <hr style={{ margin: '15px 0' }} />
      
      {/* Vista para el PROVEEDOR_SERVICIO */}
      {isServicePro && (
        <button style={{ padding: '10px', background: 'green', color: 'white', border: 'none', borderRadius: '5px' }}>
          Enviar Cotización Ahora
        </button>
      )}

      {/* Vista para el SOLICITANTE */}
      {isAuthor && (
        <p style={{ color: 'blue', fontWeight: 'bold' }}>Esta es tu publicación. Aquí verás el comparador de cotizaciones.</p>
      )}
      
    </div>
  );
}