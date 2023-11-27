import Swal from 'sweetalert2';

function confirmAlert() {
    Swal.fire({
      title: '¡Agregación con éxito!',
      text: 'Los datos de la tabla se actualizaron correctamente',
      icon: 'success',
      confirmButtonColor: '#333',
      confirmButtonTextColor: '#fddb3a',
      confirmButtonText: 'Aceptar',
      footer: '<link rel="stylesheet" href="/globalAlert.css"></link> ',
      customClass: 'alert-button',
    })
  }

  export default confirmAlert;