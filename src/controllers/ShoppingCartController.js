import fs from "fs";
import path from "path";
import StandardShoppingCart from "../models/StandardShoppingCart.js";
import PremiumShoppingCart from "../models/PremiumShoppingCart.js";
import CartType from "../enums/CartType.js";
import Product from "../models/Product.js";
import Buyer from "../models/Buyer.js";
import Seller from "../models/Seller.js";
import TransactionController from "./TransactionController.js";
import TransactionalEmailNotification from "../models/TransactionalEmailNotification.js";

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
    const user = db.users.find((user) => user.id === userId);

    if (!user) {
      throw new Error(`User with ID ${userId} not found.`);
    }

    const cart = db.carts.find((cart) => cart.userId === userId);
    return cart || { userId, items: [], cartType: CartType.STANDARD };
  }

  // Add an item to the user's cart
  static addItemToCart(userId, item, cartType = CartType.STANDARD) {
    const db = this.readDB();
    const product = db.products.find((product) => product.id === item.id);

    if (!product) {
      throw new Error(`Product with ID ${item.id} not found.`);
    }

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
    shoppingCart.addItem(product); // Add the new item

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
  
//checkoutCart function description
// Validates the Cart. Ensures the cart exists and is not empty.
// Calculates the Total Amount. Sums up the prices of all items in the cart.
// Creates a transaction in the database for the total cart value.
// Sends a Notification. Sends a transactional email notification to the user.
// Empties the cart once the checkout is complete.

  static checkoutCart(userId) {
    const db = this.readDB();
    const cart = db.carts.find((cart) => cart.userId === userId);
  
    if (!cart || cart.items.length === 0) {
      throw new Error("Cart is empty or not found.");
    }
  
    // Calculate the total amount
    const totalAmount = cart.items.reduce((total, item) => total + item.price, 0);
  
    // Simulate finding the seller ID dynamically
    const sellerId = 202; // Placeholder seller ID; should be fetched based on products or logic
  
    // Create the transaction
    const transactionData = {
      buyerId: userId,
      sellerId: sellerId,
      amount: totalAmount,
      status: "completed",
    };
  
    const newTransaction = TransactionController.createTransaction(transactionData);
    console.log("Transaction Created for Checkout:", newTransaction);
  
    // Send a transactional email notification
    try {
      const emailNotification = new TransactionalEmailNotification(
        userId, // User ID
        "Your checkout was successful!", // Message
        "buyer@example.com", // Placeholder email (replace with logic to fetch user's email)
        { id: newTransaction.id, amount: newTransaction.amount } // Transaction details
      );
      emailNotification.send();
    } catch (error) {
      console.error("Error sending email notification:", error.message);
    }
  
    // Clear the cart after checkout
    this.clearCart(userId);
  
    return newTransaction;
  }
}

export default ShoppingCartController;
