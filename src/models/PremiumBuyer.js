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

/**PremiumBuyer extends Buyer class which extends AbstractUser . In this cass we have 2 level of depths in inheritance . Each class must have its own constuctor which is invoked directly when created an instance of PRemiumBuyer in this case . Since PRememium Buyer extends Buyer , now the super of PremiumBuyers is called from TheBuyer class . DisplayInfo in this case is not mandatory to be inhretired unless we want to override the method , if we do then we are applying polymorphism correctly */
