import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddClient.css';
import { useNavigate } from 'react-router-dom';

export default function AddClient() {
  let navigate = useNavigate();
  const [client, setClient] = useState({
    name: '',
    lastName: '',
    identification: '',
    email: '',
    address: '',
    phone: '',
  });

  const { name, lastName, identification, email, address, phone } = client;

  const onInputChange = (e) => {
    setClient({ ...client, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'https://localhost:7070/api/Clients',
        JSON.stringify(client),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      navigate('/');
    } catch (error) {
      console.error('Error al enviar el Cliente:', error);
    }
  };

  return (
    <div className="container">
      <h1 className="heading">Registrar Cliente</h1>

      <form onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <label className="form-label">Nombre</label>
          <input
            type={'text'}
            className="form-control"
            placeholder="Ingrese su nombre"
            name="name"
            value={name}
            onChange={(e) => onInputChange(e)}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Apellidos</label>
          <input
            type={'text'}
            className="form-control"
            placeholder="Ingresa sus apellidos"
            name="lastName"
            value={lastName}
            onChange={(e) => onInputChange(e)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Identificación</label>
          <input
            type={'text'}
            className="form-control"
            placeholder="Ingresa el Número de Cédula"
            name="identification"
            value={identification}
            onChange={(e) => onInputChange(e)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Email</label>
          <input
            type={'text'}
            className="form-control"
            placeholder="Ingrese el correo"
            name="email"
            value={email}
            onChange={(e) => onInputChange(e)}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Dirección</label>
          <input
            type={'text'}
            className="form-control"
            placeholder="Ingrese la dirección"
            name="address"
            value={address}
            onChange={(e) => onInputChange(e)}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Teléfono</label>
          <input
            type={'text'}
            className="form-control"
            placeholder="Ingrese el número de teléfono"
            name="phone"
            value={phone}
            onChange={(e) => onInputChange(e)}
          />
        </div>

        <button className="submit-button" type="submit">
          Enviar
        </button>
      </form>
    </div>
  );
}
