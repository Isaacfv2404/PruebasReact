import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function EditProduct() {
  let navigate = useNavigate();

  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  const [product, setProduct] = useState({
    name: '',
    description: '',
    brand: '',
    price: '',
    stock: '',
    productType: '',
  });

  const { name, description, brand, price, stock, productType } = product;

  const onInputChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadProduct();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    const result = await Swal.fire({
      title: '¿Desea guardar los cambios?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      denyButtonText: 'No guardar',
    });
  
    if (result.isConfirmed) {
      // Si el usuario confirma, realiza la actualización
      try {
        await axios.put(`https://localhost:7070/api/Products/${id}`, product);
        Swal.fire('Guardado.', '', 'success');
        navigate('/ProductList');
      } catch (error) {
        console.error('Error al actualizar el producto:', error);
        Swal.fire('Error al guardar los cambios.', 'Por favor, inténtelo de nuevo más tarde.', 'error');
      }
    } else if (result.isDenied) {
      // Si el usuario niega, muestra un mensaje informativo
      Swal.fire('Los cambios no fueron guardados.', '', 'info');
      navigate('/ProductList');
    }
  };

  const loadProduct = async () => {
    const result = await axios.get(`https://localhost:7070/api/Products/${id}`);
    setProduct(result.data);
  };

  return (
    <div>
      <link rel="stylesheet" href="/globalForm.css"></link>
      <div className="container">
        <h2 className="heading">EditarProducto</h2>

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
            <input
              type={'text'}
              className="form-control"
              placeholder="Ingresa el tipo"
              name="productType"
              value={productType}
              onChange={(e) => onInputChange(e)}
              disabled
            />
          </div>

          <button className="submit-button" type="submit">
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}
