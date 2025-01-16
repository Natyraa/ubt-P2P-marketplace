import UserView from "./src/views/UserView.js";
import UserController from "./src/controllers/UserController.js";
import UserRole from "./src/enums/userRole.js";
// Example: Create and display a user

import P2PController from "./src/controllers/p2pController.js";
import P2PView  from "./src/views/p2pView.js";
import ReviewController from "./src/controllers/ReviewController.js";
import ReviewView from "./src/views/ReviewView.js";
// Example: Create and display a user
import ProductController from "./src/controllers/ProductController.js";
import ProductView from "./src/views/ProductView.js";
import TransactionStatus from "./src/enums/transactionStatus.js";
import TransactionController from "./src/controllers/TransactionController.js";
import PurchaseTransaction from "./src/models/PurchaseTransaction.js";
import RefundTransaction from "./src/models/RefundTransaction.js";
import DigitalPurchaseTransaction from "./src/models/DigitalPurchaseTransaction.js";
import NotificationController from "./src/controllers/NotificationController.js";
import NotificationType from "./src/enums/NotificationType.js";
import TransactionalEmailNotification from "./src/models/TransactionalEmailNotification.js";
import ShoppingCartController from "./src/controllers/ShoppingCartController.js";
import NotificationSubject from "./src/subjects/NotificationSubject.js";
import EmailObserver from "./src/observers/EmailObserver.js";
import SMSObserver from "./src/observers/SMSObserver.js";
import CartType from "./src/enums/CartType.js";


async function createUser() {
  // const userData = { 
  //   id: 2, 
  //   name: "Jane Doe", 
  //   email: "janedoe@example.com", 
  //   role: UserRole.BUYER, // Use enum for the role
  //   password: "securepassword123" 
  // };
   const userData = { 
    id: 2, 
    name: "Jane Doe", 
    email: "janedoe@example.com", 
    role: UserRole.SELLER, // Use enum for the role
    password: "securepassword123",
    // premiumBenefits: "Priority Support",

  };
  const createdUser = await UserController.createUser(userData);

  // Render user information if user is created successfully
  if (createdUser) {
    // createdUser.wishlist.addItem("Smartphone");
    // createdUser.wishlist.addItem("Laptop");
    UserView.renderUser(createdUser);
  
  }

  // If error, render the error message
  else {
    const error = new Error("Unable to create user");
    UserView.renderError(error);
  } 
  const user2 = { name: "John Smith", id: 3 }; // Sample second user

  // Use P2PView to display connection status before initiating the connection
  //  P2PView.displayConnectionStatus(createdUser, user2);

  // // Use P2PController to initiate the connection
  // P2PController.initiateConnection(createdUser, user2);
}
createUser()
async function createProductList () {
  const productData = {
    id: 1,
    productName: "Apple",
    description: "This is an apple",
    price: 14
  }
  const createProductList = await ProductController.createProductListing(productData)
  if (createProductList) {
    ProductView.renderProduct(createProductList)
  } else {
    const error = "Unable to create Product Listing"
    ProductView.renderProductError(error)
  }
}
async function createReview() {
  const reviewData = {
    id: 1,
    reviewerId: 101,
    revieweeId: 202,
    rating: 5,
    comment: "Excellent Product",
    productId: 1001,
  }
  const createdReview = await ReviewController.createReview(reviewData)
  
  if (createdReview) {
    ReviewView.renderReview(createdReview)
  } else {
    return `Failed to create review`
  }
}

