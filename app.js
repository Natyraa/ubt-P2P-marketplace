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
import express from "express";
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


const app = express();
app.use(express.json());

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
    role: UserRole.PREMIUM_BUYER, // Use enum for the role
    password: "securepassword123",
    premiumBenefits: "premium benefits",

  };
  const createdUser = await UserController.createUser(userData);

  // Render user information if user is created successfully
  if (createdUser) {
    createdUser.wishlist.addItem("Smartphone");
    createdUser.wishlist.addItem("Laptop");
    UserView.renderUser(createdUser);
  
  }

  // If error, render the error message
  else {
    const error = new Error("Unable to create user");
    UserView.renderError(error);
  } 
  const user2 = { name: "John Smith", id: 3 }; // Sample second user

  // Use P2PView to display connection status before initiating the connection
  P2PView.displayConnectionStatus(createdUser, user2);

  // Use P2PController to initiate the connection
  P2PController.initiateConnection(createdUser, user2);
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
createReview()
createProductList()

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

    // Step 1: Add an item to the cart
    console.log("Adding Item to Cart...");
    const cart = ShoppingCartController.addItemToCart(buyer.id, {
      id: 2,
      name: "Laptop",
      price: 1500,
    });
    console.log("Cart After Adding Item:", cart);

    // Step 2: Calculate total cart value
    const total = ShoppingCartController.calculateCartTotal(buyer.id);
    console.log("Cart Total:", `$${total}`);

    // Step 3: Get and display the cart details
    const retrievedCart = ShoppingCartController.getCart(buyer.id);
    console.log("Retrieved Cart Details:", retrievedCart);

    // Step 4: Remove an item from the cart (demonstrating functionality)
    console.log("Removing Item from Cart...");
    ShoppingCartController.removeItemFromCart(buyer.id, 1);

    // Step 5: Clear the cart (optional, demonstrating functionality)
    console.log("Clearing the Cart...");
    ShoppingCartController.clearCart(buyer.id);

    // Step 6: Add items again and proceed to checkout
    ShoppingCartController.addItemToCart(buyer.id, {
      id: 1,
      name: "Laptop",
      price: 1500,
    });
    const transaction = ShoppingCartController.checkoutCart(buyer.id);
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

