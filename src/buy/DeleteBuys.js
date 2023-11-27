
import deleteAlert from "../alerts/deleteAlert";
const DeleteBuys = (id, updateBuysList) => {
  const url = `https://localhost:7070/api/Buys/${id}`;
  deleteAlert(url, updateBuysList, "la Compra");
  
};

export default DeleteBuys;