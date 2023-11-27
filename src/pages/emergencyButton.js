import React, { useState } from 'react';
import './EmergencyContactButton.css'; // Crea un archivo CSS para estilos si es necesario

const EmergencyContactButton = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="emergency-contact-button">
      <button onClick={openModal}>Contactos de Emergencia</button>

      {isModalOpen && (
        <div className="emergency-modal">
          <h2>Contactos de Emergencia</h2>
          <p>Números de emergencia:</p>
          <ul>
            <li>911 - Emergencias generales</li>
            <li>123 - Policía</li>
            <li>456 - Bomberos</li>
            {/* Agrega más contactos según sea necesario */}
          </ul>
          
          <p>Contactos de grúas:</p>
          <ul>
            <li>789 - Grúa 24 horas</li>
            <li>321 - Asistencia en carretera</li>
            {/* Agrega más contactos de grúas según sea necesario */}
          </ul>

          <button onClick={closeModal}>Cerrar</button>
        </div>
      )}
    </div>
  );
};

export default EmergencyContactButton;
