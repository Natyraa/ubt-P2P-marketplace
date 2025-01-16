import AbstractProduct from "../models/AbstractProduct.js";

class ProductView{
  static renderProduct (product) {
    if (product instanceof AbstractProduct) {
      console.log(product.displayDetails());
    } else {
      console.log('Invalid product listing');
    }
  }
  static renderProductError(error) {
    console.log(`Error: ${error.message}`);
  }
}
export default ProductView;

/**THis is a class , that is responsible for rendering product information and handling product-related errors
 * static method means that this can be instantiated without creating a class , can be called directly
 */