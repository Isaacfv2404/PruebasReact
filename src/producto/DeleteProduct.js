import deleteAlert from '../alerts/deleteAlert';

function DeleteProduct(id,updateProductList) {

  const url = `https://localhost:7070/api/Products/${id}`;
  deleteAlert(url,updateProductList,'el producto');
  
}

export default DeleteProduct
