import Footer from './footer';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles.css';
import Pagination from '../pagination/Pagination';
import { Link, useParams } from 'react-router-dom';
import DeleteClient from '../client/DeleteClient';

export default function ClientList() {
  const [clients, setClients] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const clientsPerPage = 10;

  useEffect(() => {
    loadClients();
  }, []);

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

  const loadClients = async () => {
    try {
      const response = await axios.get('https://localhost:7070/api/Clients');
      setClients(response.data);
    } catch (error) {
      // Manejar errores aquí
      console.error('Error al cargar los formularios:', error);
    }
  };

  
  const indexOfLastClient = currentPage * clientsPerPage;
  const indexOfFirstClient = indexOfLastClient - clientsPerPage;
  const currentClients = clients.slice(indexOfFirstClient, indexOfLastClient);
  const onPageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="table-container">
      <h1>.</h1>
      <h1>Clientes</h1>
      <table className="table">
        <thead className="table-header">
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Apellidos</th>
            <th>Identificación</th>
            <th>Correo Electrónico</th>
            <th>Dirección</th>
            <th>Teléfono</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {currentClients.map((client, index) => (
            <tr>
              <th scope="row" key={index}>
                {index + 1}
              </th>
              <td>{client.name}</td>
              <td>{client.lastName}</td>
              <td>{client.identification}</td>
              <td>{client.email}</td>
              <td>{client.address}</td>
              <td>{client.phone}</td>

              <td className="actions">
                <Link
                  className="actions-link "
                  to={`/ShowClient?id=${client.id}`}
                >
                  Ver
                </Link>
                <Link
                  className="actions-link "
                  to={`/EditClient?id=${client.id}`}
                >
                  Editar
                </Link>

                <Link
                  className="actions-link "
                  onClick={() => {
                    DeleteClient(client.id, loadClients);
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
      totalPages={Math.ceil(clients.length / clientsPerPage)}
      onPageChange={onPageChange}
    />
      <a href="/AddClient" class="btn-flotante">
        +
      </a>

      <Footer />
    </div>
  );
}
