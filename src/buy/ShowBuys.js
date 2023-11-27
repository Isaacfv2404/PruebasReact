import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './view.css';

export default function ShowBuys() {
  const [buys, setBuys] = useState({});
  const [supplierName, setSupplierName] = useState('');
  const [employeeName, setEmployeeName] = useState('');
  const [productName, setProductName] = useState([]);

  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  useEffect(() => {
    const loadBuys = async () => {
      try {
        // Obtener información de la compra
        const result = await axios.get(`https://localhost:7070/api/Buys/${id}`);
        setBuys(result.data);

        // Obtener información del proveedor
        const supplierResult = await axios.get(`https://localhost:7070/api/Suppliers/${result.data.supplierId}`);
        setSupplierName(supplierResult.data.name);

        // Obtener información del empleado
        const employeeResult = await axios.get(`https://localhost:7070/api/Employees/${result.data.employeeId}`);
        setEmployeeName(employeeResult.data.name);

        // Obtener información del producto
        const productResult = await axios.get(`https://localhost:7070/api/BuysProducts/${id}/products`);
        setProductName(productResult.data);
      } catch (error) {
        console.error('Error al cargar la compra:', error);
      }
    };

    loadBuys();
  }, [id]);

  return (
    <div>
      <div className="view-container">
        <div className="view-row">
          <label className="view-label">Fecha:</label>
          <label className="view-value">{buys.date}</label>
        </div>
        <div className="view-row">
          <label className="view-label">Proveedor:</label>
          <label className="view-value">{supplierName}</label>
        </div>
        <div className="view-row">
          <label className="view-label">Empleado:</label>
          <label className="view-value">{employeeName}</label>
        </div>
        <div className="view-row">
          <label className="view-label">Total:</label>
          <label className="view-value">{buys.total}</label>
        </div>
        <div className="view-row">
          <label className="view-label">Productos:</label>
          <div className='view-container'>
            <ul>
              {productName.map((product) => (
                <li key={product.id}>{product.name} Precio {product.price}</li>
              ))}
            </ul>
          </div>
        </div>
        <a href="Buys" className="submit-button">Salir</a>
      </div>
    </div>
  );
}
