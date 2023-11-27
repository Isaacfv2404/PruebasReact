import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Link, useNavigate } from 'react-router-dom';

export default function ShowSale() {
  let navigate = useNavigate();
  const [sale, setSale] = useState({});

  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  useEffect(() => {
    loadSale();
  }, []);

  const loadSale = async () => {
    try {
      const result = await axios.get(`https://localhost:7070/api/Sales/${id}`);
      setSale(result.data);
    } catch (error) {
      console.error('Error al cargar la venta:', error);
    }
  };

  return (
    <div>
      <link rel="stylesheet" href="/globalView.css"></link>
      <div className="view-container">
        <div className="view-row">
          <label className="view-label">Código:</label>
          <label className="view-value">{sale.code}</label>
        </div>
        <div className="view-row">
          <label className="view-label">Fecha:</label>
          <label className="view-value">{sale.date}</label>
        </div>
        <div className="view-row">
          <label className="view-label">Total:</label>
          <label className="view-value">{sale.total}</label>
        </div>
        <div className="view-row">
          <label className="view-label">Descuento:</label>
          <label className="view-value">{sale.discount}</label>
        </div>
        <div className="view-row">
          <label className="view-label">ID del Empleado:</label>
          <label className="view-value">{sale.employeeId}</label>
        </div>
        <div className="view-row">
          <label className="view-label">ID del Cliente:</label>
          <label className="view-value">{sale.clientId}</label>
        </div>
        <div className="view-row">
          <label className="view-label">ID del Producto:</label>
          <label className="view-value">{sale.productId}</label>
        </div>
      </div>
    </div>
  );
}
