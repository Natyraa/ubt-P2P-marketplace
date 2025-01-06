class AbstractShoppingCart {
    constructor(userId) {
      if (new.target === AbstractShoppingCart) {
        throw new Error("Cannot instantiate an abstract class.");
      }
  
      if (!userId) {
        throw new Error("User ID is required to create a shopping cart.");
      }
  
      this.userId = userId; // User ID owning the cart
      this.items = []; // Array of items in the cart
    }
  
    // Abstract method to add an item to the cart
    addItem(item) {
      throw new Error("Method 'addItem()' must be implemented.");
    }
  
    // Abstract method to remove an item from the cart
    removeItem(itemId) {
      throw new Error("Method 'removeItem()' must be implemented.");
    }
  
    // Abstract method to calculate the total cost of the cart
    calculateTotal() {
      throw new Error("Method 'calculateTotal()' must be implemented.");
    }
  
    // Abstract method to clear the cart
    clearCart() {
      throw new Error("Method 'clearCart()' must be implemented.");
    }
  }
  
  export default AbstractShoppingCart;
  