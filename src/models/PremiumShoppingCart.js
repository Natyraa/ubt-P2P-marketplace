import StandardShoppingCart from "./StandardShoppingCart.js";

class PremiumShoppingCart extends StandardShoppingCart {
  constructor(userId, discountRate = 0.1) {
    super(userId);
    this.discountRate = discountRate; // 10% discount by default
  }

  calculateTotal() {
    const total = super.calculateTotal();
    const discount = total * this.discountRate;
    console.log(`Discount applied: $${discount.toFixed(2)}`);
    return total - discount;
  }
}

export default PremiumShoppingCart;
