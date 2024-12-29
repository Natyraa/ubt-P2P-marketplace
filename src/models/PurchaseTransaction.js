import Transaction from "./Transaction.js";

class PurchaseTransaction extends Transaction {
  constructor(buyerId, sellerId, amount, productDetails, status = "pending") {
    super(buyerId, sellerId, amount, status);
    this.productDetails = productDetails; // Add specific property for purchases
  }

  // Override or add specific methods
  createTransaction() {
    return {
      ...this,
      type: "PurchaseTransaction",
      date: new Date().toISOString(),
    };
  }
}

export default PurchaseTransaction;
