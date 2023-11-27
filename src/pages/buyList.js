import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles.css';

import { Link, useParams } from 'react-router-dom';

export default function BuyList() {
  const [buys, setBuys] = useState([]);

  useEffect(() => {
    loadBuys();
  }, []);

  
  const loadBuys = async () => {
    try {
      const response = await axios.get('https://localhost:7070/api/Buys');
      setBuys(response.data);
    } catch (error) {
      console.error('Error al cargar las compras:', error);
    }
  };

  let formattedPrice = '';
  return (

      <div className="table-container">
        <h1>Compras</h1>
        <table className="table">
        <thead className="table-header">
          <tr>
            <th>#</th>
            <th>ID</th>
            <th>Fecha</th>
            <th>Cantidad</th>
            <th>Total</th>
            <th>Proveedor ID</th>
            <th>Empleado ID</th>
            <th>Producto ID</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {buys.map((buy, index) => (
            <tr key={buy.id}>
              <th scope="row">{index + 1}</th>
              <td>{buy.id}</td>
              <td>{buy.date.split('T')[0]}</td>
              <td>{buy.amount}</td>
              <td>{
                  (formattedPrice = buy.total
                    ? buy.total.toLocaleString('es-CR', {
                        style: 'currency',
                        currency: 'CRC',
                      })
                    : '')
                }</td>
              <td>{buy.supplierId}</td>
              <td>{buy.employeeId}</td>
              <td>{buy.productId}</td>
              <td className="actions">
                <Link
                  className="actions-link"
                  to={`/ShowBuys?id=${buy.id}`}
                >
                  Ver
                </Link>
                <Link
                  className="actions-link"
                  to={`/EditBuys?id=${buy.id}`}
                >
                  Editar
                </Link>
                <Link
                  className="actions-link"
                  to={`DeleteBuys?id=${buy.id}`}
                >
                  Eliminar
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
        </table>
        <a href="/AddBuys" class="btn-flotante">
        +
      </a>
      </div>
  );

}
