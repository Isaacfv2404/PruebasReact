import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles.css';
import Footer from './footer';

import { Link } from 'react-router-dom';
import DeleteEmployee from '../employee/DeleteEmployee';

export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      const response = await axios.get('https://localhost:7070/api/Employees');
      setEmployees(response.data);
    } catch (error) {
      console.error('Error al cargar los empleados:', error);
    }
  };

  return (
    <div className="table-container">
      <h1>.</h1>
      <h1>Empleados</h1>
      <table className="table">
        <thead className="table-header">
          <tr>
            <th>#</th>
            <th>Cédula</th>
            <th>Nombre</th>
            <th>Dirección</th>
            <th>Teléfono</th>
            <th>Correo Electrónico</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {employees.map((employee, index) => (
            <tr key={employee.id}>
              <th scope="row">{index + 1}</th>
              <td>{employee.identification}</td>
              <td>{employee.name}</td>
              <td>{employee.address}</td>
              <td>{employee.phone}</td>
              <td>{employee.email}</td>
              <td className="actions">
                <Link
                  className="actions-link"
                  to={`/ShowEmployee?id=${employee.id}`}
                >
                  Ver
                </Link>
                <Link
                  className="actions-link"
                  to={`/EditEmployee?id=${employee.id}`}
                >
                  Editar
                </Link>
                <Link
                  className="actions-link "
                  onClick={() => {
                    DeleteEmployee(employee.id, loadEmployees);
                  }}
                >
                  Eliminar
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <a href="/AddEmployee" class="btn-flotante">
        +
      </a>

      <Footer />
    </div>
  );
}
