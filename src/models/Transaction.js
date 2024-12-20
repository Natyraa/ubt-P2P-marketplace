class Transaction {
    constructor(buyerId, sellerId, amount, status = "pending", date = new Date().toISOString()) {
      if (this.constructor === Transaction) {
        throw new Error("Abstract class 'Transaction' cannot be instantiated directly.");
      }
      this.buyerId = buyerId;
      this.sellerId = sellerId;
      this.amount = amount;
      this.status = status;
      this.date = date;
    }
  
    // Abstract methods
    createTransaction() {
      throw new Error("Method 'createTransaction()' must be implemented.");
    }
  
    getTransactionById() {
      throw new Error("Method 'getTransactionById()' must be implemented.");
    }
  
    updateTransaction() {
      throw new Error("Method 'updateTransaction()' must be implemented.");
    }
  
    deleteTransaction() {
      throw new Error("Method 'deleteTransaction()' must be implemented.");
    }
  }
  
  export default Transaction;
  