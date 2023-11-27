import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ShowClient.css';

export default function ShowClient() {
  //let navigate = useNavigate();
  const [client, setClient] = useState([]);

  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  useEffect(() => {
    loadClient();
  }, []);

  const loadClient = async () => {
    const result = await axios.get(`https://localhost:7070/api/Clients/${id}`);
    setClient(result.data);
  };

  return (
    <div class="view-container">
      <div class="view-row">
        <label class="view-label">Nombre:</label>
        <label class="view-value">{client.name}</label>
      </div>
      <div class="view-row">
        <label class="view-label">Apellidos:</label>
        <label class="view-value">{client.lastName}</label>
      </div>
      <div class="view-row">
        <label class="view-label">Identificación</label>
        <label class="view-value">{client.identification}</label>
      </div>
      <div class="view-row">
        <label class="view-label">Email:</label>
        <label class="view-value">{client.email}</label>
      </div>
      <div class="view-row">
        <label class="view-label">Dirección:</label>
        <label class="view-value">{client.address}</label>
      </div>
      <div class="view-row">
        <label class="view-label">Teléfono:</label>
        <label class="view-value">{client.phone}</label>
      </div>
     
    </div>
  );
}
