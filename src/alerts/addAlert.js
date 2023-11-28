
import Swal from 'sweetalert2';

function addAlert(alert) {
    Swal.fire({
      title: '¡Hubo un error!',
      text: alert,
      icon: 'warning',
      confirmButtonColor: '#333',
      confirmButtonTextColor: '#fddb3a',
      confirmButtonText: 'Aceptar',
      footer: '<link rel="stylesheet" href="/globalAlert.css"></link> ',
      customClass: 'alert-button',
  })
}

  export default addAlert;