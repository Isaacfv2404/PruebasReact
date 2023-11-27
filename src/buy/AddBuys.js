import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function AddBuys() {
  let navigate = useNavigate();

  const [buys, setBuys] = useState({
    date: new Date(),
    supplierId: '',
    employeeId: '',
    total: '',
    cantidad: '',
  });
  const [products, setProducts] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [suppliers, setSupplier] = useState([]);
  const { date, supplierId, employeeId, total, amount } = buys;
  const [productosSeleccionados, setProductosSeleccionados] = useState([]);
  const [cantidades, setCantidades] = useState({});

  const handleSeleccionProducto = (id) => {
    const productoYaSeleccionado = productosSeleccionados.includes(id);
    if (productoYaSeleccionado) {
      setProductosSeleccionados(
        productosSeleccionados.filter((productoId) => productoId !== id)
      );
    } else {
      setProductosSeleccionados([...productosSeleccionados, id]);
    }
  };
  ///cantidad de los productos
  const handleCantidadChange = (productId, cantidad) => {
    setCantidades((prevCantidades) => ({
      ...prevCantidades,
      [productId]: cantidad,
    }));
  };


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

  const calculateTotal = () => {
    const selectedProducts = products.filter((product) => productosSeleccionados.includes(product.id));
    const totalAmount = selectedProducts.reduce((total, product) => total + (product.price * (cantidades[product.id] || 0)), 0);
    return totalAmount.toFixed(2); // Redondear el resultado a dos decimales
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const calculatedTotal = calculateTotal();

    const buyData = {
      date: formatDate(date),
      supplierId: parseInt(supplierId),
      employeeId: parseInt(employeeId),
      total: parseFloat(calculatedTotal),
    };

    console.log(buyData)
    const response = await axios.post('https://localhost:7070/api/Buys', buyData);

    const buysId = response.data.id;
    for (const productId of productosSeleccionados) {
      const cantidad = cantidades[productId] || 1;
      const buysProductData = {
        buysId: buysId,
        productId: productId,
        quantity:cantidad,
      };
      console.log(buysProductData)
      await axios.post('https://localhost:7070/api/BuysProducts', buysProductData);
    }
    navigate('/Buys');
    Swal.fire('Compra Agregado!', 'La Compra se almacenó con éxito', 'success');
  };

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
      
      <link rel="stylesheet" href="/sale.css"></link>
      <div className="container">
      <h1>.</h1>
        <h2 className="heading">Registrar Compra</h2>

        <form onSubmit={(e) => onSubmit(e)}>
          <div className="colums">
            <div className="form-group">
              <label className="form-label">Fecha</label>
              <input
                type={'date'}
                className="form-control"
                placeholder="Ingresa la fecha"
                name="date"
                value={new Date().toISOString().split('T')[0]}
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
                value={calculateTotal()}
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
          </div>
          <div className='form-group'>
            <label className='form-label'>Productos</label>
            <table className="table">
              <thead>
                <tr>
                  <th>Nombre del Producto</th>
                  <th>Seleccione el producto</th>
                  <th>Cantidad</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>{product.name}</td>
                    <td>
                      <input
                        type="checkbox"
                        onChange={() => handleSeleccionProducto(product.id)}
                        checked={productosSeleccionados.includes(product.id)}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        min="0"
                        value={cantidades[product.id] || 0}
                        onChange={(e) => handleCantidadChange(product.id, e.target.value)}
                        disabled={!productosSeleccionados.includes(product.id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Puedes utilizar el array de productos seleccionados (productosSeleccionados) según tus necesidades */}
            <p>Productos seleccionados: {productosSeleccionados.join(', ')}</p>
          </div>

          <button className="submit-button" type="submit">
            Registrar Compra
          </button>
          <a href="Buys" className="submit-button">Cancelar</a>
        </form>
      </div>
    </div>
  );
}
