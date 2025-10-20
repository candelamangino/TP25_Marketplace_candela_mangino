// src/context/SupplyContext.jsx
import { createContext, useContext, useReducer } from 'react';

//persistencia
const STORAGE_KEY ='marketplaceSupplies';

// 1. ESTADO INICIAL
const initialState = {
  supplies : [],
};

//funcion inicializadora que carga desde localstorage
const initializer=(initialValue) => {
  try {
    const persistedState = localStorage.getItem(STORAGE_KEY);
    return persistedState ? JSON.parse(persistedState) : initialValue;
  } catch (error) {
    console.error("Error al cargar el localStorage para Insumos : ",error);
    return initialValue;
  }
};


// 3. EL REDUCER (Lo crearemos después)
function supplyReducer(state, action) {
  let newState;
  switch (action.type) {
    case 'ADD_SUPPLY':
      newState={
        ...state,
        supplies: [action.payload, ...state.supplies],
      };
      break;

      default :
      return state;
    }
    //guarda cambios en localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
    return newState;
  }

// 4. EL PROVIDER (Tu turno de completarlo)
const SupplyContext = createContext();

export function SupplyProvider({ children }) {
  // Usaremos useReducer aquí
  const [state, dispatch] = useReducer(supplyReducer, initialState);
  
  //funcion de accion que agrega un nuevo insumo 
  const createSupply = (supplyData) =>{
    //aca se genera un id y definimos el estado inicial 
    const newSupply = {
      id: Date.now().toString(),
      authorId:supplyData.authorId,
      authorName:supplyData.authorName,
      status:'DISPONIBLE',
      ...supplyData,
    };
    dispatch({
      type: 'ADD_SUPPLY',
      payload: newSupply,
    });
    return newSupply;
  };
  const contextValue = {
    ...state,
    createSupply,
  };

  return (
    <SupplyContext.Provider value={contextValue}>
      {children}
    </SupplyContext.Provider>
  );
}

// 5. CUSTOM HOOK
export const useSupplies = () => {
  return useContext(SupplyContext);
};