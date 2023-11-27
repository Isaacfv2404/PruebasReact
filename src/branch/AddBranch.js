import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { formAlert } from '../alerts/alerts';

export default function AddBranches() {
  let navigate = useNavigate();

  const [branch, setBranch] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
    hours: '',
  });

  const { name, address, phone, email, hours } = branch;

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setBranch({ ...branch, [name]: value });
  };

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

    // Realiza la solicitud POST a la API utilizando axios

    
    Swal.fire({
      title: "¿Desea guardar la nueva sucursal?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Guardar",
      denyButtonText: `No guardar`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire("Guardado.", "", "success");
        await axios.post('https://localhost:7070/api/Branches', branch);
        navigate('/Branch');
      } else if (result.isDenied) {
        Swal.fire("La sucursal no fue guardada.", "", "info");
        return;
      }
    });

  };

  return (
    <div>
      <link rel="stylesheet" href="/globalForm.css"></link>
      <div className='container'>
        <h2 className='heading'>Registrar Sucursal</h2>

        <form onSubmit={(e) => onSubmit(e)}>
          <div className='form-group'>
            <label className='form-label'>Nombre</label>
            <input
              type='text'
              className='form-control'
              placeholder='Ingrese el nombre de la sucursal'
              name='name'
              value={name}
              onChange={(e) => onInputChange(e)}
            />
          </div>

          <div className='form-group'>
            <label className='form-label'>Dirección</label>
            <input
              type='text'
              className='form-control'
              placeholder='Ingrese la dirección de la sucursal'
              name='address'
              value={address}
              onChange={(e) => onInputChange(e)}
            />
          </div>

          <div className='form-group'>
            <label className='form-label'>Teléfono</label>
            <input
              type='tel'
              className='form-control'
              placeholder='Ingrese el número de teléfono'
              name='phone'
              value={phone}
              onChange={(e) => onInputChange(e)}
            />
          </div>

          <div className='form-group'>
            <label className='form-label'>Correo electrónico</label>
            <input
              className='form-control'
              placeholder='Ingrese la dirección de correo electrónico'
              name='email'
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

          <button className='submit-button' type='submit'>
            Registrar
          </button>
        </form>
      </div>
    </div>
  );
}
