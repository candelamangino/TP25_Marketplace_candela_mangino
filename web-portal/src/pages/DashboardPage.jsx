// src/pages/DashboardPage.jsx
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { useServices } from '../context/ServiceContext';

export default function DashboardPage() {
  const { user, logout } = useAuth(); // Extraemos el usuario y la función de logout
    const {services} = useServices();
  // Renderizado condicional basado en el rol del usuario
  const renderDashboardContent = () => {
    if (!user) {
      return <div>Cargando...</div>; // Caso de seguridad, aunque ProtectedRoute lo evita
    }

    switch (user.role) {
      case 'SOLICITANTE':
        return (
          <div style={{ padding: '20px', border: '1px solid blue' }}>
            <h3>Bienvenido, {user.name} (Solicitante)</h3>
            <p>Aquí publicarás nuevos servicios y compararás cotizaciones.</p>
            {/* Aquí irán los links para Publicar Servicio */}
            <Link to='/servicios/nuevo'style={{ display: 'inline-block', padding: '10px', background: 'blue', color: 'white', textDecoration: 'none', marginTop: '10px', borderRadius: '5px' }}>
                +Publicar Nuevo Servicio
            </Link>
          </div>
        );
      case 'PROVEEDOR_SERVICIO':
        return (
            <div style={{ padding: '20px', border: '1px solid green' }}>
              <h3>Bienvenido, {user.name} (Proveedor de Servicio)</h3>
              <p>Servicios publicados disponibles para cotizar:</p>
              
              {/* Lógica de listado: ¿Hay servicios? */}
              {services.length === 0 ? (
                <p style={{ marginTop: '15px', color: '#555' }}>Aún no hay servicios publicados por Solicitantes.</p>
              ) : (
                <div style={{ display: 'grid', gap: '15px', marginTop: '15px' }}>
                  {/* Iteramos sobre la lista de servicios usando map */}
                  {services.map(service => (
                    <div key={service.id} style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}>
                      <h4>{service.title}</h4>
                      <p>Descripción: {service.description.substring(0, 50)}...</p>
                      <p>Autor: {service.authorName}</p>
                      {/* Aquí iría el link para ir a la página de Cotización */}
                      <Link to={`/cotizar/${service.id}`} style={{ color: 'green', fontWeight: 'bold' }}>
                          Ver y Cotizar &gt;
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
      case 'PROVEEDOR_INSUMO':
        return (
          <div style={{ padding: '20px', border: '1px solid red' }}>
            <h3>Bienvenido, {user.name} (Proveedor de Insumos)</h3>
            <p>Aquí gestionarás tu catálogo de insumos y ofertas.</p>
            {/* Aquí irán los links para ABM de Insumos */}
          </div>
        );
      default:
        return <div>Rol de usuario no reconocido.</div>;
    }
  };

  return (
    <div>
      <header style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', background: '#eee' }}>
        <h1>Marketplace Dashboard</h1>
        <button onClick={logout}>Cerrar Sesión</button>
      </header>
      <main>
        {renderDashboardContent()}
      </main>
    </div>
  );
}