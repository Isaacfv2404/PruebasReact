import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function ShowEmployee() {
  const [employee, setEmployee] = useState([]);

  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  useEffect(() => {
    loadEmployee();
  }, []);

  const loadEmployee = async () => {
    try {
      const result = await axios.get(`https://localhost:7070/api/Employees/${id}`);
      setEmployee(result.data);
    } catch (error) {
      console.error('Error al cargar el empleado:', error);
    }
  };

  return (
    <div className="view-container">
      <div className="view-row">
        <label className="view-label">Cédula:</label>
        <label className="view-value">{employee.identification}</label>
      </div>
      <div className="view-row">
        <label className="view-label">Nombre:</label>
        <label className="view-value">{employee.name}</label>
      </div>
      <div className="view-row">
        <label className="view-label">Dirección:</label>
        <label className="view-value">{employee.address}</label>
      </div>
      <div className="view-row">
        <label className="view-label">Teléfono:</label>
        <label className="view-value">{employee.phone}</label>
      </div>
      <div className="view-row">
        <label className="view-label">Correo Electrónico:</label>
        <label className="view-value">{employee.email}</label>
      </div>
      <div className="view-row">
        <label className="view-label">Contraseña:</label>
        <label className="view-value">{employee.password}</label>
      </div>
    </div>
  );
}
