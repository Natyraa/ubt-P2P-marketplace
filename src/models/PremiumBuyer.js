// PremiumBuyer.js
import Buyer from "./Buyer.js";
import UserRole from "../enums/userRole.js";

class PremiumBuyer extends Buyer {
  constructor(id, name, email , password , premiumLevel) {
    super(id, name, email , password);
    this.role = UserRole.PREMIUM_BUYER
    this.premiumLevel = premiumLevel
  }

  displayInfo() {
    return `Premium Buyer: ${this.name}, Email: ${this.email}, Premium Level: ${this.premiumLevel}`;
  }
 
}

export default PremiumBuyer;
