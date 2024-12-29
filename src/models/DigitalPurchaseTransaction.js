import PurchaseTransaction from "./PurchaseTransaction.js";

class DigitalPurchaseTransaction extends PurchaseTransaction {
  constructor(buyerId, sellerId, amount, productDetails, status = "pending", downloadLink) {
    super(buyerId, sellerId, amount, productDetails, status);
    
    // Validate product details and download link
    this.validateProductDetails(productDetails);
    this.downloadLink = downloadLink;

    // Validate download link
    this.validateDownloadLink();
  }

  // Helper method to validate productDetails
  validateProductDetails(productDetails) {
    if (!productDetails || !productDetails.productName || !productDetails.productId) {
      throw new Error(
        "Invalid product details. 'productName' and 'productId' are required."
      );
    }
    return true;
  }

  // Add a method to validate the download link
  validateDownloadLink() {
    if (!this.downloadLink || !this.downloadLink.startsWith("http")) {
      throw new Error("Invalid or missing download link");
    }
    return true;
  }

  // Simulate sending the download link via email
  sendDownloadLinkToEmail(email) {
    if (!email || !email.includes("@")) {
      throw new Error("Invalid email address");
    }
    console.log(
      `Download link (${this.downloadLink}) sent to email: ${email}`
    );
    return true;
  }

  // Override createTransaction to include the download link
  createTransaction() {
    return {
      ...super.createTransaction(),
      downloadLink: this.downloadLink,
    };
  }
}

export default DigitalPurchaseTransaction;
