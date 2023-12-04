import deleteAlertLogic from '../alerts/deleteAlertLogic';

const DeleteClient = (id, updateClientList) => {

  const url = `https://localhost:7070/api/Clients/delete/${id}`;
  deleteAlertLogic(url, updateClientList, 'El Cliente');
};

export default DeleteClient;
