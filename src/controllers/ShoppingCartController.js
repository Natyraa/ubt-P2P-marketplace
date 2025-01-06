import fs from "fs";
import path from "path";
import StandardShoppingCart from "../models/StandardShoppingCart.js";
import PremiumShoppingCart from "../models/PremiumShoppingCart.js";
import CartType from "../enums/CartType.js";

const dbFilePath = path.join(process.cwd(), "db.json");

class ShoppingCartController {
  static readDB() {
    const data = fs.readFileSync(dbFilePath);
    return JSON.parse(data);
  }

  static writeDB(data) {
    fs.writeFileSync(dbFilePath, JSON.stringify(data, null, 2));
  }

  // Get the cart for a user
  static getCart(userId) {
    const db = this.readDB();
    const cart = db.carts.find((cart) => cart.userId === userId);
    return cart || { userId, items: [] }; // Return an empty cart if not found
  }

  // Add an item to the user's cart
  static addItemToCart(userId, item, cartType = CartType.STANDARD) {
    const db = this.readDB();
    let cart = db.carts.find((cart) => cart.userId === userId);

    // If cart doesn't exist, create one
    if (!cart) {
      cart = { userId, items: [], cartType };
      db.carts.push(cart);
    }

    // Use appropriate cart type
    const shoppingCart =
      cartType === CartType.PREMIUM
        ? new PremiumShoppingCart(userId)
        : new StandardShoppingCart(userId);

    shoppingCart.items = cart.items; // Load existing items
    shoppingCart.addItem(item); // Add the new item

    cart.items = shoppingCart.items; // Update cart in DB
    this.writeDB(db);

    return cart;
  }

  // Remove an item from the user's cart
  static removeItemFromCart(userId, itemId) {
    const db = this.readDB();
    const cart = db.carts.find((cart) => cart.userId === userId);

    if (!cart) {
      throw new Error("Cart not found.");
    }

    const shoppingCart =
      cart.cartType === CartType.PREMIUM
        ? new PremiumShoppingCart(userId)
        : new StandardShoppingCart(userId);

    shoppingCart.items = cart.items; // Load existing items
    shoppingCart.removeItem(itemId); // Remove the item

    cart.items = shoppingCart.items; // Update cart in DB
    this.writeDB(db);

    return cart;
  }

  // Clear the user's cart
  static clearCart(userId) {
    const db = this.readDB();
    const cartIndex = db.carts.findIndex((cart) => cart.userId === userId);

    if (cartIndex === -1) {
      throw new Error("Cart not found.");
    }

    db.carts.splice(cartIndex, 1); // Remove the cart
    this.writeDB(db);

    return true;
  }

  // Calculate the total for the user's cart
  static calculateCartTotal(userId) {
    const db = this.readDB();
    const cart = db.carts.find((cart) => cart.userId === userId);

    if (!cart) {
      throw new Error("Cart not found.");
    }

    const shoppingCart =
      cart.cartType === CartType.PREMIUM
        ? new PremiumShoppingCart(userId)
        : new StandardShoppingCart(userId);

    shoppingCart.items = cart.items; // Load existing items
    return shoppingCart.calculateTotal();
  }
}

export default ShoppingCartController;
