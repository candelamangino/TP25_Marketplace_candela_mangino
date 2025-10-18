// src/pages/ServiceDetailPage.jsx (CÓDIGO FINAL CON COMPARADOR)
import { useParams, Link } from 'react-router-dom';
import { useServices } from '../context/ServiceContext';
import { useAuth } from '../context/AuthContext';
import { useQuotes } from '../context/QuoteContext';
import { useState } from 'react'; // Asegúrate de que useState está importado

export default function ServiceDetailPage() {
  // 1. OBTENER EL ID DE LA URL
  const { serviceId } = useParams(); 
  
  // 2. OBTENER ESTADO GLOBAL
  const { services } = useServices();
  const { user } = useAuth();
  // 💡 CORRECCIÓN: Desestructuramos ambas propiedades del hook useQuotes()
  const { quotes, createQuote } = useQuotes(); 
  
  // Estado local para el formulario de cotización
  const [price, setPrice] = useState('');
  const [plazo, setPlazo] = useState('');
  const [isQuoted, setIsQuoted] = useState(false);
  
  // 3. BUSCAR EL SERVICIO ESPECÍFICO
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
  
  const handleQuoteSubmit = (e) => {
    e.preventDefault();

    const quoteData = {
      serviceId: service.id,
      providerId: user.id,
      providerName: user.name,
      price: parseFloat(price), // Convertimos a número
      plazo: plazo, 
    };
    
    createQuote(quoteData); // Enviamos la cotización al contexto
    setIsQuoted(true); // Mostramos el mensaje de éxito
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Detalle del Servicio: {service.title}</h2>
      <p style={{ color: '#555' }}>Solicitado por: {service.authorName}</p>
      <p>Descripción: {service.description}</p>
      <p>Estado: **{service.status}**</p>
      
      <hr style={{ margin: '15px 0' }} />
      
      {/* Vista para el PROVEEDOR_SERVICIO (Cotización) */}
      {isServicePro && !isQuoted && (
        <div>
          <h4>Enviar Cotización</h4>
          <form onSubmit={handleQuoteSubmit} style={{ display: 'grid', gap: '10px', maxWidth: '300px' }}>
            <input
              type="number"
              placeholder="Precio Total (ej: 1500)"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Plazo estimado (ej: 3 días)"
              value={plazo}
              onChange={(e) => setPlazo(e.target.value)}
              required
            />
            <button style={{ padding: '10px', background: 'green', color: 'white', border: 'none', borderRadius: '5px' }}>
              Enviar Cotización Ahora
            </button>
          </form>
        </div>
      )}
      {/* MENSAJE DE CONFIRMACIÓN */}
      {isQuoted && isServicePro && (
        <p style={{ color: 'green', fontWeight: 'bold' }}>✅ ¡Cotización enviada con éxito!</p>
      )}

      {/* VISTA DEL SOLICITANTE: Comparador de Cotizaciones */}
      {isAuthor && (
        <div style={{ padding: '15px', border: '1px solid #ddd', borderRadius: '5px' }}>
          <h4>Cotizaciones Recibidas</h4>
          
          {/* Lógica para filtrar y renderizar */}
          {(() => {
            // 1. Filtramos las cotizaciones que coinciden con el ID de este servicio
            const serviceQuotes = quotes.filter(q => q.serviceId === service.id);

            if (serviceQuotes.length === 0) {
              return <p style={{ color: '#888' }}>Aún no hay cotizaciones para este servicio.</p>;
            }

            return (
              <div style={{ display: 'grid', gap: '10px' }}>
                {/* 2. Listamos las cotizaciones */}
                {serviceQuotes.map((quote, index) => (
                  <div key={quote.id} style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px', background: index % 2 === 0 ? '#f9f9f9' : 'white' }}>
                    <h5>Oferta del Proveedor: {quote.providerName}</h5>
                    <p><strong>Precio:</strong> ${quote.price}</p>
                    <p><strong>Plazo:</strong> {quote.plazo}</p>
                    <p><strong>Estado:</strong> {quote.status}</p>
                    <button style={{ background: 'blue', color: 'white', padding: '5px 10px', border: 'none', marginTop: '5px' }}>
                      Seleccionar Cotización
                    </button>
                  </div>
                ))}
              </div>
            );
          })()}
        </div>
      )}
      
    </div>
  );
}