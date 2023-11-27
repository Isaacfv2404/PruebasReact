import React, { useState } from 'react';
import Dropdown from './Dropdown';
import './Navigation.css';

const items = () => {
  return [
    {
      link: '/',
      title: 'Inventario',
    },
    {
      link: '/Warranty',
      title: 'Garantias',
    },
  ];
};

const handleClick = (option) => {
  switch (option) {
    case 'Vehiculos':
      window.location.href = '/Vehicle';
      break;
    case 'Clientes':
      window.location.href = '/Client';
      break;
    case 'Ventas':
      window.location.href = '/Sales';
      break;
      case 'Compras':
        window.location.href = '/Buys';
        break;
  }
};

export default function Navigation() {
  return (
    <nav className="navMenu">
      <div className="company-logo">
        <a className="add-link nav-link" href="/">
          <img src="logoEmpresa.png" alt="Logo de la empresa" />
        </a>
      </div>
      <div>
        <Dropdown dropdownTitle="Producto" items={items()} />
      </div>
      <div>
        <div className="title_wrapper">
          <button
            className="title_activator"
            onClick={() => handleClick('Vehiculos')}
          >
            Vehiculos
          </button>
        </div>
      </div>
      <div>
        <div className="title_wrapper">
          <button
            className="title_activator"
            onClick={() => handleClick('Clientes')}
          >
            Clientes
          </button>
        </div>
      </div>
      <div>
        <div className="title_wrapper">
          <button
            className="title_activator"
            onClick={() => handleClick('Ventas')}
          >
            Ventas
          </button>
        </div>
      </div>
      <div>
        <div className="title_wrapper">
          <button
            className="title_activator"
            onClick={() => handleClick('Compras')}
          >
            Compras
          </button>
        </div>
      </div>
    </nav>
  );
}
