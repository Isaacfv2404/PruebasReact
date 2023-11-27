import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddVehicle';

export default function EditVehicle() {
  let navigate = useNavigate();
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  const [vehicle, setVehicle] = useState({
    plate: '',
    brand: '',
    model: '',
    year: '',
    clientId: '',
  });

  const { plate, brand, model, year, clientId } = vehicle;
  const onInputChange = (e) => {
    setVehicle({ ...vehicle, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadVehicle();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`https://localhost:7070/api/Vehicles/${id}`, vehicle);
    navigate('/Vehicle');
  };

  const loadVehicle = async () => {
    const result = await axios.get(`https://localhost:7070/api/Vehicles/${id}`);
    setVehicle(result.data);
  };
  const [clients, setClients] = useState([]);

  useEffect(() => {
    axios
      .get('https://localhost:7070/api/Clients')
      .then((response) => {
        const clientsData = response.data;
        setClients(clientsData);
      })
      .catch((error) => {
        console.error('Error al obtener la lista de clientes:', error);
      });
  }, []);

  return (
    <div className="container">
      <h1 className="heading">Registrar Vehiculo</h1>

      <form onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <label className="form-label">Placa</label>
          <input
            type={'text'}
            className="form-control"
            placeholder="Ingrese el número de placa"
            name="plate"
            value={plate}
            onChange={(e) => onInputChange(e)}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Marca</label>
          <input
            type={'text'}
            className="form-control"
            placeholder="Ingresa la marca"
            name="brand"
            value={brand}
            onChange={(e) => onInputChange(e)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Modelo</label>
          <input
            type={'text'}
            className="form-control"
            placeholder="Ingresa el modelo"
            name="model"
            value={model}
            onChange={(e) => onInputChange(e)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Año</label>
          <input
            type={'number'}
            className="form-control"
            placeholder="Ingrese el año del vehículo"
            name="year"
            value={year}
            onChange={(e) => onInputChange(e)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Nombre de Cliente Asociado</label>
          <select
            className="form-control"
            name="clientId"
            value={clientId}
            onChange={(e) => onInputChange(e)}
          >
            <option value="">
              {clients.find((client) => client.id === clientId)?.name}
            </option>
            {clients.map((client, index) => (
              <option key={index} value={client.id}>
                {client.name}
              </option>
            ))}
          </select>
        </div>

        <button className="submit-button" type="submit">
          Enviar
        </button>
      </form>
    </div>
  );
}
