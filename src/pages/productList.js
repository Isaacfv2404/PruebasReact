import React, { useEffect, useState } from 'react';

import axios from 'axios';
import './styles.css';
import Swal from 'sweetalert2';

import { Link, useParams } from 'react-router-dom';
import DeleteProduct from '../producto/DeleteProduct';

export default function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await axios.get('https://localhost:7070/api/Products');
      setProducts(response.data);
    } catch (error) {
      // Manejar errores aquí
      console.error('Error al cargar los formularios:', error);
    }
  };
  const handleProductDeleted = () => {
    loadProducts(); // Actualiza la lista de productos
  };

  let formattedPrice = '';

  return (
    <div className="table-container">
      <h1>Productos</h1>
      <table className="table">
        <thead className="table-header">
          <tr>
            <th>#</th>
            <th>Id</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Marca</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Tipo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {products.map((producto, index) => (
            <tr>
              <th scope="row" key={index}>
                {index + 1}
              </th>

              <td>{producto.id}</td>
              <td>{producto.name}</td>
              <td>{producto.description}</td>
              <td>{producto.brand}</td>
              <td>
                {
                  (formattedPrice = producto.price
                    ? producto.price.toLocaleString('es-CR', {
                        style: 'currency',
                        currency: 'CRC',
                      })
                    : '')
                }
              </td>
              <td>{producto.stock}</td>
              <td>{producto.productType}</td>

              <td className="actions">
                <Link
                  className="actions-link "
                  to={`/ShowProduct?id=${producto.id}`}
                >
                  Ver
                </Link>
                <Link
                  className="actions-link "
                  to={`/EditProduct?id=${producto.id}`}
                >
                  Editar
                </Link>

                <Link
                  className="actions-link "
                  onClick={() => {
                    DeleteProduct(producto.id,handleProductDeleted);
                  }}
                >
                  Eliminar
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <a href="/AddProduct" class="btn-flotante">
        +
      </a>
    </div>
  );
}
