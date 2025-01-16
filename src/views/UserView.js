import AbstractUser from "../models/AbstractUser.js";
import Buyer from "../models/Buyer.js";
import PremiumBuyer from "../models/PremiumBuyer.js";
import VIPBuyer from "../models/VipBuyer.js";
class UserView {
  static renderUser(user) {
    if (user instanceof AbstractUser) {
      // Display the basic user information
      console.log(user.displayInfo());
      
      // Additional logic for Buyer
      if (user instanceof Buyer) {
        this.renderWishlist(user.wishlist);
      }
      
      // Check if the user is a PremiumBuyer and display premium features
      if (user instanceof PremiumBuyer) {
        console.log("Premium Benefits: ", user.premiumBenefits);
        // Example: Access a specific premium feature
        console.log(user.accessPremiumFeature("Priority Support"));
      }
      
      // Check if the user is a VIPBuyer and display VIP support info
      if (user instanceof VIPBuyer) {
        console.log("VIP Support Contact: ", user.vipSupportContact);
        // Example: Get VIP support info
        console.log(user.getVIPSupport());
      }
    } else {
      console.log('Invalid User');
    }
  }

  static renderError(error) {
    console.log(`Error: ${error.message}`);
  }

  static renderWishlist(wishlist) {
    if (!wishlist || wishlist.items.length === 0) {
      console.log("Wishlist is empty.");
      return;
    }
    console.log("Wishlist Items:");
    wishlist.items.forEach((item, index) => {
      console.log(`${index + 1}. ${item}`);
    });
  }
}
export default UserView;

/**The UserView is designed to handle the display of the user information and related functionality  */