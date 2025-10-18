

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'; 
import LoginPage from './pages/LoginPage.jsx'; // Asegúrate de crear este archivo!

// 1. Definimos el mapa de rutas:
const router = createBrowserRouter([
  {
    path: '/', // Ruta principal
    element: <App />, // <App/> será nuestro Layout principal
  },
  {
    path: '/login', // Ruta de login
    element: <LoginPage />, // Componente que se renderiza en /login
  },
]);

// 2. Renderizamos la aplicación usando el RouterProvider
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);