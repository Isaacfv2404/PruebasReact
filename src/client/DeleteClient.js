import deleteAlert from '../alerts/deleteAlert';

const DeleteClient = (id, updateClientList) => {

  const url = `https://localhost:7070/api/Clients/${id}`;
  deleteAlert(url, updateClientList, 'El Cliente');
};

export default DeleteClient;
