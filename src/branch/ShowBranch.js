import React, { useEffect, useState } from 'react';
import axios from 'axios';


import { Link, useNavigate } from 'react-router-dom';

export default function ShowBranch() {
  let navigate = useNavigate();
  const [branch, setBranch] = useState({});

  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  useEffect(() => {
    loadBranch();
  }, []);

  const loadBranch = async () => {
    try {
      const result = await axios.get(`https://localhost:7070/api/Branches/${id}`);
      setBranch(result.data);
    } catch (error) {
      console.error('Error al cargar la sucursal:', error);
    }
  };

  return (
    <div className="view-container">
      <div className="view-row">
        <label className="view-label">Nombre:</label>
        <label className="view-value">{branch.name}</label>
      </div>
      <div className="view-row">
        <label className="view-label">Dirección:</label>
        <label className="view-value">{branch.address}</label>
      </div>
      <div className="view-row">
        <label className="view-label">Teléfono:</label>
        <label className="view-value">{branch.phone}</label>
      </div>
      <div className="view-row">
        <label className="view-label">Correo Electrónico:</label>
        <label className="view-value">{branch.email}</label>
      </div>
      <div className="view-row">
        <label className="view-label">Horario:</label>
        <label className="view-value">{branch.hours}</label>
      </div>
    </div>
  );
}
