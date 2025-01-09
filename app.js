import UserView from "./src/views/UserView.js";
import UserController from "./src/controllers/UserController.js";
import UserRole from "./src/enums/userRole.js";
// Example: Create and display a user
const inquirer = require('inquirer')
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
async function run() {


  const transactionData = {
    buyerId: 101,
    sellerId: 202,
    amount: 150.5,
    status: TransactionStatus.COMPLETED, // Use enum
  };
  
  const newTransaction = await TransactionController.createTransaction(transactionData);
  console.log("New Transaction Created:", newTransaction);
  
  // Send Transactional Email for Regular Transaction
  try {
    const regularTransactionEmail = new TransactionalEmailNotification(
      transactionData.buyerId, // User ID
      "Your regular transaction has been successfully completed!", // Message
      "buyer@example.com", // Placeholder email
      { id: newTransaction.id, amount: newTransaction.amount } // Transaction details
    );
    regularTransactionEmail.send();
  } catch (error) {
    console.error("Error sending email for Regular Transaction:", error.message);
  }
  
  // 2. Fetch and Display All Transactions
  const transactions = await TransactionController.getTransactions();
  console.log("All Transactions:", transactions);
  
  // 3. Create a Purchase Transaction
  const purchaseTransaction = new PurchaseTransaction(
    101, // buyerId
    202, // sellerId
    250.0, // amount
    { productName: "Laptop", productId: "LP123" } // productDetails
  );
  
  const newPurchase = purchaseTransaction.createTransaction();
  console.log("Purchase Transaction:", newPurchase);
  
  // Send Transactional Email for Purchase Transaction
  try {
    const purchaseTransactionEmail = new TransactionalEmailNotification(
      purchaseTransaction.buyerId, // User ID
      `Your purchase of ${purchaseTransaction.productDetails.productName} has been completed!`, // Message
      "buyer@example.com", // Placeholder email
      { id: newPurchase.id, amount: newPurchase.amount } // Transaction details
    );
    purchaseTransactionEmail.send();
  } catch (error) {
    console.error("Error sending email for Purchase Transaction:", error.message);
  }
  
  // 4. Create a Refund Transaction
  const refundTransaction = new RefundTransaction(
    101, // buyerId
    202, // sellerId
    250.0, // amount
    "Product Defective" // refundReason
  );
  
  const newRefund = refundTransaction.createTransaction();
  console.log("Refund Transaction:", newRefund);
  
  // Send Transactional Email for Refund Transaction
  try {
    const refundTransactionEmail = new TransactionalEmailNotification(
      refundTransaction.buyerId, // User ID
      `Your refund for the defective product has been processed. Reason: ${refundTransaction.refundReason}`, // Message
      "buyer@example.com", // Placeholder email
      { id: newRefund.id, amount: newRefund.amount } // Transaction details
    );
    refundTransactionEmail.send();
  } catch (error) {
    console.error("Error sending email for Refund Transaction:", error.message);
  }
  
  // 5. Create a Digital Purchase Transaction
  try {
    const digitalPurchase = new DigitalPurchaseTransaction(
      101, // buyerId
      202, // sellerId
      50.0, // amount
      { productName: "eBook", productId: "EB123" }, // productDetails
      "completed", // status
      "http://example.com/ebook-download" // downloadLink
    );
  
    // Validate the download link
    digitalPurchase.validateDownloadLink();
  
    // Simulate sending the download link via email
    digitalPurchase.sendDownloadLinkToEmail("leartagjoni18@gmail.com");
  
    // Create the transaction
    const newDigitalPurchase = digitalPurchase.createTransaction();
    console.log("Digital Purchase Transaction:", newDigitalPurchase);
  
    // Send Transactional Email for Digital Purchase Transaction
    const digitalPurchaseEmail = new TransactionalEmailNotification(
      digitalPurchase.buyerId, // User ID
      `Your digital purchase of ${digitalPurchase.productDetails.productName} is completed. You can download it here: ${digitalPurchase.downloadLink}`, // Message
      "leartagjoni18@gmail.com", // Email
      { id: newDigitalPurchase.id, amount: newDigitalPurchase.amount } // Transaction details
    );
    digitalPurchaseEmail.send();
  } catch (error) {
    console.error("Error creating or sending email for Digital Purchase Transaction:", error.message);
  }

  try {
    // 1. Create an Email Notification
    const emailNotification = NotificationController.createNotification(
      NotificationType.EMAIL, // Notification type
      101,                    // User ID
      "Your purchase has been completed!", // Message
      "user@example.com"      // Contact info (email address)
    );
    console.log("Email Notification Created:", emailNotification);

    // 2. Create an SMS Notification
    const smsNotification = NotificationController.createNotification(
      NotificationType.SMS,   // Notification type
      102,                    // User ID
      "Your refund has been processed.", // Message
      "1234567890"            // Contact info (phone number)
    );
    console.log("SMS Notification Created:", smsNotification);

    // 3. Fetch All Notifications
    const notifications = NotificationController.getNotifications();
    console.log("All Notifications:", notifications);

    // 4. Fetch a Notification by ID
    const notificationById = NotificationController.getNotificationById(1);
    console.log("Notification by ID (1):", notificationById);

    // 5. Delete a Notification by ID
    const deleted = NotificationController.deleteNotification(1);
    if (deleted) {
      console.log("Notification with ID 1 Deleted.");
    }

    // 6. Verify Notifications After Deletion
    const updatedNotifications = NotificationController.getNotifications();
    console.log("Notifications After Deletion:", updatedNotifications);
  } catch (error) {
    console.error("Error:", error.message);
  }

  try {
    // Add items to the cart
    const cart = ShoppingCartController.addItemToCart(101, {
      id: 1, // Product ID
      name: "Laptop",
      price: 1500,
    });
    console.log("Cart Before Checkout:", cart);
  
    // Perform checkout
    const transaction = ShoppingCartController.checkoutCart(101);
    console.log("Transaction from Checkout:", transaction);
  
    // Fetch and display the updated cart
    const updatedCart = ShoppingCartController.getCart(101);
    console.log("Cart After Checkout:", updatedCart);
  } catch (error) {
    console.error("Error during checkout:", error.message);
  }

}

//run();



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


