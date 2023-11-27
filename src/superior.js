// index.js o tu archivo principal
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthProvider } from './security/AuthContext';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
