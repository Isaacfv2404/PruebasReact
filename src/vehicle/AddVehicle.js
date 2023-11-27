import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddVehicle.css';
import { useNavigate } from 'react-router-dom';
import addAlert from '../alerts/addAlert';
import confirmAlert from '../alerts/confirmAlert';
export default function AddVehicle() {
  let navigate = useNavigate();
  const [vehicle, setVehicle] = useState({
    plate: '',
    brand: '',
    model: '',
    year: '',
    clientId: ''
  });

  const { plate, brand, model, year, clientId } = vehicle;

  const onInputChange = (e) => {
    setVehicle({ ...vehicle, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const placaExistente = await axios.get(`https://localhost:7070/api/Vehicles/verificarPlaca/${plate}`);

    if (placaExistente.data.existePlaca) {
      addAlert();
      console.error('La placa ya existe. Introduce una placa diferente.');
      return;
    }


    try {
      await axios.post('https://localhost:7070/api/Vehicles', JSON.stringify(vehicle), {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      navigate('/Vehicle');
      confirmAlert();
    } catch (error) {
      console.error('Error al enviar el vehículo:', error);
    }
  };

  const [clients, setClients] = useState([]);

  useEffect(() => {
    // Hacer la solicitud a la API para obtener los nombres de los clientes
    axios
      .get('https://localhost:7070/api/Clients')
      .then((response) => {
        // Supongamos que la respuesta de la API es un arreglo de objetos con propiedades 'id' y 'name'
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
            required="true"
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
            required="true"
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
            <option value="">Selecciona un cliente</option>
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
