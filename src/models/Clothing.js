import Product from "./Product";

// Clothing class inherits from Product.
class Clothing extends Product {
    constructor(id, name, description, price, category, stockQuantity, size, material) {
      // Call the parent class constructor using 'super'.
      super(id, name, description, price, category, stockQuantity);
      this.size = size; 
      this.material = material;
    }
  
    // Override the getProductDetails() 
    getProductDetails() {
      return `${super.getProductDetails()}\nSize: ${this.size}\nMaterial: ${this.material}`;
    }
}
  export default Clothing;
