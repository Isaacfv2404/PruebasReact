import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Link, useNavigate } from 'react-router-dom';

export default function ShowBuys() {
  let navigate = useNavigate();
  const [buys, setBuys] = useState({});

  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  useEffect(() => {
    loadBuys();
  }, []);

  const loadBuys = async () => {
    try {
      const result = await axios.get(`https://localhost:7070/api/Buys/${id}`);
      setBuys(result.data);
    } catch (error) {
      console.error('Error al cargar la compra:', error);
    }
  };

  return (
    <div>
      <link rel="stylesheet" href="/globalView.css"></link>
      <div className="view-container">
        <div className="view-row">
          <label className="view-label">Fecha:</label>
          <label className="view-value">{buys.date}</label>
        </div>
        <div className="view-row">
          <label className="view-label">Cantidad:</label>
          <label className="view-value">{buys.amount}</label>
        </div>
        <div className="view-row">
          <label className="view-label">Total:</label>
          <label className="view-value">{buys.total}</label>
        </div>
        <div className="view-row">
          <label className="view-label">ID del Proveedor:</label>
          <label className="view-value">{buys.supplierId}</label>
        </div>
        <div className="view-row">
          <label className="view-label">ID del Empleado:</label>
          <label className="view-value">{buys.employeeId}</label>
        </div>
        <div className="view-row">
          <label className="view-label">ID del Producto:</label>
          <label className="view-value">{buys.productId}</label>
        </div>
      </div>
    </div>
  );
}
