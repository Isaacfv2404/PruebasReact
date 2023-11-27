import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../security/AuthContext';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth(); // Usa el contexto para obtener la función de inicio de sesión
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // Realiza una solicitud al servidor para verificar las credenciales
      const response = await axios.post(
        'https://localhost:7070/api/Employees/login',
        {
          email: email,
          password: password,
        }
      );

      // Si la solicitud es exitosa, puedes manejar la respuesta según tus necesidades
      console.log(response.data.message);

      // Usa la función de inicio de sesión del contexto y pasa el token
      login(response.data.token);

      // Redirige al usuario a la página protegida
      navigate('/MainSection');
    } catch (error) {
      // Si hay un error, maneja el error según tus necesidades
      console.error('Error de autenticación:', error.response.data.message);
      setError('Credenciales incorrectas. Inténtalo de nuevo.');
    }
  };

  return (
    <div>
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
        integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
        crossorigin="anonymous"
      />
      <link rel="stylesheet" href="/log.css"></link>

      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-2"></div>
          <div className="col-lg-6 col-md-8 login-box">
            <div className="col-lg-12 login-key">
              <img src="logoEmpresa.png" alt="Imagen de clave" />
            </div>
            <div className="col-lg-12 login-form">
              <div className="form-group">
                <label className="form-control-label">CORREO</label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label className="form-control-label">CONTRASEÑA</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="col-lg-12 loginbttm">
                <div className="col-lg-6 login-btm login-text">
                  {error && <p style={{ color: 'red' }}>{error}</p>}
                </div>
                <div className="col-lg-11 login-btm login-button">
                  <button
                    onClick={handleLogin}
                    className="btn btn-outline-primary"
                  >
                    LOGIN
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-2"></div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
