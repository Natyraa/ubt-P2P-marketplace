import PremiumBuyer from "./PremiumBuyer.js";
class VIPBuyer extends PremiumBuyer {
  constructor(id, name, email, password, premiumBenefits, vipSupportContact) {
    super(id, name, email, password, premiumBenefits);
    this.role = UserRole.VIP_BUYER; // Override role
    this.vipSupportContact = vipSupportContact; // Special VIP contact
  }

  displayInfo() {
    return `VIP Buyer: ${this.name}, Email: ${this.email}, Benefits: ${this.premiumBenefits.join(
      ", "
    )}, VIP Support: ${this.vipSupportContact}`;
  }

  getVIPSupport() {
    return `VIP support is available. Contact: ${this.vipSupportContact}`;
  }
}
export default VIPBuyer;