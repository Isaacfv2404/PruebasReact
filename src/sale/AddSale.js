import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

export default function AddSale() {
  let navigate = useNavigate();

  const [sale, setSale] = useState({
    code: '',
    date: new Date(),
    employeeId: '',
    clientId: '',
    discount: '',
    subTotal: '',
    total: '',
    cantidad: '',
  });

  const [products, setProducts] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [clients, setClients] = useState([]);
  const salep = [];
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


  const { code, date, employeeId, clientId, discount, subTotal, total, cantidad } = sale;

  const onInputChange = (e) => {
    setSale({ ...sale, [e.target.name]: e.target.value });
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear().toString().slice(-4);
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Calcular el total sumando los precios de los productos seleccionados
  const calculateTotal = () => {
    const selectedProducts = products.filter((product) =>
      productosSeleccionados.includes(product.id)
    );
    const subtotalAmount = selectedProducts.reduce(
      (subtotal, product) => subtotal + (product.price * (cantidades[product.id] || 0)), 0
    );
    const discountPercentage = parseFloat(discount) || 0;
    const discountAmount = (subtotalAmount * discountPercentage) / 100;
    const totalAmount = subtotalAmount - discountAmount;

    return {
      subtotal: subtotalAmount.toFixed(2),
      total: totalAmount.toFixed(2),
    };
  };

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////  

  const onSubmit = async (e) => {
    if (!code || !date || !employeeId || !clientId || !discount || !productosSeleccionados.length) {
      console.error('Por favor, complete todos los campos necesarios.');

      Swal.fire('Espacios Vacios', 'No puede dejar espacios vacios', 'error');
    } else {
      e.preventDefault();
      // Calcular el total
      const calculatedTotal = calculateTotal();


      const saleData = {
        code: parseInt(code),
        date: formatDate(date),
        employeeId: parseInt(employeeId),
        clientId: parseInt(clientId),
        discount: parseFloat(discount),
        subTotal: parseFloat(calculatedTotal.subtotal),
        total: parseFloat(calculatedTotal.total),

      };
      console.log(saleData)
      const response = await axios.post('https://localhost:7070/api/Sales', saleData);

      const saleId = response.data.id;

      // Recorrer los productos seleccionados y agregarlos a la tabla de SaleProducts según la cantidad
      for (const productId of productosSeleccionados) {
        const cantidad = cantidades[productId] || 1; // Obtener la cantidad ingresada o usar 1 si no se ingresó nada
        const saleProductData = {
          saleId: saleId,
          productId: productId,
          quantity:cantidad,
        };

        await axios.post('https://localhost:7070/api/SaleProducts', saleProductData);

      }

      navigate('/Sales');
      Swal.fire('Venta Agregado!', 'La venta se almacenó con éxito!', 'success');

    }

  };

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
      <h1>.</h1>
      <link rel="stylesheet" href="/sale.css"></link>
      <div className="container">
        <h2 className="heading">Registrar Venta</h2>

        <form onSubmit={(e) => onSubmit(e)}>
          <div className="colums">
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
                value={new Date().toISOString().split('T')[0]}
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
              <label className="form-label">Descuento(%)</label>
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
              <label className="form-label">Subtotal</label>
              <input
                type={'number'}
                step="0.01"
                className="form-control"
                name="subTotal"
                value={calculateTotal().subtotal}
                readOnly
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
                value={calculateTotal().total} // Usar el total calculado
                onChange={(e) => onInputChange(e)} // Permitir que el usuario lo edite si es necesario
              />
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
          <a href="Sales" className="submit-button">Cancelar</a>
          <button className="submit-button" type="submit">Registrar Venta</button>

        </form>
      </div>
    </div>
  );
}
