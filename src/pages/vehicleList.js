import Footer from './footer';
import React, { useEffect, useState } from 'react';

import axios from 'axios';
import './styles.css';

import { Link, useParams } from 'react-router-dom';
import DeleteVehicle from '../vehicle/DeleteVehicle';
import Pagination from '../pagination/Pagination';

export default function VehicleList() {
  const [vehicles, setVehicles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const vehiclesPerPage = 10;

  useEffect(() => {
    loadVehicles();
  }, []);

  const [clients, setClients] = useState([]);

  useEffect(() => {
    // Hacer la solicitud a la API para obtener los nombres de los clientes
    axios
      .get('https://localhost:7070/api/Clients')
      .then((response) => {
        // Supongamos que la respuesta de la API es un arreglo de objetos con propiedades 'id' y 'name'
        const clientsData = response.data;
        setClients(clientsData);
      })
      .catch((error) => {
        console.error('Error al obtener la lista de clientes:', error);
      });
  }, []);

  const loadVehicles = async () => {
    try {
      const response = await axios.get('https://localhost:7070/api/Vehicles');
      setVehicles(response.data);
    } catch (error) {
      // Manejar errores aquí
      console.error('Error al cargar los formularios:', error);
    }
  };

  const indexOfLastVehicle = currentPage * vehiclesPerPage;
  const indexOfFirstVehicle = indexOfLastVehicle - vehiclesPerPage;
  const currentVehicles = vehicles.slice(
    indexOfFirstVehicle,
    indexOfLastVehicle
  );

  const onPageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="table-container">
      <h1>.</h1>
      <h1>Vehículos</h1>
      <table className="table">
        <thead className="table-header">
          <tr>
            <th>#</th>
            <th>Placa</th>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Año</th>
            <th>Cliente Asociado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {currentVehicles.map((vehicle, index) => (
            <tr>
              <th scope="row" key={index}>
                {index + 1}
              </th>
              <td>{vehicle.plate}</td>
              <td>{vehicle.brand}</td>
              <td>{vehicle.model}</td>
              <td>{vehicle.year}</td>
              <td>
                {clients.find((client) => client.id === vehicle.clientId)?.name}
              </td>

              <td className="actions">
                <Link
                  className="actions-link "
                  to={`/ShowVehicle?id=${vehicle.id}`}
                >
                  Ver
                </Link>
                <Link
                  className="actions-link "
                  to={`/EditVehicle?id=${vehicle.id}`}
                >
                  Editar
                </Link>

                <Link
                  className="actions-link "
                  onClick={() => {
                    DeleteVehicle(vehicle.id, loadVehicles);
                  }}
                >
                  Eliminar
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(vehicles.length / vehiclesPerPage)}
        onPageChange={onPageChange}
      />

      <a href="/AddVehicle" class="btn-flotante">
        +
      </a>

      <Footer />
    </div>
  );
}
