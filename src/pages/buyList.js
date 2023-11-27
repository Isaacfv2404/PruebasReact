import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles.css';
import { Link } from 'react-router-dom';

import Footer from './footer';
import DeleteBuys from '../buy/DeleteBuys';

export default function BuyList() {
  const [buys, setBuys] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadBuys();
    loadSuppliers();
    loadEmployees();
    loadProducts();
  }, []);

  const loadBuys = async () => {
    try {
      const response = await axios.get('https://localhost:7070/api/Buys');
      setBuys(response.data);
    } catch (error) {
      console.error('Error al cargar las compras:', error);
    }
  };

  const loadSuppliers = async () => {
    try {
      const response = await axios.get('https://localhost:7070/api/Suppliers');
      setSuppliers(response.data);
    } catch (error) {
      console.error('Error al cargar los proveedores:', error);
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

  const loadProducts = async () => {
    try {
      const response = await axios.get('https://localhost:7070/api/Products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error al cargar los productos:', error);
    }
  };

  let formattedPrice = '';

  const getSupplierNameById = (supplierId) => {
    const supplier = suppliers.find((s) => s.id === supplierId);
    return supplier ? `${supplier.name}` : '';
  };

  const getEmployeeNameById = (employeeId) => {
    const employee = employees.find((e) => e.id === employeeId);
    return employee ? `${employee.name}` : '';
  };

  const getProductNameById = (productId) => {
    const product = products.find((p) => p.id === productId);
    return product ? ` ${product.name}` : '';
  };

  return (
    <div className="table-container">
      <h1>.</h1>
      <h1>Compras</h1>
      <table className="table">
        <thead className="table-header">
          <tr>
            <th>#</th>
            <th>Fecha</th>
            <th>Proveedor</th>
            <th>Empleado</th>
            <th>Total</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {buys.map((buy, index) => (
            <tr key={buy.id}>
              <th scope="row">{index + 1}</th>
              <td>{buy.date.split('T')[0]}</td>
              <td>{getSupplierNameById(buy.supplierId)}</td>
              <td>{getEmployeeNameById(buy.employeeId)}</td>
              <td>
                {(formattedPrice = buy.total
                  ? buy.total.toLocaleString('es-CR', {
                      style: 'currency',
                      currency: 'CRC',
                    })
                  : '')}
              </td>

              <td className="actions">
                <Link className="actions-link" to={`/ShowBuys?id=${buy.id}`}>
                  Ver
                </Link>
                <Link className="actions-link" to={`/EditBuys?id=${buy.id}`}>
                  Editar
                </Link>
                <Link
                  className="actions-link "
                  onClick={() => {
                    DeleteBuys(buy.id, loadBuys);
                  }}
                >
                  Eliminar
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <a href="/AddBuys" className="btn-flotante">
        +
      </a>
      <Footer />
    </div>
  );
}
