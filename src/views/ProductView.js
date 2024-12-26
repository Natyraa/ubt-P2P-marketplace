import Product from "../models/Product";

class ProductView {
    static renderProduct(product) {
      if (product instanceof Product) {
        console.log(product.getProductDetails());
      } else {
        console.log("Invalid product");
      }
    }
  
    static renderProducts(products) {
      if (Array.isArray(products)) {
        products.forEach((product) => this.renderProduct(product));
      } else {
        console.log("Invalid product list");
      }
    }
  
    static renderError(error) {
      console.log(`Error: ${error.message}`);
    }
  }
  
  export default ProductView;
  
  /** Static methods allow us to call these methods directly on the class itself without creating an instance. */
  
