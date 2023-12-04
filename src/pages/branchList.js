import Footer from './footer';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles.css';
import DeleteBranch from '../branch/DeleteBranch';
import { Link } from 'react-router-dom';
import Pagination from '../pagination/Pagination';

export default function BranchList() {
  const [branches, setBranches] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const branchesPerPage = 10;

  useEffect(() => {
    loadBranches();
  }, []);

  const loadBranches = async () => {
    try {
      const response = await axios.get('https://localhost:7070/api/Branches');
      setBranches(response.data);
    } catch (error) {
      console.error('Error al cargar las sucursales:', error);
    }
  };

  const indexOfLastBranch = currentPage * branchesPerPage;
  const indexOfFirstBranch = indexOfLastBranch - branchesPerPage;
  const currentBranches = branches.slice(indexOfFirstBranch, indexOfLastBranch);

  const onPageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <div className="table-container">
        <h1>.</h1>
        <h1>Sucursales</h1>
        <table className="table">
          <thead className="table-header">
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Dirección</th>
              <th>Teléfono</th>
              <th>Correo Electrónico</th>
              <th>Horario</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {currentBranches.map((branch, index) => (
              <tr key={branch.id}>
                <th scope="row">{index + 1}</th>
                <td>{branch.name}</td>
                <td>{branch.address}</td>
                <td>{branch.phone}</td>
                <td>{branch.email}</td>
                <td>{branch.hours}</td>
                <td className="actions">
                  <Link
                    className="actions-link"
                    to={`/ShowBranch?id=${branch.id}`}
                  >
                    Ver
                  </Link>
                  <Link
                    className="actions-link"
                    to={`/EditBranch?id=${branch.id}`}
                  >
                    Editar
                  </Link>
                  <Link
                    className="actions-link "
                    onClick={() => {
                      DeleteBranch(branch.id, loadBranches);
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
          totalPages={Math.ceil(branches.length / branchesPerPage)}
          onPageChange={onPageChange}
        />
        <a href="/AddBranch" className="btn-flotante">
          +
        </a>
        <Footer />
      </div>
    </div>
  );
}
