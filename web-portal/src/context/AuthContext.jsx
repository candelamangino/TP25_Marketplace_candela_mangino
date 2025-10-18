// src/context/AuthContext.jsx
import { createContext, useContext, useReducer } from 'react';
import { findUser } from '../data/users'; // Importamos la función que creaste
//Reducer en React (usando useReducer) es una función que toma dos argumentos para decidir cómo actualizar el estado:
// 1. Definición del Contexto
const AuthContext = createContext();

// Estado inicial: Nadie logueado
const initialState = {
  user: null, // Guardará el objeto del usuario (id, email, role, name)
  isAuthenticated: false,
};

// 2. La función Reducer: Cómo cambia el estado
function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      // El payload contiene el email y password
      const userFound = findUser(action.payload.email, action.payload.password);
      
      if (userFound) {
        return {
          ...state, // Mantenemos el estado actual
          user: userFound, // Guardamos el usuario completo
          isAuthenticated: true, // Cambiamos el estado de autenticación
        };
      }
      // Si las credenciales son incorrectas, no cambiamos nada
      return state; 

    case 'LOGOUT':
      return {
        ...state,
        user: null, // Limpiamos el usuario
        isAuthenticated: false, // Ya no está autenticado
      };

    default:
      return state;
  }
}

// 3. El Provider: Componente que envuelve la App
export function AuthProvider({ children }) {
  // useReducer maneja el estado con la lógica definida en authReducer
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Funciones de acción para los componentes:
  const login = (email, password) => {
    const userFound = findUser(email , password);
    if (userFound) {
        dispatch({
            type: 'LOGIN',
            payload:userFound
          });
          return true;

    }
    return false;
    
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  // El value que se pasa a todos los componentes hijos
  const contextValue = {
    ...state, // { user, isAuthenticated }
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

// 4. Custom Hook: Para usar el contexto fácilmente
export const useAuth = () => {
  return useContext(AuthContext);
};