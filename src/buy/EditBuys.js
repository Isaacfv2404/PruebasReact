import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function EditBuys() {
  let navigate = useNavigate();

  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  const [buys, setBuys] = useState({
    date: new Date(),
    total: '',
    supplierId: '',
    employeeId: '',
    productId: '',
    cantidad: '',
  });

  const { date, amount, total, supplierId, employeeId, productId } = buys;
  const [productsL, setProductsL] = useState([]);
  const [products, setProducts] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [supplier, setSupplier] = useState([]);

  // Estado para almacenar productos seleccionados
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

  useEffect(() => {
    loadBuys();
    loadProducts();
    loadEmployees();
    loadSupplier();
  }, []);

  const calculateTotal = () => {
    const selectedProducts = products.filter((product) => productosSeleccionados.includes(product.id));
    const totalAmount = selectedProducts.reduce((total, product) => total + (product.price * (cantidades[product.id] || 0)), 0);
    return totalAmount.toFixed(2); // Redondear el resultado a dos decimales
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear().toString().slice(-4);
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  const formDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear().toString().slice(-2);
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');
    return `${day}-${month}-${year}`;
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const calculatedTotal = calculateTotal();
    const buysData = {
      id: parseInt(id),
      date: formatDate(date),
      amount: parseInt(amount),
      total: parseFloat(calculatedTotal),
      supplierId: parseInt(supplierId),
      employeeId: parseInt(employeeId),
    };
    await axios.put(`https://localhost:7070/api/Buys/${id}`, buysData);

    for (const productId of productosSeleccionados) {
      const cantidad = cantidades[productId] || 1;
      const buysProductData = {
        buysId: parseInt(id),
        productId: productId,
        quantity: cantidad,
      };
      console.log(buysProductData);
      await axios.post('https://localhost:7070/api/BuysProducts', buysProductData);
    }
    navigate('/');
  };

  const loadBuys = async () => {
    const result = await axios.get(`https://localhost:7070/api/Buys/${id}`);
    setBuys(result.data);
  };
  const loadProducts = async () => {
    try {
      // Obtener información de los productos asociados a la venta
      const productsResult = await axios.get(`https://localhost:7070/api/BuysProducts/${id}/products`);
      setProductsL(productsResult.data);

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
      console.error('Error al cargar los empleados:', error);
    }
  };

  return (
    <div>
      <link rel="stylesheet" href="/sale.css"></link>
      <div className="container">
        <h1>.</h1>
        <h1 className="heading">Editar Compra</h1>

        <form onSubmit={(e) => onSubmit(e)}>
          <div className="colums">
            <div className="form-group">
              <label className="form-label">Fecha</label>
              <input
                type={'date'}
                className="form-control"
                name="date"
                value={new Date().toISOString().split('T')[0]}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Total</label>
              <input
                type={'number'}
                className="form-control"
                placeholder="Ingresa el total"
                name="total"
                value={(parseInt(total)+parseInt(calculateTotal()))}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Proveedor</label>
              <select
                className="form-control"
                name="supplierId"
                value={supplierId}

              >
                <option value="">Proveedor</option>
                {employees.map((supplier) => (
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

              >
                <option value="">Empleado</option>
                {employees.map((employee) => (
                  <option key={employee.id} value={employee.id}>
                    {employee.name}
                  </option>
                ))}
              </select>
            </div>

            </div>

            <div className="view-row">
              <label className="view-label">Productos:</label>
              <div className='view-container'>
                <ul>
                  {productsL.map((product) => (
                    <li key={product.id}>{product.name} Precio {product.price}</li>
                  ))}
                </ul>
              </div>
            </div>
        

          <div className="form-group">
            <label className="form-label">Productos</label>
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
           
          </div>

          <button className="submit-button" type="submit">Guardar Cambios</button>
          <a href="Buys" className="submit-button">Cancelar</a>
        </form>
      </div>
    </div>
  );
}