async function handleNotifications(notificationController, buyer) {
  try {
    // Notify observers for Email
    notificationController.notificationSubject.notifyObservers({
      type: "email",
      contactInfo: buyer.email,
      message: "Your purchase has been completed successfully!",
    });

    // Notify observers for SMS
    notificationController.notificationSubject.notifyObservers({
      type: "sms",
      contactInfo: buyer.phoneNumber,
      message: "Your refund has been processed. Thank you!",
    });
  } catch (error) {
    console.error("Error handling notifications:", error.message);
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

run();


// async function run() {
//   const notificationController = new NotificationController(); // Initialize NotificationController

//   try {
//     // Fetch buyer data (replace with actual function to retrieve buyer details)
//     const buyer = {
//       id: 101,
//       email: "buyer@example.com",
//       phoneNumber: "1234567890",
//     };

//     // 1. Create a Regular Transaction
//     const transactionData = {
//       buyerId: buyer.id,
//       sellerId: 202,
//       amount: 150.5,
//       status: TransactionStatus.COMPLETED, // Use enum
//     };

//     const newTransaction = await TransactionController.createTransaction(transactionData);
//     console.log("New Transaction Created:", newTransaction);

//     // Notify observers for a Regular Transaction
//     notificationController.createNotification(
//       "email",
//       { email: buyer.email, phoneNumber: buyer.phoneNumber }, // Pass both email and phoneNumber
//       "Your regular transaction has been successfully completed!"
//     );

//     // 2. Fetch and Display All Transactions
//     const transactions = await TransactionController.getTransactions();
//     console.log("All Transactions:", transactions);

//     // 3. Create a Purchase Transaction
//     const purchaseTransaction = new PurchaseTransaction(
//       buyer.id, // Fetch buyerId dynamically
//       202, // sellerId
//       250.0, // amount
//       { productName: "Laptop", productId: "LP123" } // productDetails
//     );

//     const newPurchase = purchaseTransaction.createTransaction();
//     console.log("Purchase Transaction:", newPurchase);

//     // Notify observers for a Purchase Transaction
//     notificationController.createNotification(
//       "email",
//       buyer.email, // Fetch buyer's email dynamically
//       `Your purchase of ${purchaseTransaction.productDetails.productName} has been completed!`
//     );

//     // 4. Create a Refund Transaction
//     const refundTransaction = new RefundTransaction(
//       buyer.id, // Fetch buyerId dynamically
//       202, // sellerId
//       250.0, // amount
//       "Product Defective" // refundReason
//     );

//     const newRefund = refundTransaction.createTransaction();
//     console.log("Refund Transaction:", newRefund);

//     // Notify observers for a Refund Transaction
//     notificationController.createNotification(
//       "sms",
//       { email: null, phoneNumber: buyer.phoneNumber }, // Only pass phoneNumber for SMS
//       `Your refund for the defective product has been processed. Reason: ${refundTransaction.refundReason}`
//     );

//     // 5. Create a Digital Purchase Transaction
//     const digitalPurchase = new DigitalPurchaseTransaction(
//       buyer.id, // Fetch buyerId dynamically
//       202, // sellerId
//       50.0, // amount
//       { productName: "eBook", productId: "EB123" }, // productDetails
//       "completed", // status
//       "http://example.com/ebook-download" // downloadLink
//     );

//     // Validate the download link
//     digitalPurchase.validateDownloadLink();

//     // Simulate sending the download link via email
//     digitalPurchase.sendDownloadLinkToEmail(buyer.email);

//     // Create the transaction
//     const newDigitalPurchase = digitalPurchase.createTransaction();
//     console.log("Digital Purchase Transaction:", newDigitalPurchase);

//     // Notify observers for a Digital Purchase Transaction
//     notificationController.createNotification(
//       "email",
//       buyer.email,
//       `Your digital purchase of ${digitalPurchase.productDetails.productName} is completed. You can download it here: ${digitalPurchase.downloadLink}`
//     );
//   } catch (error) {
//     console.error("Error:", error.message);
//   }

//   try {
//     // 6. Shopping Cart Operations
//     const cart = ShoppingCartController.addItemToCart(buyer.id, {
//       id: 1, // Product ID
//       name: "Laptop",
//       price: 1500,
//     });
//     console.log("Cart Before Checkout:", cart);

//     // Perform checkout
//     const transaction = ShoppingCartController.checkoutCart(buyer.id);
//     console.log("Transaction from Checkout:", transaction);

//     // Fetch and display the updated cart
//     const updatedCart = ShoppingCartController.getCart(buyer.id);
//     console.log("Cart After Checkout:", updatedCart);
//   } catch (error) {
//     console.error("Error during checkout:", error.message);
//   }

//   // Example 1: Send Email Notification
//   notificationController.createNotification(
//     "email",
//     buyer.email,
//     "Your purchase has been completed successfully!"
//   );

//   // Example 2: Send SMS Notification
//   notificationController.createNotification(
//     "sms",
//     buyer.phoneNumber,
//     "Your refund has been processed. Thank you!"
//   );
// }

// run();



// Global error handler
app.use((err, req, res, next) => {
  console.error("Error:", err.message);

  res.status(500).json({
    success: false,
    message: "An unexpected error occurred.",
    details: err.message,
  });
});


// ====== RESTful API Endpoints ======

// GET all transactions
app.get("/transactions", (req, res) => {
  const transactions = TransactionController.getTransactions();
  res.status(200).json({
    success: true,
    data: transactions,
    message: "Transactions retrieved successfully",
  });
});

// GET a single transaction by ID
app.get("/transactions/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const transaction = TransactionController.getTransactionById(id);
  if (transaction) {
    res.status(200).json({
      success: true,
      data: transaction,
      message: "Transaction retrieved successfully",
    });
  } else {
    res.status(404).json({
      success: false,
      message: "Transaction not found",
    });
  }
});

// POST create a new transaction
app.post("/transactions", (req, res) => {
  const { buyerId, sellerId, amount, status } = req.body;

  // Validate status
  if (!Object.values(TransactionStatus).includes(status)) {
    return res.status(400).json({
      success: false,
      message: "Invalid transaction status",
    });
  }

  if (!buyerId || !sellerId || !amount) {
    return res.status(400).json({
      success: false,
      message: "Missing required fields",
    });
  }

  const newTransaction = TransactionController.createTransaction({
    buyerId,
    sellerId,
    amount,
    status,
  });

  res.status(201).json({
    success: true,
    data: newTransaction,
    message: "Transaction created successfully",
  });
});

// PUT update a transaction by ID
app.put("/transactions/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const updatedTransaction = TransactionController.updateTransaction(id, req.body);

  if (updatedTransaction) {
    res.status(200).json({
      success: true,
      data: updatedTransaction,
      message: "Transaction updated successfully",
    });
  } else {
    res.status(404).json({
      success: false,
      message: "Transaction not found",
    });
  }
});

// DELETE a transaction by ID
app.delete("/transactions/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const success = TransactionController.deleteTransaction(id);

  if (success) {
    res.status(204).send(); // No content for successful deletion
  } else {
    res.status(404).json({
      success: false,
      message: "Transaction not found",
    });
  }
});

// ====== Start the Server ======
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

app.post("/digital-purchases", (req, res) => {
  const { buyerId, sellerId, amount, productDetails, status, downloadLink, email } = req.body;

  // Validate input
  if (!buyerId || !sellerId || !amount || !productDetails || !downloadLink || !email) {
    return res.status(400).json({ success: false, message: "Missing required fields" });
  }

  try {
    // Create a new DigitalPurchaseTransaction
    const digitalPurchase = new DigitalPurchaseTransaction(
      buyerId,
      sellerId,
      amount,
      productDetails,
      status,
      downloadLink
    );

    // Validate the download link and send it via email
    digitalPurchase.validateDownloadLink();
    digitalPurchase.sendDownloadLinkToEmail(email);

    // Add to transactions
    const newDigitalPurchase = digitalPurchase.createTransaction();

    res.status(201).json({
      success: true,
      data: newDigitalPurchase,
      message: "Digital Purchase Transaction created and email sent successfully",
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});


