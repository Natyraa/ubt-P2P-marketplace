import AbstractShoppingCart from "./AbstractShoppingCart.js";

class StandardShoppingCart extends AbstractShoppingCart {
  constructor(userId) {
    super(userId);
  }

  addItem(item) {
    if (!item || !item.id || !item.name || !item.price ) {
      throw new Error("Item must have 'id', 'name', and 'price'.");
    }
    this.items.push(item);
    console.log(`Item added: ${item.name}`);
  }

  removeItem(itemId) {
    const index = this.items.findIndex((item) => item.id === itemId);
    if (index === -1) {
      throw new Error(`Item with ID ${itemId} not found.`);
    }
    const removedItem = this.items.splice(index, 1)[0];
    console.log(`Item removed: ${removedItem.name}`);
  }

  calculateTotal() {
    return this.items.reduce((total, item) => total + item.price, 0);
  }

  clearCart() {
    this.items = [];
    console.log("Cart cleared.");
  }
}

export default StandardShoppingCart;
