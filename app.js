import UserView from "./src/views/UserView.js";
import UserController from "./src/controllers/UserController.js";
import UserRole from "./src/enums/userRole.js";
// Example: Create and display a user

import express from "express";
import TransactionStatus from "./src/enums/transactionStatus.js";
import TransactionController from "./src/controllers/TransactionController.js";
import PurchaseTransaction from "./src/models/PurchaseTransaction.js";
import RefundTransaction from "./src/models/RefundTransaction.js";

const app = express();
app.use(express.json());

async function run() {
  const userData = { id: 2, name: "Jon Doe", email: "janedoe@example.com",  role: "Seller" ,password: "securepassword123"};
  const createdUser = await UserController.createUser(userData);

  // Render user information if user is created successfully
  if (createdUser) {
    UserView.renderUser(createdUser);
  }

  // If error, render the error message
  else {
    const error = new Error("Unable to create user");
    UserView.renderError(error);
  }
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
}

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


run();

