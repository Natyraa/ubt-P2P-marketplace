// PremiumBuyer.js
import Buyer from "./Buyer.js";
import UserRole from "../enums/userRole.js";

class PremiumBuyer extends Buyer {
  constructor(id, name, email , password , premiumBenefits) {
    super(id, name, email , password);
    this.role = UserRole.PREMIUM_BUYER
    this.premiumBenefits = premiumBenefits
  }

  displayInfo() {
    return `Premium Buyer: ${this.name}, Email: ${this.email}, Premium Level: ${this.premiumBenefits}`;
  }
  accessPremiumFeature(feature) {
    return this.premiumBenefits.includes(feature)
      ? `Access granted to ${feature}.`
      : `Access denied to ${feature}.`;
  }
}

export default PremiumBuyer;
