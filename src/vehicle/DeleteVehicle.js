import deleteAlertLogic from '../alerts/deleteAlertLogic';

const DeleteVehicle = (id, updateVehicleList) => {

  const url = `https://localhost:7070/api/Vehicles/delete/${id}`;
  deleteAlertLogic(url, updateVehicleList, 'el vehículo');
};

export default DeleteVehicle;
