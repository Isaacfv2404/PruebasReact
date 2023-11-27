import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function EditWarranty() {
  let navigate = useNavigate();
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  const [warranty, setWarranty] = useState({
    description: '',
    state: false,
    productId: 0,
    vehicleId: 0,
    startDate: '',
    endDate: '',
  });

  const {description, state, productId, vehicleId, startDate, endDate } = warranty;

  const [vehicles, setVehicles] = useState([]);
  const [products, setProducts] = useState([]);

  

  useEffect(() => {
    loadWarranty();
    loadVehicles();
    loadProducts();
  }, []);

  const loadWarranty = async () => {
    try {
      const response = await axios.get(`https://localhost:7070/api/Warranties/${id}`);
      
    const warrantyData = response.data;

    const formattedStartDate = warrantyData.startDate.split('T')[0];
    const formattedEndDate = warrantyData.endDate.split('T')[0];
      setWarranty({
        ...warrantyData,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
      });
    } catch (error) {
      console.error('Error loading warranty:', error);
    }
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setWarranty((prevWarranty) => ({
      ...prevWarranty,
      [name]: name === 'state' ? value === 'true' : value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://localhost:7070/api/Warranties/${id}`, warranty);
      navigate('/Warranty');
    } catch (error) {
      console.error('Error updating warranty:', error);
    }
  };

  const loadVehicles = async () => {
    try {
      const response = await axios.get('https://localhost:7070/api/Vehicles');
      setVehicles(response.data);
    } catch (error) {
      console.error('Error loading vehicles:', error);
    }
  };

  const loadProducts = async () => {
    try {
      const response = await axios.get('https://localhost:7070/api/Products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error loading products:', error);
    }
  };

  return (
    <div>
      <link rel="stylesheet" href="/globalForm.css"></link>
      <div className="container">
        <h1 className="heading">Editar Garantía</h1>

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
              disabled // Campo deshabilitado
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
              disabled // Campo deshabilitado
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
              disabled 
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
              disabled 
            />
          </div>

          <button className="submit-button" type="submit">
            Actualizar
          </button>
        </form>
      </div>
    </div>
  );
}
