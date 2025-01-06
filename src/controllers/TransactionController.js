import fs from "fs";
import path from "path";
import Transaction from "../models/Transaction.js";
import TransactionalEmailNotification from "../models/TransactionalEmailNotification.js";

import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dbFilePath = path.join(__dirname, "../../db.json");

class TransactionController extends Transaction {
  constructor(buyerId, sellerId, amount, status, date) {
    super(buyerId, sellerId, amount, status, date);
  }

  // Helper to read/write db.json
  static readDB() {
    return JSON.parse(fs.readFileSync(dbFilePath, "utf-8"));
  }

  static writeDB(data) {
    fs.writeFileSync(dbFilePath, JSON.stringify(data, null, 2), "utf-8");
  }

  // Implementing abstract methods
  static createTransaction(transactionData) {
    const db = this.readDB();
    const transactions = db.transactions || [];

    const newTransaction = {
      id: transactions.length + 1, // Auto-increment ID
      ...transactionData,
      date: new Date().toISOString(),
    };

    transactions.push(newTransaction);
    db.transactions = transactions;
    this.writeDB(db);

    // Send a transactional email notification
    const emailNotification = new TransactionalEmailNotification(
      transactionData.buyerId, // User ID (buyer)
      "Your transaction has been successfully created!", // Message
      "buyer@example.com", // Placeholder email (connect real email later)
      {
        id: newTransaction.id,
        amount: newTransaction.amount,
      } // Transaction details
    );
    emailNotification.send();

    return newTransaction;
  }

  static getTransactions() {
    const db = this.readDB();
    return db.transactions || []; // Return transactions or an empty array
  }

  static getTransactionById(id) {
    const db = this.readDB();
    return db.transactions.find((t) => t.id === id);
  }

  static updateTransaction(id, updatedData) {
    const db = this.readDB();
    const transactionIndex = db.transactions.findIndex((t) => t.id === id);
    if (transactionIndex !== -1) {
      db.transactions[transactionIndex] = { id, ...updatedData };
      this.writeDB(db);
      return db.transactions[transactionIndex];
    }
    return null;
  }

  static deleteTransaction(id) {
    const db = this.readDB();
    const updatedTransactions = db.transactions.filter((t) => t.id !== id);
    if (updatedTransactions.length !== db.transactions.length) {
      db.transactions = updatedTransactions;
      this.writeDB(db);
      return true;
    }
    return false;
  }
}

export default TransactionController;
