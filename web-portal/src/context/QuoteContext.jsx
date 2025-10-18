// src/context/QuoteContext.jsx
import { createContext, useContext, useReducer } from 'react';

// Persistencia
const STORAGE_KEY = 'marketplaceQuotes';

// Estado Inicial
const initialState = {
  quotes: [], // Aquí guardaremos todas las cotizaciones enviadas
};

// Función Inicializadora (para cargar localStorage)
const initializer = (initialValue) => {
  try {
    const persistedState = localStorage.getItem(STORAGE_KEY);
    return persistedState ? JSON.parse(persistedState) : initialValue;
  } catch (error) {
    console.error("Error al cargar localStorage para Cotizaciones:", error);
    return initialValue;
  }
};

// Función Reducer
function quoteReducer(state, action) {
  let newState;
  switch (action.type) {
    case 'ADD_QUOTE':
      // El payload contiene el objeto completo de la cotización
      newState = {
        ...state,
        // Agregamos la nueva cotización al arreglo
        quotes: [action.payload, ...state.quotes], 
      };
      break;
    
    // Aquí podríamos tener acciones como 'EDIT_QUOTE'

    default:
      return state;
  }

  // Guardar cambios en localStorage
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
  return newState;
}

// El Provider
const QuoteContext = createContext();

export function QuoteProvider({ children }) {
  const [state, dispatch] = useReducer(quoteReducer, initialState, initializer);

  // Función de acción para enviar una nueva cotización
  const createQuote = (quoteData) => {
    // Generamos un ID simple
    const newQuote = {
      id: Date.now().toString(),
      status: 'ACTIVA', // Estado inicial
      ...quoteData, // Contiene serviceId, price, plazo, providerId, etc.
    };

    dispatch({
      type: 'ADD_QUOTE',
      payload: newQuote,
    });
    
    return newQuote;
  };

  const contextValue = {
    ...state, // { quotes }
    createQuote,
  };

  return (
    <QuoteContext.Provider value={contextValue}>
      {children}
    </QuoteContext.Provider>
  );
}

// Custom Hook
export const useQuotes = () => {
  return useContext(QuoteContext);
};