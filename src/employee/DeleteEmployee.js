import  deleteAlertLogic  from '../alerts/deleteAlertLogic';

const DeleteEmployee = (id, updateEmployeeList) => {

  const url = `https://localhost:7070/api/Employees/delete/${id}`;
  deleteAlertLogic(url, updateEmployeeList, 'El empleado');
};

export default DeleteEmployee;
