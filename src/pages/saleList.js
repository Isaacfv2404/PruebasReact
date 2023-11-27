import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles.css';

import { Link, useParams } from 'react-router-dom';
import DeleteSale from '../sale/DeleteSale';
import Footer from './footer';

export default function SaleList() {
  const [sales, setSales] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [clients, setClients] = useState([]);

  useEffect(() => {
    loadSales();
    loadEmployees();
    loadClients();
  }, []);

  const loadSales = async () => {
    try {
      const response = await axios.get('https://localhost:7070/api/Sales');
      setSales(response.data);
    } catch (error) {
      console.error('Error al cargar las ventas:', error);
    }
  };

  const loadEmployees = async () => {
    try {
      const response = await axios.get('https://localhost:7070/api/Employees');
      setEmployees(response.data);
    } catch (error) {
      console.error('Error al cargar los empleados:', error);
    }
  };

  const loadClients = async () => {
    try {
      const response = await axios.get('https://localhost:7070/api/Clients');
      setClients(response.data);
    } catch (error) {
      console.error('Error al cargar los clientes:', error);
    }
  };

  let formattedPrice = '';

  const getEmployeeNameById = (employeeId) => {
    const employee = employees.find((e) => e.id === employeeId);
    return employee ? ` ${employee.name} ` : '';
  };

  const getClientNameById = (clientId) => {
    const client = clients.find((c) => c.id === clientId);
    return client ? ` ${client.name} -${client.lastName}` : '';
  };

  return (
    <div className="table-container">
       <h1>.</h1>
      <h1>Ventas</h1>
      <table className="table">
        <thead className="table-header">
          <tr>
            <th>#</th>
            <th>Código</th>
            <th>Fecha</th>
            <th>Empleado</th>
            <th>Cliente</th>
            <th>Descuento</th>
            <th>Subtotal</th>
            <th>Total</th>
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
              <td>{getEmployeeNameById(sale.employeeId)}</td>
              <td>{getClientNameById(sale.clientId)}</td>
              <td>
                {(formattedPrice = sale.discount
                  ? sale.discount.toLocaleString('es-CR', {
                      style: 'currency',
                      currency: 'CRC',
                    })
                  : '')}
              </td>
              <td>
                {(formattedPrice = sale.subTotal
                  ? sale.subTotal.toLocaleString('es-CR', {
                      style: 'currency',
                      currency: 'CRC',
                    })
                  : '')}
              </td>
              <td>
                {(formattedPrice = sale.total
                  ? sale.total.toLocaleString('es-CR', {
                      style: 'currency',
                      currency: 'CRC',
                    })
                  : '')}
              </td>
              <td className="actions">
                <Link className="actions-link" to={`/ShowSale?id=${sale.id}`}>
                  Ver
                </Link>
                <Link className="actions-link" to={`/EditSale?id=${sale.id}`}>
                  Editar
                </Link>
                <Link
                  className="actions-link "
                  onClick={() => {
                    DeleteSale(sale.id, loadSales);
                  }}
                >
                  Eliminar
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/AddSale" className="btn-flotante">
        +
      </Link>
      <Footer />
    </div>
  );
}

