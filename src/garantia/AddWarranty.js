import axios from 'axios';

import React, { useEffect, useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { formAlert } from '../alerts/alerts';

export default function AddWarranty() {
  let navigate = useNavigate();

  const [warranty, setWarranty] = useState({
    description: '',
    state: false,
    productId: 0,
    vehicleId: 0,
    startDate: '',
    endDate: '',
  });

  const { description, state, productId, vehicleId, startDate, endDate } =
    warranty;

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setWarranty((prevWarranty) => ({
      ...prevWarranty,
      [name]: name === 'state' ? value === 'true' : value,
    }));
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!description || !startDate || !endDate || !productId || !vehicleId) {
      formAlert('Debe llenar todos los campos.');
      return;
    }

    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);
    if (startDateObj >= endDateObj) {
      formAlert('La fecha de inicio debe ser anterior a la fecha de fin.');
      return;
    }

    const currentDate = new Date();

    console.log(currentDate);
    console.log(startDateObj);
  
    if (startDateObj < currentDate) {
      formAlert('La fecha de inicio debe ser en el futuro.');
      return;
    }

    if (endDateObj < currentDate) {
      formAlert('La fecha de fin debe ser en el futuro.');
      return;
    }
    try {
      await axios.post('https://localhost:7070/api/Warranties', warranty);
      Swal.fire(
        '!Garantía Agregada!',
        '!La Garantía se almacenó con éxito!',
        'success'
      );
      navigate('/Warranty');
    } catch (error) {
      console.error('Error al enviar la garantía:', error);
    }
  };

  const [vehicles, setVehicles] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadVehicles();
    loadProducts();
  }, []);

  const loadVehicles = async () => {
    try {
      const response = await axios.get('https://localhost:7070/api/Vehicles');
      setVehicles(response.data);
    } catch (error) {
      // Manejar errores aquí
      console.error('Error al cargar los formularios:', error);
    }
  };

  const loadProducts = async () => {
    try {
      const response = await axios.get('https://localhost:7070/api/Products');
      setProducts(response.data);
    } catch (error) {
      // Manejar errores aquí
      console.error('Error al cargar los formularios:', error);
    }
  };

  return (
    <div>
      <link rel="stylesheet" href="/globalForm.css"></link>
      <div className="container">
        <h1 className="heading">Registrar Garantía</h1>

        <form onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <label className="form-label">Descripción</label>
            <input
              type={'text'}
              className="form-control"
              placeholder="Ingresa la descripción"
              name="description"
              value={description}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Estado</label>
            <select
              className="form-control"
              name="state"
              value={state === null ? '' : state}
              onChange={(e) => onInputChange(e)}
            >
              <option value="">Selecciona un estado</option>
              <option value={true}>Activo</option>
              <option value={false}>Inactivo</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Nombre de Producto Asociado</label>
            <select
              className="form-control"
              name="productId"
              value={productId}
              onChange={(e) => onInputChange(e)}
            >
              <option value="">Selecciona un producto</option>
              {products.map((product, index) => (
                <option key={index} value={product.id}>
                  {product.name} - {product.description} {product.brand}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Nombre de Vehículo Asociado</label>
            <select
              className="form-control"
              name="vehicleId"
              value={vehicleId}
              onChange={(e) => onInputChange(e)}
            >
              <option value="">Selecciona un vehículo</option>
              {vehicles.map((vehicle, index) => (
                <option key={index} value={vehicle.id}>
                  {vehicle.plate} - {vehicle.brand} {vehicle.model}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Fecha Inicio</label>
            <input
              type={'date'}
              className="form-control"
              name="startDate"
              value={startDate}
              onChange={(e) => onInputChange(e)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Fecha Vencimiento</label>
            <input
              type={'date'}
              className="form-control"
              name="endDate"
              value={endDate}
              onChange={(e) => onInputChange(e)}
            />
          </div>

          <div className="button-group">
            <button
              className="submit-button"
              onClick={() => navigate('/Warranty')}
            >
              Volver
            </button>

            <button className="submit-button" type="submit">
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
