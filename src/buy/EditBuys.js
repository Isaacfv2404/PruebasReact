import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function EditBuys() {
  let navigate = useNavigate();

  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  const [buys, setBuys] = useState({
    date: '',
    amount: '',
    total: '',
    supplierId: '',
    employeeId: '',
    productId: '',
  });

  const { date, amount, total, supplierId, employeeId, productId } = buys;

  const onInputChange = (e) => {
    setBuys({ ...buys, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadBuys();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`https://localhost:7070/api/Buys/${id}`, buys);
    navigate('/');
  };

  const loadBuys = async () => {
    const result = await axios.get(`https://localhost:7070/api/Buys/${id}`);
    setBuys(result.data);
  };

  return (
    <div>
      <link rel="stylesheet" href="/globalForm.css"></link>
      <div className="container">
        <h2 className="heading">Editar Compra</h2>

        <form onSubmit={(e) => onSubmit(e)}>
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
            <label className="form-label">Cantidad</label>
            <input
              type={'number'}
              className="form-control"
              placeholder="Ingresa la cantidad"
              name="amount"
              value={amount}
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
            <label className="form-label">ID del Proveedor</label>
            <input
              type={'number'}
              className="form-control"
              placeholder="Ingresa el ID del proveedor"
              name="supplierId"
              value={supplierId}
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
