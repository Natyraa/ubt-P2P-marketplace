import UserView from "./src/views/UserView.js";
import UserController from "./src/controllers/UserController.js";
import UserRole from "./src/enums/userRole.js";
// Example: Create and display a user

import ReviewController from "./src/controllers/ReviewController.js";
import ReviewView from "./src/views/ReviewView.js";
// Example: Create and display a user


import express from "express";
import TransactionStatus from "./src/enums/transactionStatus.js";
import TransactionController from "./src/controllers/TransactionController.js";
import PurchaseTransaction from "./src/models/PurchaseTransaction.js";
import RefundTransaction from "./src/models/RefundTransaction.js";
import DigitalPurchaseTransaction from "./src/models/DigitalPurchaseTransaction.js";

const app = express();
app.use(express.json());

async function createUser() {
  const userData = { 
    id: 2, 
    name: "Jane Doe", 
    email: "janedoe@example.com", 
    role: UserRole.BUYER, // Use enum for the role
    password: "securepassword123" 
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

async function run() {


   // ====== Create and Log Transactions ======
  // 1. Create a Regular Transaction
  const transactionData = {
    buyerId: 101,
    sellerId: 202,
    amount: 150.5,
    status: TransactionStatus.COMPLETED, // Use enum
  };

  const newTransaction = await TransactionController.createTransaction(transactionData);
  console.log("New Transaction Created:", newTransaction);

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

  // 4. Create a Refund Transaction
  const refundTransaction = new RefundTransaction(
    101, // buyerId
    202, // sellerId
    250.0, // amount
    "Product Defective" // refundReason
  );

  const newRefund = refundTransaction.createTransaction();
  console.log("Refund Transaction:", newRefund);

  // Create a Digital Purchase Transaction
  try {
    // Create a Digital Purchase Transaction
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
  } catch (error) {
    console.error("Error:", error.message);
  }
}

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
async function createProduct() {
  const productData = {
    id: 101,
    name: "Gaming Laptop",
    description: "High-performance gaming laptop",
    price: 1500,
    category: "Electronics",
    stockQuantity: 20,
    brand: "Alienware",
    warranty: 24,
  };

  const createdProduct = await ProductController.createProduct(productData);

  if (createdProduct) {
    ProductView.renderProduct(createdProduct);
  } else {
    const error = new Error("Unable to create product");
    ProductView.renderError(error);
  }
}

createProduct();
createReview()

//run();

