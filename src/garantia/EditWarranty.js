import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function EditProduct() {
  let navigate = useNavigate();

  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  const [warranty, setWarranty] = useState({
    description: '',
    state: '',
    productId: '',
    vehicleId: '',
    startDate: '',
    endDate: '',
  });

  const {description, state, productId, vehicleId, startDate, endDate } = warranty;

  const onInputChange = (e) => {
    setWarranty({ ...warranty, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadWarranty();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`https://localhost:7070/api/Warranties/${id}`, warranty);
    navigate('/Warranty');
  };

  const loadWarranty = async () => {
    const result = await axios.get(
      `https://localhost:7070/api/Warranties/${id}`
    );

    const warrantyData = result.data;

    const formattedStartDate = warrantyData.startDate.split('T')[0];
    const formattedEndDate = warrantyData.endDate.split('T')[0];

  setWarranty({
    ...warrantyData,
    startDate: formattedStartDate,
    endDate: formattedEndDate,
  });
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
                value={state}
                onChange={(e) => onInputChange(e)}
              >
                <option value={true}>Activo</option>
                <option value={false}>Inactivo</option>
              </select>
            </div>
    
            <div className="form-group">
              <label className="form-label">Producto</label>
              <input
                type={'text'}
                className="form-control"
                placeholder="Ingresa el producto"
                name="productId"
                value={productId}
                onChange={(e) => onInputChange(e)}
              />
            </div>
    
            <div className="form-group">
              <label className="form-label">Vehiculo</label>
              <input
                type={'text'}
                className="form-control"
                placeholder="Ingresa el vehiculo"
                name="vehicleId"
                value={vehicleId}
                onChange={(e) => onInputChange(e)}
              />
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
    
    
            <button className="submit-button" type="submit">
              Enviar
            </button>
          </form>
        </div>
        </div>
      );
}
