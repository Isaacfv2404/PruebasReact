import React, { useState } from 'react';
import axios from 'axios';
import './AddClient.css';
import { useNavigate } from 'react-router-dom';
import addAlert from '../alerts/addAlert';
import confirmAlert from '../alerts/confirmAlert';


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
    const cedulaExistente = await axios.get(`https://localhost:7070/api/Clients/verificarCliente/${identification}`);
    const emailExistente  = await axios.get(`https://localhost:7070/api/Clients/verificarEmail/${email}`);

    if (cedulaExistente.data.existeCedula) {
      const alert = 'Ya existe el número de cédula a registrar.';
      addAlert(alert);
      console.error('El número de Cédula ya existe. Introduce una cédula diferente.');
      return;
    }
    if (emailExistente.data.existeEmail) {
      const alert = 'El correo electrónico proporcionado, ya está registrado en otro cliente.';
      addAlert(alert);
      console.error('El email ya existe.');
      return;
    }
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
      navigate('/Client');
      confirmAlert();
    } catch (error) {
      console.error('Error al enviar el Cliente:', error);
    }
  };

  return (
    <div>
      <link rel="stylesheet" href="/sale.css"></link>
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
    </div>

  );
}
