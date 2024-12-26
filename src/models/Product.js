//Product is an abstract class that serves as a blueplrint for all product types
class Product {
    constructor(id, name, description, price, category, stockQuantity) {
      if (new.target === Product) {
        throw new Error("Cannot instantiate an abstract class.");
      }
      this.id = id;
      this.name = name;
      this.description = description;
      this.price = price;
      this.category = category;
      this.stockQuantity = stockQuantity;
    }
  
    updateStock(quantity) {
      if (quantity < 0 && Math.abs(quantity) > this.stockQuantity) {
        throw new Error("Insufficient stock to fulfill this request.");
      }
      this.stockQuantity += quantity;
      return `Stock updated. Current stock for product '${this.name}': ${this.stockQuantity}.`;
    }
  
    getProductDetails() {
      return `Product ID: ${this.id}\nName: ${this.name}\nDescription: ${this.description}\nPrice: $${this.price.toFixed(2)}\nCategory: ${this.category}\nStock Quantity: ${this.stockQuantity}`;
    }
  }
  
  export default Product;
  