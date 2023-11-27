import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Link, useNavigate } from 'react-router-dom';

export default function ShowWarranty() {
  let navigate = useNavigate();
  const [warranty, setWarranty] = useState([]);

  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  useEffect(() => {
    loadWarranty();
  }, []);

  const loadWarranty = async () => {
    const result = await axios.get(
      `https://localhost:7070/api/Warranties/${id}`
    );
    setWarranty(result.data);
  };

  return (
    <div>
       <link rel="stylesheet" href="/globalView.css"></link> 
      <div class="view-container">
        <div class="view-row">
          <label class="view-label">Descripción:</label>
          <label class="view-value">{warranty.description}</label>
        </div>
        <div class="view-row">
          <label class="view-label">Estado:</label>
          <label class={`view-value ${warranty.state ? 'active' : 'inactive'}`}>
            {warranty.state ? 'Activo' : 'Inactivo'}
          </label>
        </div>
        <div class="view-row">
          <label class="view-label">Fecha Inicio:</label>
          <label class="view-value">{warranty.startDate ? warranty.startDate.split('T')[0]: ''}</label>
        </div>
        <div class="view-row">
          <label class="view-label">Fecha Vencimiento:</label>
          <label class="view-value">{warranty.endDate ? warranty.endDate.split('T')[0]: ' '}</label>
        </div>
      </div>
    </div>
  );
}
