import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const DeleteSale = () => {
  const navigate = useNavigate();
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    axios
      .delete(`https://localhost:7070/api/Sales/${id}`)
      .then((response) => {
        setRedirect(true);
      })
      .catch((error) => {
        setRedirect(true);
      });
  }, []);

  useEffect(() => {
    if (redirect) {
      navigate('/'); // Redirige a la página principal después de eliminar
    }
  }, [redirect, navigate]);

  return (
    <div>
      ELIMINAR
    </div>
  );
};

export default DeleteSale;
