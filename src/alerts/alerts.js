// alerts.js
import Swal from 'sweetalert2';
import axios from 'axios';

//Form Alerts
  //Form alert verifications
export const formAlert = (text) => {
  Swal.fire({
    icon: 'error',
    title: 'Error.',
    text: `${text}`,
    confirmButtonColor: '#333',
  });
};

  //Form alert add verification

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const deleteAlert = (apiUrl, updateList, dato) => {
  Swal.fire({
    title: '¿Estás seguro de que deseas eliminar?',
    text: 'No podrás corregir esto.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#333',
    confirmButtonTextColor: '#fddb3a',
    cancelButtonColor: '#d33',
    cancelButtonText: 'Cancelar',
    confirmButtonText: 'Sí, eliminar',
    footer: '<link rel="stylesheet" href="/globalAlert.css"></link> ',
    customClass: 'alert-button',
  }).then((result) => {
    if (result.isConfirmed) {
      axios
        .delete(`${apiUrl}`)
        .then((response) => {
          Swal.fire({
            title: 'Eliminado.',
            text: `${dato} Se eliminó con éxito.`,
            icon: 'success',
            footer: '<link rel="stylesheet" href="/globalAlert.css"></link> ',
            confirmButtonColor: '#333',
            confirmButtonTextColor: '#fddb3a',
            customClass: 'alert-button',
          });
          updateList();
        })
        .catch((error) => {
          Swal.fire({
            title: 'Error!',
            text: `Hubo un error al eliminar ${dato}`,
            icon: 'error',
            footer: '<link rel="stylesheet" href="/globalAlert.css"></link> ',
            confirmButtonColor: '#333',
            confirmButtonTextColor: '#fddb3a',
            customClass: 'alert-button',
          });
        });
    } else {
      Swal.fire({
        title: 'Eliminación Cancelada!',
        text: `Se canceló la eliminación de ${dato}`,
        icon: 'error',
        footer: '<link rel="stylesheet" href="/globalAlert.css"></link> ',
        confirmButtonColor: '#333',
        confirmButtonTextColor: '#fddb3a',
        customClass: 'alert-button',
      });
    }
  });
};
