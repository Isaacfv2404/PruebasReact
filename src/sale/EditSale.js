import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

export default function EditSale() {
  let navigate = useNavigate();

  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');


  const [sale, setSale] = useState({
    id: id,
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
  const [productsL, setProductsL] = useState([]);
  const [cantidades, setCantidades] = useState({});
  const [salep, setSaleP] = useState([]);


  // Estado para almacenar productos seleccionados
  const [productosSeleccionados, setProductosSeleccionados] = useState([]);

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
  const handleCantidadChange = (productId, cantidad) => {
    setCantidades((prevCantidades) => {
      const updatedCantidades = { ...prevCantidades };
  
      if (updatedCantidades.hasOwnProperty(productId)) {
        updatedCantidades[productId] = cantidad;
      } else {
        updatedCantidades[productId] = cantidad;
      }
  
      return updatedCantidades;
    });
  };
  
  const { code, date, employeeId, clientId, discount, subTotal, total, cantidad } = sale;

  const onInputChange = (e) => {
    setSale({ ...sale, [e.target.name]: e.target.value });
  };


  useEffect(() => {
    loadSale();
    loadProducts();
    loadEmployees();
    loadClients();
    //loadSaleProducts();
  }, []);

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

    const saleData = {
      id: parseInt(id),
      code: parseInt(code),
      date: formatDate(date),
      employeeId: parseInt(employeeId),
      clientId: parseInt(clientId),
      discount: parseFloat(discount),
      subTotal: parseFloat(calculatedTotal.subtotal),
      total: parseFloat(calculatedTotal.total),
    };


    // Actualizar la venta (Sale) usando PUT
    const resp = await axios.put(`https://localhost:7070/api/Sales/${id}`, saleData);

    // Recorrer los productos seleccionados y actualizar la tabla de SaleProducts
    for (const productId of productosSeleccionados) {
      const cantidad = cantidades[productId] || 1; // Obtener la cantidad ingresada o usar 1 si no se ingresó nada
      // Verificar si el SaleProduct ya existe
      const saleProductId = await obtenerSaleProductId(id, productId);
      const saleProductData = {
        id: saleProductId,
        saleId: parseInt(id),
        productId: parseInt(productId),
        quantity: parseInt(cantidad),
      };



      if (saleProductId) {
        await axios.put(`https://localhost:7070/api/SaleProducts/${saleProductId}`, saleProductData);
      } else {
        const saleProductDataP = {
          saleId: parseInt(id),
          productId: parseInt(productId),
          quantity: parseInt(cantidad),
        };
        await axios.post('https://localhost:7070/api/SaleProducts', saleProductDataP);
      }
    }

    navigate('/Sales');
    Swal.fire('Venta Actualizada!', 'La venta se actualizó con éxito!', 'success');
  };

  // Función para obtener el SaleProductId si existe
  const obtenerSaleProductId = async (saleId, productId) => {
    try {
      const response = await axios.get(`https://localhost:7070/api/SaleProducts/${saleId}/${productId}`);
      console.log(response.data)
      return response.data.id;
    } catch (error) {
      // Si ocurre un error (por ejemplo, 404 Not Found), significa que no existe
      return null;
    }
  };


  const loadSale = async () => {
    try {
      const result = await axios.get(`https://localhost:7070/api/Sales/${id}`);
      setSale(result.data);

      // Obtener información de los productos seleccionados y sus cantidades asociadas
      const saleProductsResult = await axios.get(`https://localhost:7070/api/SaleProducts/${id}/saleproducts`);
      const selectedProducts = saleProductsResult.data.map((saleProduct) => ({
        id: saleProduct.productId,
        cantidad: saleProduct.quantity,
      }));

      setProductosSeleccionados(selectedProducts.map((product) => product.id));
      setCantidades(selectedProducts.reduce((acc, product) => {
        acc[product.id] = product.cantidad;
        return acc;
      }, {}));
    } catch (error) {
      console.error('Error al cargar la venta:', error);
    }
  };



  const loadProducts = async () => {
    try {
      // Obtener información de los productos asociados a la venta
      const productsResult = await axios.get(`https://localhost:7070/api/SaleProducts/${id}/products`);
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

  const loadClients = async () => {
    try {
      const response = await axios.get('https://localhost:7070/api/Clients');
      setClients(response.data);
    } catch (error) {
      console.error('Error al cargar los SALEP:', error);
    }
  };
  const loadSaleProducts = async () => {
    try {
      const response = await axios.get(`https://localhost:7070/api/SaleProducts/${id}/saleproducts`);
      setSaleP(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error al cargar los clientes:', error);
    }
  };

  return (
    <div>
      <link rel="stylesheet" href="/sale.css"></link>
      <div className="container">
        <p>.</p>
        <h2 className="heading">Editar Venta</h2>

        <form onSubmit={(e) => onSubmit(e)}>
          <div className="colums">
            <div className="form-group">
              <label className="form-label">Código</label>
              <input
                type={'number'}
                className="form-control"
                placeholder="Código"
                name="code"
                value={code}
              />
            </div>
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

            <div className="form-group">
              <label className="form-label">Cliente</label>
              <select
                className="form-control"
                name="clientId"
                value={clientId}

              >
                <option value="">Cliente</option>
                {clients.map((client) => (
                  <option key={client.id} value={client.id}>
                    {client.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Descuento</label>
              <input
                type={'number'}
                className="form-control"
                placeholder="Ingresa el descuento"
                name="discount"
                value={discount}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Subtotal</label>
              <input
                type={'number'}
                step="0.01"
                className="form-control"
                name="subTotal"
                value={(calculateTotal().subtotal)}
                readOnly
              />
            </div>
            <div className="form-group">
              <label className="form-label">Total</label>
              <input
                type={'number'}
                className="form-control"
                placeholder="Total"
                name="total"
                value={calculateTotal().total}
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

          <button className="submit-button" type="submit">Guardar Cambios</button>
          <a href="Sales" className="submit-button">Cancelar</a>
        </form>
      </div >
    </div >
  );
}
