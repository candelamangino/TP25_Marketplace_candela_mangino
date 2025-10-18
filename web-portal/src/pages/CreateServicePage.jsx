// src/pages/CreateServicePage.jsx

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';    // Para obtener el ID del usuario
import { useServices } from '../context/ServiceContext'; // Para la función de publicación

// El Solicitante solo debe ver esta página, si otro rol intenta entrar, fallará la lógica.
export default function CreateServicePage() {
  // Estado local del formulario
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  
  // Hooks del Contexto
  const { user } = useAuth(); // Obtenemos el usuario (para el autor)
  const { createService } = useServices(); // Obtenemos la función para crear
  
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const serviceData = {
      title,
      description,
      authorId: user.id,          // Asignamos el ID del autor logueado
      authorName: user.name,      // Para mostrar en la lista
      // Más campos requeridos por la consigna: ubicación, fecha deseada, etc.
    };

    // Publicamos el servicio en el estado global
    createService(serviceData);

    // Redirigimos al Dashboard después de crear
    navigate('/'); 
  };

  if (user.role !== 'SOLICITANTE') {
    return <p>Acceso Denegado. Solo Solicitantes pueden publicar servicios.</p>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Publicar Nuevo Servicio</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Título del Servicio:</label>
          <input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Descripción:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button type="submit">Publicar Servicio</button>
      </form>
    </div>
  );
}