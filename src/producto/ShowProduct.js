import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function ShowProduct() {
  //let navigate = useNavigate();
  const [product, setProduct] = useState([]);

  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct = async () => {
    const result = await axios.get(`https://localhost:7070/api/Products/${id}`);

    setProduct(result.data);
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
      </div>
    </div>
  );
}
