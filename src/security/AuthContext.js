// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  console.log("Renderizando AuthContext");
  // Utiliza el estado local para rastrear la autenticación
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Intenta obtener el estado de autenticación desde el almacenamiento local
    const storedAuth = localStorage.getItem('auth');
    return storedAuth ? JSON.parse(storedAuth) : false;
  });

  // Efecto para actualizar el almacenamiento local cuando cambia el estado de autenticación
  useEffect(() => {
    localStorage.setItem('auth', JSON.stringify(isAuthenticated));
  }, [isAuthenticated]);

  const login = (token) => {
    console.log("Log succeful");

    // Almacena el token en el almacenamiento local
    localStorage.setItem('token', token);

    // Establece el estado de autenticación como verdadero
    setIsAuthenticated(true);
    console.log(isAuthenticated);

  };

  const logout = () => {
    console.log("Logout succeful");

    // Elimina el token del almacenamiento local
    localStorage.removeItem('token');

    // Establece el estado de autenticación como falso
    setIsAuthenticated(false);

    console.log(isAuthenticated);

  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
