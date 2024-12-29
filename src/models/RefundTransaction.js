import Transaction from "./Transaction.js";

class RefundTransaction extends Transaction {
  constructor(buyerId, sellerId, amount, refundReason, status = "refunded") {
    super(buyerId, sellerId, amount, status);
    this.refundReason = refundReason; // Add specific property for refunds
  }

  // Override or add specific methods
  createTransaction() {
    return {
      ...this,
      type: "RefundTransaction",
      date: new Date().toISOString(),
    };
  }
}

export default RefundTransaction;
