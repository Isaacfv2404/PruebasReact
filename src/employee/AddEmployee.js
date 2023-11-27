import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { formAlert } from '../alerts/alerts';

export default function AddEmployee() {
  let navigate = useNavigate();

  const [employee, setEmployee] = useState({
    identification: '',
    name: '',
    address: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const {
    identification,
    name,
    address,
    phone,
    email,
    password,
    confirmPassword,
  } = employee;

  const onInputChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    // Validaciones
    if (
      !identification ||
      !name ||
      !address ||
      !phone ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      formAlert('Mensaje de error');
      return;
    }

    if (!/^\d{9}$/.test(identification)) {
      formAlert('La cédula debe tener 9 dígitos numéricos.');
      return;
    }

    if (!/^[a-zA-Z\s]+$/.test(name)) {
      formAlert('El nombre debe contener solo letras.');
      return;
    }

    if (!/^\d{8}$/.test(phone)) {
      formAlert('El teléfono debe tener 8 dígitos numéricos.');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      formAlert('El correo electrónico no es válido.');
      return;
    }

    if (password !== confirmPassword) {
      formAlert('Las contraseñas no coinciden.');
      return;
    }

    // Resto del código para enviar los datos al servidor

    Swal.fire({
      title: "¿Desea guardar el nuevo empleado?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Guardar",
      denyButtonText: `No guardar`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire("Guardado.", "", "success");
        await axios.post('https://localhost:7070/api/Employees', employee);
        navigate('/Employee'); // Actualiza la ruta según la aplicación
      } else if (result.isDenied) {
        Swal.fire("El empleado no fue guardado.", "", "info");
        return;
      }
    });
  };

  return (
    <div>
      <link rel="stylesheet" href="/globalForm.css"></link>
      <div className="container">
        <h1 className="heading">Registrar Empleado</h1>

        <form onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <label className="form-label">Cédula</label>
            <input
              type={'text'}
              className="form-control"
              placeholder="Ingresa la cédula"
              name="identification"
              value={identification}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Nombre</label>
            <input
              type={'text'}
              className="form-control"
              placeholder="Ingresa el nombre"
              name="name"
              value={name}
              onChange={(e) => onInputChange(e)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Dirección</label>
            <input
              type={'text'}
              className="form-control"
              placeholder="Ingresa la dirección"
              name="address"
              value={address}
              onChange={(e) => onInputChange(e)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Teléfono</label>
            <input
              type={'text'}
              className="form-control"
              placeholder="Ingresa el teléfono"
              name="phone"
              value={phone}
              onChange={(e) => onInputChange(e)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Correo Electrónico</label>
            <input
              className="form-control"
              placeholder="Ingresa el correo electrónico"
              name="email"
              value={email}
              onChange={(e) => onInputChange(e)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Contraseña</label>
            <input
              type={'password'}
              className="form-control"
              placeholder="Ingresa la contraseña"
              name="password"
              value={password}
              onChange={(e) => onInputChange(e)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Confirmar Contraseña</label>
            <input
              type={'password'}
              className="form-control"
              placeholder="Confirma la contraseña"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => onInputChange(e)}
            />
          </div>

          <button className="submit-button" type="submit">
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}
