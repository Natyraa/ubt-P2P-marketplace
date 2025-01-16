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


/**PremiumShopping Cart extends StandardShopping cart , which extends that abstract class , this a 2-leveth depth of inheritance . This class has its own constructor that will be invoked when creating an instance of this class , which will invoke the super , that is the constructor of the parent class of this class , that is in our case our StandrdShoppingCart , which then will invoke the super of the StandardShoppingCart , that is the constructor of the AbstractClass . The methods in the Abstract class , are not a must to implemented here , unles we want to override them . If we dont implement . The method will display from the StandShoppingCart */