//createUser();
// createReview()
// createProductList()
async function run() {

async function createRegularTransaction(notificationController, buyer) {
  const transactionData = {
    buyerId: buyer.id,
    sellerId: 1,
    amount: 150.5,
    status: TransactionStatus.COMPLETED,
  };

  const newTransaction = await TransactionController.createTransaction(transactionData);
  console.log("New Transaction Created:", newTransaction);

  const message = `Your regular transaction (ID: ${newTransaction.id}) for $${newTransaction.amount} has been successfully completed!`;

  // Notify observers
  notificationController.notificationSubject.notifyObservers({
    type: "email",
    contactInfo: buyer.email,
    message,
  });
}

async function createPurchaseTransaction(notificationController, buyer) {
  const purchaseTransaction = new PurchaseTransaction(
    buyer.id,
    202,
    250.0,
    { productName: "Laptop", productId: "LP123" }
  );

  const newPurchase = purchaseTransaction.createTransaction();
  console.log("Purchase Transaction:", newPurchase);

  const message = `Your purchase of ${purchaseTransaction.productDetails.productName} (ID: ${purchaseTransaction.productDetails.productId}) has been completed successfully!`;

  // Notify observers
  notificationController.notificationSubject.notifyObservers({
    type: "email",
    contactInfo: buyer.email,
    message,
  });
}

async function createRefundTransaction(notificationController, buyer) {
  const refundTransaction = new RefundTransaction(
    buyer.id,
    202,
    250.0,
    "Product Defective"
  );

  const newRefund = refundTransaction.createTransaction();
  console.log("Refund Transaction:", newRefund);

  const message = `Your refund for ${refundTransaction.refundReason} has been processed. Amount: $${refundTransaction.amount}.`;

  // Notify observers
  notificationController.notificationSubject.notifyObservers({
    type: "sms",
    contactInfo: buyer.phoneNumber,
    message,
  });
}

async function createDigitalPurchaseTransaction(notificationController, buyer) {
  try {
    const digitalPurchase = new DigitalPurchaseTransaction(
      buyer.id,
      202,
      50.0,
      { productName: "eBook", productId: "EB123" },
      "completed",
      "http://example.com/ebook-download"
    );

    digitalPurchase.validateDownloadLink();
    digitalPurchase.sendDownloadLinkToEmail(buyer.email);

    const newDigitalPurchase = digitalPurchase.createTransaction();
    console.log("Digital Purchase Transaction:", newDigitalPurchase);

    const message = `Your digital purchase of ${digitalPurchase.productDetails.productName} (ID: ${digitalPurchase.productDetails.productId}) is completed. You can download it here: ${digitalPurchase.downloadLink}.`;

    // Notify observers
    notificationController.notificationSubject.notifyObservers({
      type: "email",
      contactInfo: buyer.email,
      message,
    });
  } catch (error) {
    console.error("Error creating Digital Purchase Transaction:", error.message);
  }
}

async function shoppingCartOperations(notificationController, buyer) {
  try {
    console.log("\n--- Shopping Cart Operations ---");

    // Get the Singleton instance of ShoppingCartController
    const shoppingCartController = ShoppingCartController.getInstance();

    // Step 1: Add an item to the cart
    console.log("Adding Item to Cart...");
    const cart = shoppingCartController.addItemToCart(buyer.id, {
      id: 2,
      name: "Laptop",
      price: 1500,
    });
    console.log("Cart After Adding Item:", cart);

    // Step 2: Calculate total cart value
    const total = shoppingCartController.calculateCartTotal(buyer.id);
    console.log("Cart Total:", `$${total}`);

    // Step 3: Get and display the cart details
    const retrievedCart = shoppingCartController.getCart(buyer.id);
    console.log("Retrieved Cart Details:", retrievedCart);

    // Step 4: Remove an item from the cart (demonstrating functionality)
    console.log("Removing Item from Cart...");
    shoppingCartController.removeItemFromCart(buyer.id, 1);

    // Step 5: Clear the cart (optional, demonstrating functionality)
    console.log("Clearing the Cart...");
    shoppingCartController.clearCart(buyer.id);

    // Step 6: Add items again and proceed to checkout
    shoppingCartController.addItemToCart(buyer.id, {
      id: 1,
      name: "Laptop",
      price: 1500,
    });
    const transaction = shoppingCartController.checkoutCart(buyer.id);
    console.log("Transaction After Checkout:", transaction);

    // Step 7: Notify observers about the successful checkout
    const message = `Your checkout is successful! Transaction ID: ${transaction.id}, Total: $${transaction.amount}.`;
    notificationController.notificationSubject.notifyObservers({
      type: "email",
      contactInfo: buyer.email,
      message,
    });
  } catch (error) {
    console.error("Error during shopping cart operations:", error.message);
  }
}


// Main function orchestrating all the above
async function run() {
  const notificationController = new NotificationController();

  // Define and attach observers
  const emailObserver = {
    update: (notification) => {
      console.log(`Observer: Sending Email to ${notification.contactInfo}: ${notification.message}`);
    },
  };

  const smsObserver = {
    update: (notification) => {
      console.log(`Observer: Sending SMS to ${notification.contactInfo}: ${notification.message}`);
    },
  };

  notificationController.notificationSubject.attach(emailObserver);
  notificationController.notificationSubject.attach(smsObserver);

  // Define buyer data
  const buyer = {
    id: 101,
    email: "buyer@example.com",
    phoneNumber: "1234567890",
  };

  console.log("Buyer Object:", buyer);

  try {
    console.log("\n--- Creating Regular Transaction ---");
    await createRegularTransaction(notificationController, buyer);

    console.log("\n--- Creating Purchase Transaction ---");
    await createPurchaseTransaction(notificationController, buyer);

    console.log("\n--- Creating Refund Transaction ---");
    await createRefundTransaction(notificationController, buyer);

    console.log("\n--- Creating Digital Purchase Transaction ---");
    await createDigitalPurchaseTransaction(notificationController, buyer);

    console.log("\n--- Shopping Cart Operations ---");
    await shoppingCartOperations(notificationController, buyer);

    console.log("\n--- Handling Additional Notifications ---");
    await handleNotifications(notificationController, buyer);

    console.log("\n--- All Operations Completed Successfully ---");
  } catch (error) {
    console.error("\nError during execution:", error.message);
  }
}
}
// run()


/**The run function orchestrates the entire process by calling various functions to simulate transactions and notify the buyer . It handles shopping cart operations like adding/removing items checking out , and notifying the buyer about succesffull action . It includes the buyer's details like id email and phoneNumber to show how notification are sent 
 * createRegularTRansaction , createPurchaeTransaticon , createREfundTransation and createDigitialPurchaseTransacation
*/
