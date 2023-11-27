import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './view.css';

export default function ShowSale() {
  const [sale, setSale] = useState({});
  const [products, setProducts] = useState([]);
  const [client, setClient] = useState({});
  const [employee, setEmployee] = useState({});

  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const formDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear().toString().slice(-2);
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');
    return `${day}-${month}-${year}`;
  };

  useEffect(() => {
    const loadSale = async () => {
      try {
        // Obtener información de la venta
        const saleResult = await axios.get(`https://localhost:7070/api/Sales/${id}`);
        setSale(saleResult.data);

        // Obtener información de los productos asociados a la venta
        const productsResult = await axios.get(`https://localhost:7070/api/SaleProducts/${id}/products`);
        setProducts(productsResult.data);

        // Obtener información del cliente
        const clientResult = await axios.get(`https://localhost:7070/api/Clients/${saleResult.data.clientId}`);
        setClient(clientResult.data);

        // Obtener información del empleado
        const employeeResult = await axios.get(`https://localhost:7070/api/Employees/${saleResult.data.employeeId}`);
        setEmployee(employeeResult.data);
      } catch (error) {
        console.error('Error al cargar la venta:', error);
      }
    };

    loadSale();
  }, [id]);

  return (
    <div>
      <h1>.</h1>
      <div className="view-container">
        <div className="view-row">
          <label className="view-label">Código:</label>
          <label className="view-value">{sale.code}</label>
        </div>
        <div className="view-row">
          <label className="view-label">Fecha:</label>
          <label className="view-value">{formDate(sale.date)}</label>
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
          <label className="view-label">Subtotal:</label>
          <label className="view-value">{sale.subTotal}</label>
        </div>
        <div className="view-row">
          <label className="view-label">Empleado:</label>
          <label className="view-value">{employee.name}</label>
        </div>
        <div className="view-row">
          <label className="view-label">Cliente:</label>
          <label className="view-value">{client.name} {client.lastName}</label>
        </div>
        <div className="view-row">
          <label className="view-label">Productos:</label>
          <div className='view-container'>
            <ul>
              {products.map((product) => (
                <li key={product.id}>{product.name} Precio {product.price} </li>
              ))}
            </ul>
          </div>
        </div>
        <a href="Sales" className="submit-button">Salir</a>
      </div>

    </div>
  );
}
