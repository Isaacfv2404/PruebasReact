import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddClient';

export default function EditVehicle() {
  let navigate = useNavigate();
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  const [client, setClient] = useState({
    name: '',
    lastName: '',
    identification: '',
    email: '',
    address: '',
    phone: '' 
   });

   const { name, lastName, identification, email, address, phone } = client;
   const onInputChange = (e) => {
    setClient({ ...client, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    loadClient();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`https://localhost:7070/api/Clients/${id}`, client);
    navigate('/Client');
  };
  const loadClient = async () => {
    const result = await axios.get(`https://localhost:7070/api/Clients/${id}`);
    setClient(result.data);
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
