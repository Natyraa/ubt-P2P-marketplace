import Seller from "./Seller.js"
import UserRole from "../enums/userRole.js";

class PremiumSeller extends Seller {
  constructor(id, name, email , password , premiumLevel) {
    super(id, name, email, password);
    this.role = UserRole.PREMIUM_SELLER
    this.premiumLevel = premiumLevel
  }

  displayInfo() {
    return `Premium Sellet: ${this.name}, Email: ${this.email}, Premium Level: ${this.premiumLevel}`;
  }
 
}

export default PremiumSeller;