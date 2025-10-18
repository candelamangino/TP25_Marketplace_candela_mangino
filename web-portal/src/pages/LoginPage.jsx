// src/pages/LoginPage.jsx
import { useState, useEffect } from 'react'; // Necesitamos useEffect
import { useNavigate } from 'react-router-dom'; 
import { useAuth } from '../context/AuthContext'; 

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // 1. Obtenemos login Y el estado de isAuthenticated del contexto
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate(); 

  // 2. El VIGILANTE: Este hook corre CADA VEZ que 'isAuthenticated' cambia.
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/'); // Si está autenticado, redirige al Dashboard
    }
  }, [isAuthenticated, navigate]); // Dependencias: solo se ejecuta si estas cambian

  const handleSubmit = (e) => {
    e.preventDefault(); 
    setError(''); 

    // 3. Llamamos al login y capturamos el resultado booleano (true/false)
    const loginSuccess = login(email, password); 
    
    if (!loginSuccess) {
      // 4. Si el resultado es FALSO, mostramos el error
      setError('Credenciales incorrectas. Intente de nuevo.');
    }
    // Si fue TRUE, el useEffect se encargará de la redirección.
  };

  return (
    <div className="login-container">
      <h2>Marketplace - Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Entrar</button>
      </form>
      <p>Usuarios de prueba: solicitante@mail.com / proveedor@mail.com (pass: 123)</p>
    </div>
  );
}