import axios from 'axios';
import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

export default function AddBuys() {
  let navigate = useNavigate();

  const [buys, setBuys] = useState({
    date: '',
    amount: '',
    total: '',
    supplierId: '',
    employeeId: '',
    productId: '',
  });
  const [products, setProducts] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [suppliers, setSupplier] = useState([]);

  const { date, amount, total, supplierId, employeeId, productId } = buys;

  const onInputChange = (e) => {
    setBuys({ ...buys, [e.target.name]: e.target.value });
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
    const buyData = {
      date: formatDate(date),
      amount: parseInt(amount),
      total: parseFloat(total),
      supplierId: parseInt(supplierId),
      employeeId: parseInt(employeeId),
      productId: parseInt(productId),
    };

    // Realiza la solicitud POST a la API utilizando axios
    await axios.post('https://localhost:7070/api/Buys', buyData);
    navigate('/Sales');
  };

  ///caragar lo productos y empleados

  useEffect(() => {
    loadProducts();
    loadEmployees();
    loadSupplier();
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

  const loadSupplier = async () => {
    try {
      const response = await axios.get('https://localhost:7070/api/Suppliers');
      setSupplier(response.data);
    } catch (error) {
      console.error('Error al cargar los proveedores:', error);
    }
  };

  return (
    <div>
      <link rel="stylesheet" href="/globalForm.css"></link>
      <div className="container">
        <h2 className="heading">Registrar Compra</h2>

        <form onSubmit={(e) => onSubmit(e)}>
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
            <label className="form-label">Cantidad</label>
            <input
              type={'number'}
              className="form-control"
              placeholder="Ingresa la cantidad"
              name="amount"
              value={amount}
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
            <label className="form-label">Proveedor</label>
            <select
              className="form-control"
              name="supplierId"
              value={supplierId}
              onChange={(e) => onInputChange(e)}
            >
              <option value="">Selecciona un proveedor</option>
              {suppliers.map((supplier) => (
                <option key={supplier.id} value={supplier.id}>
                  {supplier.name}
                </option>
              ))}
            </select>
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
            Registrar Compra
          </button>
        </form>
      </div>
    </div>
  );
}
