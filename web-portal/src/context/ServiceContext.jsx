// src/context/ServiceContext.jsx (CON PERSISTENCIA)

import { createContext, useContext, useReducer } from 'react';

// Nombre de la clave en localStorage
const STORAGE_KEY = 'marketplaceServices';

// Estado inicial estándar (vacío)
const initialState = {
  services: [], 
};

// 1. FUNCIÓN INICIALIZADORA
// Esta función lee localStorage ANTES de que el Provider se renderice.
const initializer = (initialValue) => {
  try {
    const persistedState = localStorage.getItem(STORAGE_KEY);
    // Si existe algo guardado, lo usamos. Si no, usamos el initialValue (vacío)
    return persistedState ? JSON.parse(persistedState) : initialValue;
  } catch (error) {
    console.error("Error al cargar localStorage:", error);
    return initialValue;
  }
};


// 2. FUNCIÓN REDUCER
function serviceReducer(state, action) {
  let newState;
  switch (action.type) {
    case 'ADD_SERVICE':
      newState = {
        ...state,
        services: [action.payload, ...state.services], 
      };
      break; 
    
    // Aquí irían otros casos como 'UPDATE_STATUS', 'ADD_QUOTATION', etc.

    default:
      return state;
  }

  // 3. GUARDAR CAMBIOS EN LOCALSTORAGE
  // Esto sucede inmediatamente después de que el estado fue calculado
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
  return newState;
}

// 4. EL PROVIDER
const ServiceContext = createContext();

export function ServiceProvider({ children }) {
  // Usamos el tercer argumento (initializer) para cargar los datos
  const [state, dispatch] = useReducer(serviceReducer, initialState, initializer);

  const createService = (newServiceData) => {
    // Generamos un ID simple
    const newService = {
      id: Date.now().toString(),
      status: 'PUBLICADO', 
      ...newServiceData, 
    };

    dispatch({
      type: 'ADD_SERVICE',
      payload: newService,
    });
    
    return newService;
  };

  const contextValue = {
    ...state,
    createService,
  };

  return (
    <ServiceContext.Provider value={contextValue}>
      {children}
    </ServiceContext.Provider>
  );
}

// 5. CUSTOM HOOK
export const useServices = () => {
  return useContext(ServiceContext);
};