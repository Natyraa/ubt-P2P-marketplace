import fs from "fs";
import path from "path";
import StandardShoppingCart from "../models/StandardShoppingCart.js";
import PremiumShoppingCart from "../models/PremiumShoppingCart.js";
import CartType from "../enums/CartType.js";
import TransactionController from "./TransactionController.js";
import TransactionalEmailNotification from "../models/TransactionalEmailNotification.js";

const dbFilePath = path.join(process.cwd(), "db.json");

class ShoppingCartController {
  static readDB() {
    const data = fs.readFileSync(dbFilePath, "utf-8");
    return JSON.parse(data);
  }

  static writeDB(data) {
    fs.writeFileSync(dbFilePath, JSON.stringify(data, null, 2));
  }

  // Get the cart for a user
  static getCart(userId) {
    const db = this.readDB();
    const cart = db.carts.find((cart) => cart.userId === userId);
    return cart || { userId, items: [], cartType: CartType.STANDARD };
  }

  // Add an item to the user's cart
  static addItemToCart(userId, item, cartType = CartType.STANDARD) {
    const db = this.readDB();
    const product = db.product.find((product) => product.id === item.id);

    if (!product) {
      throw new Error(`Product with ID ${item.id} not found.`);
    }

    let cart = db.carts.find((cart) => cart.userId === userId);
    if (!cart) {
      cart = { userId, items: [], cartType };
      db.carts.push(cart);
    }

    const shoppingCart =
      cartType === CartType.PREMIUM
        ? new PremiumShoppingCart(userId)
        : new StandardShoppingCart(userId);

    shoppingCart.items = cart.items;
    shoppingCart.addItem(product);

    cart.items = shoppingCart.items;
    this.writeDB(db);

    return cart;
  }

  // Remove an item from the user's cart
  static removeItemFromCart(userId, itemId) {
    const db = this.readDB();
    const cart = db.carts.find((cart) => cart.userId === userId);

    if (!cart) {
      throw new Error(`Cart for user ID ${userId} not found.`);
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
      throw new Error(`Cart for user ID ${userId} not found.`);
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
      throw new Error(`Cart for user ID ${userId} not found.`);
    }

    return cart.items.reduce((total, item) => total + item.price, 0);
  }

  // Checkout the user's cart
  static checkoutCart(userId) {
    const db = this.readDB();
    const cart = db.carts.find((cart) => cart.userId === userId);

    if (!cart || cart.items.length === 0) {
      throw new Error("Cart is empty or not found.");
    }

    const totalAmount = cart.items.reduce((total, item) => total + item.price, 0);
    const sellerId = cart.items[0]?.sellerId || 202;

    const transactionData = {
      buyerId: userId,
      sellerId,
      amount: totalAmount,
      status: "completed",
    };

    const newTransaction = TransactionController.createTransaction(transactionData);

    const user = db.users.find((user) => user.id === userId);
    if (!user) {
      throw new Error(`User with ID ${userId} not found.`);
    }

    try {
      const emailNotification = new TransactionalEmailNotification(
        userId,
        "Your checkout was successful!",
        user.email,
        { id: newTransaction.id, amount: newTransaction.amount }
      );
      emailNotification.send();
    } catch (error) {
      console.error("Error sending email notification:", error.message);
    }

    this.clearCart(userId);

    return newTransaction;
  }
}

export default ShoppingCartController;