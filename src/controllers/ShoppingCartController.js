import fs from "fs";
import path from "path";
import StandardShoppingCart from "../models/StandardShoppingCart.js";
import PremiumShoppingCart from "../models/PremiumShoppingCart.js";
import CartType from "../enums/CartType.js";
import TransactionController from "./TransactionController.js";
import TransactionalEmailNotification from "../models/TransactionalEmailNotification.js";

const dbFilePath = path.join(process.cwd(), "db.json");

class ShoppingCartController {
  static instance;
 //static nstance property will hold a single instance of the class
  static getInstance() {
    if (!ShoppingCartController.instance) {
      ShoppingCartController.instance = new ShoppingCartController();
    }
    return ShoppingCartController.instance;
  }

  constructor() {
    if (ShoppingCartController.instance) {
      throw new Error("Use ShoppingCartController.getInstance() instead of new.");
    }
  }

  static readDB() {
    const data = fs.readFileSync(dbFilePath, "utf-8");
    return JSON.parse(data);
  }

  static writeDB(data) {
    fs.writeFileSync(dbFilePath, JSON.stringify(data, null, 2));
  }

  getCart(userId) {
    const db = ShoppingCartController.readDB();
    const cart = db.carts.find((cart) => cart.userId === userId);
    return cart || { userId, items: [], cartType: CartType.STANDARD };
  }

  addItemToCart(userId, item, cartType = CartType.STANDARD) {
    const db = ShoppingCartController.readDB();
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
    ShoppingCartController.writeDB(db);

    return cart;
  }

  removeItemFromCart(userId, itemId) {
    const db = ShoppingCartController.readDB();
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
    ShoppingCartController.writeDB(db);

    return cart;
  }

  clearCart(userId) {
    const db = ShoppingCartController.readDB();
    const cartIndex = db.carts.findIndex((cart) => cart.userId === userId);

    if (cartIndex === -1) {
      throw new Error(`Cart for user ID ${userId} not found.`);
    }

    db.carts.splice(cartIndex, 1); // Remove the cart
    ShoppingCartController.writeDB(db);

    return true;
  }

  calculateCartTotal(userId) {
    const db = ShoppingCartController.readDB();
    const cart = db.carts.find((cart) => cart.userId === userId);

    if (!cart) {
      throw new Error(`Cart for user ID ${userId} not found.`);
    }

    return cart.items.reduce((total, item) => total + item.price, 0);
  }

  checkoutCart(userId) {
    const db = ShoppingCartController.readDB();
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

/**SingletonPAttern ensures that there is only one ShoppinCartController instance for managing the shoppin cart throught the entire application . All cart oprations are handled by the singleton instance , enduring consistent data and avoiding multiple instance of the cart logic  
 * getInstance() method check where the intance property already has a value (if an instance of the class has already been created . If the instance doesnt exist , it created a new ShoppingVartController instance and assigns it to ShoppingCartController.instance . )
 * Single Instance Per Application Session: In the Singleton Pattern, the instance of the class (ShoppingCartController in this case) is shared across the entire application. As long as the app is running, the same instance will be used.

Behavior for User Login/Logout:

If a user logs in, the shopping cart is created or retrieved as part of the singleton instance.
If the user adds items to the cart, they will be added to the same instance.
If the user logs out, depending on your app’s logic, you may want to clear or reset the cart instance (especially if the cart should be specific to a particular user session).
If the user logs in again, the same instance of the ShoppingCartController is used, and the cart will display any previous items (unless it was reset/cleared when the user logged out).
*/