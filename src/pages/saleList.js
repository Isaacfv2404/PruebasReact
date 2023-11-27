import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles.css';

import { Link, useParams } from 'react-router-dom';

export default function SaleList() {
  const [sales, setSales] = useState([]);
 

  useEffect(() => {
    loadSales();

  }, []);

  const loadSales = async () => {
    try {
      const response = await axios.get('https://localhost:7070/api/Sales');
      setSales(response.data);
    } catch (error) {
      console.error('Error al cargar las ventas:', error);
    }
  };

  let formattedPrice = '';

  return (
 
      <div className="table-container">
        <h1>Ventas</h1>
          <table className="table">
        <thead className="table-header">
          <tr>
            <th>#</th>
            <th>Código</th>
            <th>Fecha</th>
            <th>Total</th>
            <th>Descuento</th>
            <th>Empleado ID</th>
            <th>Cliente ID</th>
            <th>Producto ID</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {sales.map((sale, index) => (
            <tr key={sale.id}>
              <th scope="row">{index + 1}</th>
              <td style={{ display: 'none' }}>{sale.id}</td>
              <td>{sale.code}</td>
              <td>{sale.date.split('T')[0]}</td>
              <td>{
                  (formattedPrice = sale.total
                    ? sale.total.toLocaleString('es-CR', {
                        style: 'currency',
                        currency: 'CRC',
                      })
                    : '')
                }</td>
              <td>{
                  (formattedPrice = sale.discount
                    ? sale.discount.toLocaleString('es-CR', {
                        style: 'currency',
                        currency: 'CRC',
                      })
                    : '')
                }</td>
              <td>{sale.employeeId}</td>
              <td>{sale.clientId}</td>
              <td>{sale.productId}</td>
              <td className="actions">
                <Link
                  className="actions-link"
                  to={`/ShowSale?id=${sale.id}`}
                >
                  Ver
                </Link>
                <Link
                  className="actions-link"
                  to={`/EditSale?id=${sale.id}`}
                >
                  Editar
                </Link>
                <Link
                  className="actions-link"
                  to={`DeleteSale?id=${sale.id}`}
                >
                  Eliminar
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      
        </table>
        <a href="/AddSale" class="btn-flotante">
        +
      </a>
      </div>

 
  );

}
