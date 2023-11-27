
import deleteAlert from "../alerts/deleteAlert";
const DeleteSale = (id, updateSaleList) => {
  const url = `https://localhost:7070/api/Sales/${id}`;
  deleteAlert(url, updateSaleList, "la venta");
  
};

export default DeleteSale;
