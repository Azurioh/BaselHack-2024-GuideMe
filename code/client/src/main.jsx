import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './global.css'
import App from './App.jsx'
import {BrowserRouter as Router} from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext.jsx';

import './lang/i18n';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <Router>
        <App />
      </Router>
    </AuthProvider>
  </StrictMode>,
)
