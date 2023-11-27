import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ShowVehicle.css';


export default function ShowVehicle() {
    //let navigate = useNavigate();
    const [vehicle, setVehicle] = useState([])

    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const [clients, setClients] = useState([]);

    useEffect(() => {
      axios
        .get('https://localhost:7070/api/Clients')
        .then((response) => {
          const clientsData = response.data;
          setClients(clientsData);
        })
        .catch((error) => {
          console.error('Error al obtener la lista de clientes:', error);
        });
    }, []);
    useEffect(
        ()=>{
            loadVehicle();
        }, [])

        const loadVehicle= async () => {
            const result = await axios.get(`https://localhost:7070/api/Vehicles/${id}`);
            setVehicle(result.data);
          }
        

  return (
<div class="view-container">
<div class="view-row">
    <label class="view-label">Placa:</label>
    <label class="view-value">{vehicle.plate}</label>
  </div>
  <div class="view-row">
    <label class="view-label">Marca:</label>
    <label class="view-value">{vehicle.brand}</label>
  </div>
  <div class="view-row">
    <label class="view-label">Modelo</label>
    <label class="view-value">{vehicle.model}</label>
  </div>
  <div class="view-row">
    <label class="view-label">Año:</label>
    <label class="view-value">{vehicle.year}</label>
  </div>
  <div class="view-row">
    <label class="view-label">Nombre de cliente asociado:</label>
    <label class="view-value">{clients.find((client) => client.id === vehicle.clientId)?.name}</label>
  </div>
</div>

  );
}
