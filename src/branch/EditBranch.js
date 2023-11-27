import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { formAlert } from '../alerts/alerts';

export default function EditBranch() {
  let navigate = useNavigate();

  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  const [branch, setBranch] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
    hours: '',
  });

  const { name, address, phone, email, hours } = branch;

  const onInputChange = (e) => {
    setBranch({ ...branch, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadBranch();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();

    // Validaciones
    if (
      !name ||
      !address ||
      !phone ||
      !email ||
      !hours
    ) {
      formAlert('Todos los campos son obligatorios.');
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

    Swal.fire({
      title: "¿Desea guardar los cambios?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Guardar",
      denyButtonText: `No guardar`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire("Guardado.", "", "success");
        await axios.put(`https://localhost:7070/api/Branches/${id}`, branch);
        navigate('/Branch');
      } else if (result.isDenied) {
        Swal.fire("Los cambios no fueron guardados.", "", "info");
        return;
      }
    });

  };

  const loadBranch = async () => {
    const result = await axios.get(`https://localhost:7070/api/Branches/${id}`);
    setBranch(result.data);
  };

  return (
    <div>
      <link rel="stylesheet" href="/globalForm.css"></link>
      <div className="container">
        <h2 className="heading">Editar Sucursal</h2>

        <form onSubmit={(e) => onSubmit(e)}>
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

          <div className='form-group'>
            <label className='form-label'>Horario</label>
            <select
              className='form-control'
              name='hours'
              value={hours}
              onChange={(e) => onInputChange(e)}
            >
              <option value='' disabled>
                Selecciona un horario
              </option>
              <option value='9:00 AM - 5:00 PM'>9:00 AM - 5:00 PM</option>
              <option value='10:00 AM - 6:00 PM'>10:00 AM - 6:00 PM</option>
              {/* Agrega más opciones según tus necesidades */}
            </select>
          </div>

          <button className="submit-button" type="submit">
            Guardar Cambios
          </button>
        </form>
      </div>
    </div>
  );
}
