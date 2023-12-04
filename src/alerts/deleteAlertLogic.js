import axios from 'axios';
import Swal from 'sweetalert2';

function deleteAlert(apiUrl, updateList, dato) {
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
      // En lugar de una solicitud DELETE, realiza una solicitud PUT para cambiar "activo" a false
      axios
        .put(`${apiUrl}`, { activo: false })
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
}

export default deleteAlert;
