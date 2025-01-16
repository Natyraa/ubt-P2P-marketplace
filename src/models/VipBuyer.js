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
/**Vip Buyer extends Premium Buyer , which exnteds Buyer , which then extends AbstractUser . In this case we ar implemtning Three level depth of inheritance . Vip Buyer has its own constructor , which is invoked directly when creating an instance of the Vip Buyer . The super is calling the properties and methods of the PRemum Buyer . Like in the premium Buyer dispayInfo method is not mandatory to be called , unledd we want to override . In this case we are implemtning polymorphism . If  we dont implement it , if it was implement in the PRemium Buyer , it will be inherited from that class . If not it will inherited from The buyer Class */