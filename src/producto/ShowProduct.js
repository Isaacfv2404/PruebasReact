import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function ShowProduct() {
  //let navigate = useNavigate();
  const [product, setProduct] = useState([]);
  const [battery, setBattery] = useState([]);

  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct = async () => {
    const result = await axios.get(`https://localhost:7070/api/Products/${id}`);

    setProduct(result.data);
    if (result.data.productType === 'Batería') {
      loadBattery();
    }
  };

  const loadBattery = async () => {
    const resultBattery = await axios.get(
      `https://localhost:7070/api/Batteries/${id}`
    );
    setBattery(resultBattery.data);
  };

  const formattedPrice = product.price
    ? product.price.toLocaleString('es-CR', {
        style: 'currency',
        currency: 'CRC',
      })
    : '';

  return (
    <div>
      <link rel="stylesheet" href="/globalView.css"></link>
      <div class="view-container">
        <div class="view-row">
          <label class="view-label">Nombre:</label>
          <label class="view-value">{product.name}</label>
        </div>
        <div class="view-row">
          <label class="view-label">Descripción:</label>
          <label class="view-value">{product.description}</label>
        </div>
        <div class="view-row">
          <label class="view-label">Marca</label>
          <label class="view-value">{product.brand}</label>
        </div>
        <div class="view-row">
          <label class="view-label">Precio:</label>
          <label class="view-value">{formattedPrice}</label>
        </div>
        <div class="view-row">
          <label class="view-label">Cantidad:</label>
          <label class="view-value">{product.stock}</label>
        </div>
        <div class="view-row">
          <label class="view-label">Tipo:</label>
          <label class="view-value">{product.productType}</label>
        </div>
        <>--------------------------------------------------------</>
        {product.productType === 'Batería' && (
          <div className='view-container-details'>
            <div className="view-row">
              <label className="view-label">Modelo:</label>
              <label className="view-value">{battery.model}</label>
            </div>
            <div className="view-row">
              <label className="view-label">Capacidad:</label>
              <label className="view-value">{battery.capacity}</label>
            </div>
            <div className="view-row">
              <label className="view-label">Voltaje:</label>
              <label className="view-value">{battery.voltage}</label>
            </div>

            <div className="view-row">
              <label className="view-label">Tipo:</label>
              <label className="view-value">{battery.type}</label>
            </div>
            <div className="view-row">
              <label className="view-label">Peso:</label>
              <label className="view-value">{battery.weight}</label>
            </div>
            <div className="view-row">
              <label className="view-label">Longitud:</label>
              <label className="view-value">{battery.large}</label>
            </div>

            <div className="view-row">
              <label className="view-label">Ancho:</label>
              <label className="view-value">{battery.width}</label>
            </div>
            <div className="view-row">
              <label className="view-label">Altura:</label>
              <label className="view-value">{battery.height}</label>
            </div>

            <div className="view-row">
              <label className="view-label">Expiración:</label>
              <label className="view-value">{battery.expiration}</label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
