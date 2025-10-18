

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'; 
import LoginPage from './pages/LoginPage.jsx'; // Asegúrate de crear este archivo!
import { AuthProvider } from './context/AuthContext.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import { ServiceProvider } from './context/ServiceContext.jsx';
import CreateServicePage from './pages/CreateServicePage.jsx';
import ServiceDetailPage from './pages/ServiceDetailPage.jsx';
import { QuoteProvider } from './context/QuoteContext.jsx';

// 1. Definimos el mapa de rutas:
const router = createBrowserRouter([
  {
    path: '/', // Ruta principal
    element: <ProtectedRoute element={<DashboardPage />} />,
  },
  {
    path: '/login', // Ruta de login
    element: <LoginPage />, // Componente que se renderiza en /login
  },
  {
    path: '/servicios/nuevo',
    element: <ProtectedRoute element={<CreateServicePage />}/>,
  },
  {
    path: '/cotizar/:serviceId',
    element: <ProtectedRoute element={<ServiceDetailPage />} />,
  },
]);

// 2. Renderizamos la aplicación usando el RouterProvider
ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider> 
    <ServiceProvider>
      <QuoteProvider>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </QuoteProvider>
  </ServiceProvider> 
    
  </AuthProvider>
);