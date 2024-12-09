// PremiumBuyer.js
import Buyer from "./Buyer.js";
import UserRole from "../enums/userRole.js";

class PremiumBuyer extends Buyer {
  constructor(id, name, email) {
    super(id, name, email , UserRole.PREMIUM_BUYER);
    ; // Overriding the role for PremiumBuyer
  }

  displayInfo() {
    return `Premium Buyer: ${this.name}, Email: ${this.email}`;
  }

  performAction() {
    console.log(`Premium Buyer: ${this.name} is browsing and accessing premium features`);
  }
}

export default PremiumBuyer;
