import Footer from './footer';

import React, { useEffect, useState } from 'react';

import axios from 'axios';
import './styles.css';

import { Link, useParams } from 'react-router-dom';
import DeleteWarranty from '../garantia/DeleteWarranty';

export default function ProductList() {
  const [warranties, setWarranties] = useState([]);
  useEffect(() => {
    loadWarranties();
  }, []);

  const loadWarranties = async () => {
    try {
      const response = await axios.get('https://localhost:7070/api/Warranties');
      setWarranties(response.data);
    } catch (error) {
      // Manejar errores aquí
      console.error('Error al cargar los formularios:', error);
    }
  };

  const handleWarrantyDeleted = () => {
    loadWarranties(); // Actualiza la lista de garantais
  };

  return (
    <div className="table-container">

      <h1>.</h1>  
      <h1>Garantías</h1>
      <table className="table">
        <thead className="table-header">
          <tr>
            <th>#</th>
            <th>Descripción</th>
            <th>Producto</th>
            <th>Vehículo</th>
            <th>Fecha Inicio</th>
            <th>Fecha Vencimiento</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {warranties.map((warranty, index) => (
            <tr>
              <th scope="row" key={index}>
                {index + 1}
              </th>
              <td>{warranty.description}</td>
              <td>{warranty.product.name}</td>
              <td>{warranty.vehicle.brand}</td>

              <td>{warranty.startDate.split('T')[0]}</td>
              <td>{warranty.endDate.split('T')[0]}</td>

              <td className="actions">
                <Link
                  className="actions-link "
                  to={`/ShowWarranty?id=${warranty.id}`}
                >
                  Ver
                </Link>
                <Link
                  className="actions-link "
                  to={`/EditWarranty?id=${warranty.id}`}
                >
                  Editar
                </Link>

                <Link
                  className="actions-link "
                  onClick={() => {
                    DeleteWarranty(warranty.id, handleWarrantyDeleted);
                  }}
                >
                  Eliminar
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <a
        href="/AddWarranty" class="btn-flotante">+</a>
      <Footer />

    </div>
  );
}
