import EmailNotification from "./EmailNotification.js";

class TransactionalEmailNotification extends EmailNotification {
  constructor(userId, message, emailAddress, transactionDetails) {
    super(userId, message, emailAddress); // Call the parent constructor

    if (!transactionDetails || !transactionDetails.id || !transactionDetails.amount) {
      throw new Error("Transaction details must include 'id' and 'amount'.");
    }

    this.transactionDetails = transactionDetails; // Transaction-specific details
  }

  // Override the send method to include transaction details
  send() {
    console.log(
      `Transactional Email sent to ${this.emailAddress}:\n` +
      `Message: ${this.message}\n` +
      `Transaction ID: ${this.transactionDetails.id}\n` +
      `Transaction Amount: $${this.transactionDetails.amount}\n` +
      `Date: ${this.date}`
    );
    return true; // Simulate success
  }
}

export default TransactionalEmailNotification;
