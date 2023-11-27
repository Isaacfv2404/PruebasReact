import axios from 'axios';

import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

export default function AddProduct() {
  let navigate = useNavigate();

  const [product, setProduct] = useState({
    name: '',
    description: '',
    address: '',
    brand: '',
    price: '',
    stock: '',
    productType: '',
  });

  const { name, description, brand, price, stock, productType } = product;

  const onInputChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post('https://localhost:7070/api/Products', product);
    navigate('/');
    Swal.fire(
      'Producto Agregado!',
      'El producto se almacenó con éxito!',
      'success'
    )
  };

  return (
    <div>
      <link rel="stylesheet" href="/globalForm.css"></link>
    <div className="container">
      <h1 className="heading">Registrar Producto</h1>

      <form onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <label className="form-label">Nombre</label>
          <input
            type={'text'}
            className="form-control"
            placeholder="Ingresa el nombre"
            name="name"
            value={name}
            onChange={(e) => onInputChange(e)}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Descripción</label>
          <input
            type={'text'}
            className="form-control"
            placeholder="Ingresa la descripción"
            name="description"
            value={description}
            onChange={(e) => onInputChange(e)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Marca</label>
          <input
            type={'text'}
            className="form-control"
            placeholder="Ingresa la marca"
            name="brand"
            value={brand}
            onChange={(e) => onInputChange(e)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Precio</label>
          <input
            type={'number'}
            className="form-control"
            placeholder="ingresa el precio"
            name="price"
            value={price}
            onChange={(e) => onInputChange(e)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Cantidad</label>
          <input
            type={'number'}
            className="form-control"
            placeholder="Ingresa la cantidad en stock"
            name="stock"
            value={stock}
            onChange={(e) => onInputChange(e)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Tipo de Producto</label>
          <select
            className="form-control"
            name="productType"
            value={productType}
            onChange={(e) => onInputChange(e)}
          >
            <option value="Batería">Batería</option>
            <option value="Accesorio">Accesorio</option>
          </select>
        </div>

        <button className="submit-button" type="submit">
          Enviar
        </button>
      </form>
    </div>
    </div>
  );
}
