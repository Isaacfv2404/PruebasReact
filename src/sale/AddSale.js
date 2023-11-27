import axios from 'axios';
import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

export default function AddSale() {
  let navigate = useNavigate();

  const [sale, setSale] = useState({
    code: '',
    date: '',
    total: '',
    discount: '',
    employeeId: '',
    clientId: '',
    productId: '',
  });
  const [products, setProducts] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [clients, setClients] = useState([]);

  const { code, date, total, discount, employeeId, clientId, productId } = sale;

  const onInputChange = (e) => {
    setSale({ ...sale, [e.target.name]: e.target.value });
  };

  const formatDate = (date) => {
    const d = new Date(date);

    const year = d.getFullYear().toString().slice(-4); // Obtiene los últimos dos dígitos del año
    const month = (d.getMonth() + 1).toString().padStart(2, '0'); // Ajusta el mes para tener siempre dos dígitos
    const day = d.getDate().toString().padStart(2, '0'); // Ajusta el día para tener siempre dos dígitos

    return `${year}-${month}-${day}`;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const saleData = {
      code: parseInt(code),
      date: formatDate(date), // Formatear la fecha aquí
      total: parseFloat(total),
      discount: parseFloat(discount),
      employeeId: parseInt(employeeId),
      clientId: parseInt(clientId),
      productId: parseInt(productId),
    };

    // Realiza la solicitud POST a la API utilizando axios
    await axios.post('https://localhost:7070/api/Sales', saleData);
    navigate('/');
  };

  ///caragar lo productos y empleados

  useEffect(() => {
    loadProducts();
    loadEmployees();
    loadClients();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await axios.get('https://localhost:7070/api/Products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error al cargar los productos:', error);
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

  return (
    <div>
      <link rel="stylesheet" href="/globalForm.css"></link>
      <div className="container">
        <h2 className="heading">Registrar Venta</h2>

        <form onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <label className="form-label">Código</label>
            <input
              type={'number'}
              className="form-control"
              placeholder="Ingresa el código de venta"
              name="code"
              value={code}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Fecha</label>
            <input
              type={'date'}
              className="form-control"
              placeholder="Ingresa la fecha"
              name="date"
              value={date}
              onChange={(e) => onInputChange(e)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Total</label>
            <input
              type={'number'}
              step="0.01"
              className="form-control"
              placeholder="Ingresa el total"
              name="total"
              value={total}
              onChange={(e) => onInputChange(e)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Descuento</label>
            <input
              type={'number'}
              step="0.01"
              className="form-control"
              placeholder="Ingresa el descuento"
              name="discount"
              value={discount}
              onChange={(e) => onInputChange(e)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Empleado</label>
            <select
              className="form-control"
              name="employeeId"
              value={employeeId}
              onChange={(e) => onInputChange(e)}
            >
              <option value="">Selecciona un empleado</option>
              {employees.map((employee) => (
                <option key={employee.id} value={employee.id}>
                  {employee.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Cliente</label>
            <select
              className="form-control"
              name="clientId"
              value={clientId}
              onChange={(e) => onInputChange(e)}
            >
              <option value="">Selecciona un cliente</option>
              {clients.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Producto</label>
            <select
              className="form-control"
              name="productId"
              value={productId}
              onChange={(e) => onInputChange(e)}
            >
              <option value="">Selecciona un producto</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>
          </div>

          <button className="submit-button" type="submit">
            Registrar Venta
          </button>
        </form>
      </div>
    </div>
  );
}
