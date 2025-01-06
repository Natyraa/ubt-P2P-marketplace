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