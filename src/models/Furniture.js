import Product from "./Product";

// Furniture class inherits from Product
class Furniture extends Product {
    constructor(id, name, description, price, category, stockQuantity, dimensions, weight) {
      // Call the parent class constructor using 'super'.
      super(id, name, description, price, category, stockQuantity);
      this.dimensions = dimensions; 
      this.weight = weight;
    }
  
    // Override the getProductDetails()
    getProductDetails() {
      const { length, width, height } = this.dimensions;
      return `${super.getProductDetails()}\nDimensions: ${length}x${width}x${height} cm\nWeight: ${this.weight} kg`;
    }
  }
export default Furniture;