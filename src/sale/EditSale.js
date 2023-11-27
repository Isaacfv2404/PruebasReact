import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function EditSale() {
  let navigate = useNavigate();

  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  const [sale, setSale] = useState({
    code: '',
    date: '',
    total: '',
    discount: '',
    employeeId: '',
    clientId: '',
    productId: '',
  });

  const { code, date, total, discount, employeeId, clientId, productId } = sale;

  const onInputChange = (e) => {
    setSale({ ...sale, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadSale();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`https://localhost:7070/api/Sales/${id}`, sale);
    navigate('/');
  };

  const loadSale = async () => {
    const result = await axios.get(`https://localhost:7070/api/Sales/${id}`);
    setSale(result.data);
  };

  return (
    <div>
      <link rel="stylesheet" href="/globalForm.css"></link>
      <div className="container">
        <h2 className="heading">Editar Venta</h2>

        <form onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <label className="form-label">Código</label>
            <input
              type={'number'}
              className="form-control"
              placeholder="Ingresa el código"
              name="code"
              value={code}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Fecha</label>
            <input
              type={'date'}
              className="form-control"
              name="date"
              value={date}
              onChange={(e) => onInputChange(e)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Total</label>
            <input
              type={'number'}
              className="form-control"
              placeholder="Ingresa el total"
              name="total"
              value={total}
              onChange={(e) => onInputChange(e)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Descuento</label>
            <input
              type={'number'}
              className="form-control"
              placeholder="Ingresa el descuento"
              name="discount"
              value={discount}
              onChange={(e) => onInputChange(e)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">ID del Empleado</label>
            <input
              type={'number'}
              className="form-control"
              placeholder="Ingresa el ID del empleado"
              name="employeeId"
              value={employeeId}
              onChange={(e) => onInputChange(e)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">ID del Cliente</label>
            <input
              type={'number'}
              className="form-control"
              placeholder="Ingresa el ID del cliente"
              name="clientId"
              value={clientId}
              onChange={(e) => onInputChange(e)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">ID del Producto</label>
            <input
              type={'number'}
              className="form-control"
              placeholder="Ingresa el ID del producto"
              name="productId"
              value={productId}
              onChange={(e) => onInputChange(e)}
            />
          </div>

          <button className="submit-button" type="submit">
            Guardar Cambios
          </button>
        </form>
      </div>
    </div>
  );
}
