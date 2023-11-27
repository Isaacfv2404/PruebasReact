// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuth } from './security/AuthContext';
import PrivateRoutes from './PrivateRoutes';
import './App.css';
import LoginForm from './log/login';

function App() {
  const { isAuthenticated } = useAuth();

    return (
    <div className="App">

      <Router>
        {isAuthenticated ? (
          <PrivateRoutes />
        ) : (
          <Routes>
            <Route path="/" element={<LoginForm />} />
          </Routes>
        )}
      </Router>
      
    </div>
  );
}

export default App;
