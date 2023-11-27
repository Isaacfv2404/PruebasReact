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

  const [battery, setBattery] = useState({
    model: '',
    capacity: 0,
    voltage: 0,
    type: '',
    weight: 0,
    large: 0,
    width: 0,
    height: 0,
    expiration: new Date(),
  });

  const { name, description, brand, price, stock, productType } = product;

  const {
    model,
    capacity,
    voltage,
    type,
    weight,
    large,
    width,
    height,
    expiration,
  } = battery;

  const onInputChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
    setBattery({ ...battery, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    

    e.preventDefault();
    await axios.post('https://localhost:7070/api/Products', product);

    if (productType === 'Batería') {
      await axios.post('https://localhost:7070/api/Batteries', battery);
    }

    navigate('/');
    Swal.fire(
      'Producto Agregado!',
      'El producto se almacenó con éxito!',
      'success'
    );
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

          {productType === 'Batería' && (
            <div>
              {/* Campos específicos para Batería */}
              <div className="form-group">
                <label className="form-label">Modelo</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ingresa el modelo"
                  name="model"
                  value={model}
                  onChange={(e) =>
                    setBattery({ ...battery, model: e.target.value })
                  }
                />
              </div>

              <div className="form-group">
                <label className="form-label">Capacidad</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Ingresa la capacidad"
                  name="capacity"
                  value={capacity}
                  onChange={(e) =>
                    setBattery({ ...battery, capacity: e.target.value })
                  }
                />
              </div>

              <div className="form-group">
                <label className="form-label">Voltaje</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Ingresa el voltaje"
                  name="voltage"
                  value={voltage}
                  onChange={(e) =>
                    setBattery({ ...battery, voltage: e.target.value })
                  }
                />
              </div>

              <div className="form-group">
                <label className="form-label">Tipo</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ingresa el tipo"
                  name="type"
                  value={type}
                  onChange={(e) =>
                    setBattery({ ...battery, type: e.target.value })
                  }
                />
              </div>

              <div className="form-group">
                <label className="form-label">Peso</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Ingresa el peso"
                  name="weight"
                  value={weight}
                  onChange={(e) =>
                    setBattery({ ...battery, weight: e.target.value })
                  }
                />
              </div>

              <div className="form-group">
                <label className="form-label">Largo</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Ingresa el largo"
                  name="large"
                  value={large}
                  onChange={(e) =>
                    setBattery({ ...battery, large: e.target.value })
                  }
                />
              </div>

              <div className="form-group">
                <label className="form-label">Ancho</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Ingresa el ancho"
                  name="width"
                  value={width}
                  onChange={(e) =>
                    setBattery({ ...battery, width: e.target.value })
                  }
                />
              </div>

              <div className="form-group">
                <label className="form-label">Alto</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Ingresa el alto"
                  name="height"
                  value={height}
                  onChange={(e) =>
                    setBattery({ ...battery, height: e.target.value })
                  }
                />
              </div>

              <div className="form-group">
                <label className="form-label">Fecha de Expiración</label>
                <input
                  type="date"
                  className="form-control"
                  placeholder="Ingresa la fecha de expiración"
                  name="expiration"
                  value={expiration}
                  onChange={(e) =>
                    setBattery({ ...battery, expiration: e.target.value })
                  }
                />
              </div>

              {/* Otros campos específicos para Batería */}
            </div>
          )}

          <button className="submit-button" type="submit">
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}
