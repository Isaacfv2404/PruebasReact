import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { formAlert } from '../alerts/alerts';

export default function EditProduct() {
  let navigate = useNavigate();

  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  let batteryFlag = '';

  const [product, setProduct] = useState({
    name: '',
    description: '',
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
    expiration: '',
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

    if (product.productType === 'Batería') {
      setBattery({ ...battery, [e.target.name]: e.target.value });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await loadProduct();
        if (batteryFlag === 'Batería'){
        await loadBattery();
        }
      } catch (error) {
        console.error('Error loading product or battery:', error);
      }
    };

    fetchData();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();

    switch (true) {
      case !name:
      case !description:
      case !brand:
      case !price:
      case !stock:
        formAlert('Debe llenar todos los datos');
        return;

      case !/^[a-zA-Z\s]+$/.test(name):
        formAlert('El nombre del producto debe contener solo letras.');
        return;

      case !/^\d+(\.\d{1,2})?$/.test(price):
        formAlert(
          'El precio del producto debe ser un número válido con hasta dos decimales.'
        );
        return;

      case !/^\d+$/.test(stock):
        formAlert('La cantidad del producto debe ser un número entero.');
        return;

      case description.length < 10:
        formAlert(
          'La descripción del producto debe tener al menos 10 caracteres.'
        );
        return;
    }

    if (productType === '') {
      formAlert('Debe seleccionar un tipo de producto');
      return;
    } else if (productType === 'Batería') {
      switch (true) {
        case !model:
        case !capacity:
        case !voltage:
        case !type:
        case !weight:
        case !large:
        case !width:
        case !height:
        case !expiration:
          formAlert('Debe llenar todos los datos');
          return;

        case !/^\d+$/.test(capacity):
          formAlert('La capacidad de la batería debe ser un número entero.');
          return;

        case !/^\d+$/.test(voltage):
          formAlert('El voltaje de la batería debe ser un número entero.');
          return;

        case !/^[a-zA-Z\s]+$/.test(type):
          formAlert('El tipo de la batería debe contener solo letras.');
          return;

        case !/^\d+(\.\d{1,2})?$/.test(weight):
          formAlert(
            'El peso de la batería debe ser un número válido con hasta dos decimales.'
          );
          return;

        case !/^\d+(\.\d{1,2})?$/.test(large):
          formAlert(
            'El largo de la batería debe ser un número válido con hasta dos decimales.'
          );
          return;

        case !/^\d+(\.\d{1,2})?$/.test(width):
          formAlert(
            'El ancho de la batería debe ser un número válido con hasta dos decimales.'
          );
          return;

        case !/^\d+(\.\d{1,2})?$/.test(height):
          formAlert(
            'El alto de la batería debe ser un número válido con hasta dos decimales.'
          );
          return;

        case new Date(expiration) <= new Date():
          formAlert('La fecha de expiración debe ser en el futuro.');
          return;
      }
    }

    const result = await Swal.fire({
      title: '¿Desea guardar los cambios?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonColor: '#333',
      confirmButtonTextColor: '#fddb3a',
      confirmButtonText: 'Guardar',
      denyButtonText: 'No guardar',
    });

    if (result.isConfirmed) {
      // Si el usuario confirma, realiza la actualización
      try {
        await axios.put(`https://localhost:7070/api/Products/${id}`, product);

        if (productType === 'Batería') {
          await axios.put(
            `https://localhost:7070/api/Batteries/${id}`,
            battery
          );
        }
        Swal.fire('Guardado.', '', 'success');
        navigate('/ProductList');
      } catch (error) {
        console.error('Error al actualizar el producto:', error);
        Swal.fire(
          'Error al guardar los cambios.',
          'Por favor, inténtelo de nuevo más tarde.',
          'error'
        );
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
    batteryFlag = result.data.productType;
  };

  const loadBattery = async () => {
    try {
      const result = await axios.get(
        `https://localhost:7070/api/Batteries/${id}`
      );

      const batteryData = result.data;
      const formattedExpirationDate = new Date(batteryData.expiration)
        .toISOString()
        .split('T')[0];
      console.log(formattedExpirationDate);
      setBattery({
        ...batteryData,
        expiration: formattedExpirationDate,
      });
    } catch (error) {
      console.error('Error loading battery data:', error);
    }
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

          {productType === 'Batería' && (
            <div>
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
                <label className="form-label">Capacidad (mAh)</label>
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
                <label className="form-label">Voltaje (V)</label>
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
                <label className="form-label">Peso (g)</label>
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
                <label className="form-label">Largo (cm)</label>
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
                <label className="form-label">Ancho (cm)</label>
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
                <label className="form-label">Alto (cm)</label>
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
