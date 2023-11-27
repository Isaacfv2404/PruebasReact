import deleteAlert from '../alerts/deleteAlert';

const DeleteBranch = (id, updateBranchList) => {

  const url = `https://localhost:7070/api/Branches/${id}`;
  deleteAlert(url, updateBranchList, 'La Sucursal');
};

export default DeleteBranch;