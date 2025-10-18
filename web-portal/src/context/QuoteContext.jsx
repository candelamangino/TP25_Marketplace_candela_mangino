// src/context/QuoteContext.jsx (SOLO PARA DEBUG)
import { createContext, useContext, useReducer } from 'react';

// Persistencia
// const STORAGE_KEY = 'marketplaceQuotes'; // COMENTAR

// Estado Inicial
const initialState = {
  quotes: [],
};

// Función Inicializadora (ya no se usa, no es necesario dejarla)

// Función Reducer
function quoteReducer(state, action) {
  let newState;
  switch (action.type) {
    case 'ADD_QUOTE':
      newState = {
        ...state,
        quotes: [action.payload, ...state.quotes],
      };
      break;
      default:
        return state;
  }

  // Guardar cambios en localStorage
  // localStorage.setItem(STORAGE_KEY, JSON.stringify(newState)); // COMENTAR
  return newState;
}

// El Provider
const QuoteContext = createContext();

export function QuoteProvider({ children }) {
  // 💡 CAMBIO CRÍTICO: SOLO DOS ARGUMENTOS
  const [state, dispatch] = useReducer(quoteReducer, initialState); 

  // Función de acción para enviar una nueva cotización
  const createQuote = (quoteData) => {
    const newQuote = {
      id: Date.now().toString(),
      status: 'ACTIVA', 
      ...quoteData, 
    };

    dispatch({
      type: 'ADD_QUOTE',
      payload: newQuote,
    });
    
    return newQuote;
  };

  const contextValue = {
    ...state,
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