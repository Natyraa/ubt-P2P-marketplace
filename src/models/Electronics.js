import Product from "./Product";

// Electronics class inherits from Product.
class Electronics extends Product {
    constructor(id, name, description, price, category, stockQuantity, brand, warranty) {
      // Call the parent class constructor using 'super'.
      super(id, name, description, price, category, stockQuantity);
      this.brand = brand; 
      this.warranty = warranty;
    }
  
    // Override the getProductDetails() from Product abstract class
    getProductDetails() {
      return `${super.getProductDetails()}\nBrand: ${this.brand}\nWarranty: ${this.warranty} months`;
    }
}
export default Electronics;