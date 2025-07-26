import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './Router/route.jsx'
import './index.css'
import AuthProvider from './Contexts/AuthContext/AuthProvider.jsx'

// Load visitor tracking script
const loadTrackingScript = () => {
  const script = document.createElement('script');
  
  // Use the same base URL as defined in api.js
  const API_BASE_URL = 'http://localhost:5000/api';
  script.src = `${API_BASE_URL}/track/script.js`;
  script.async = true;
  document.body.appendChild(script);
};

// Load tracking after a short delay to ensure page loads properly
setTimeout(loadTrackingScript, 1500);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)
