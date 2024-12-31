import AbstractUser from "../models/AbstractUser.js";
import Buyer from "../models/Buyer.js";
import Seller from "../models/Seller.js";
class UserView {
  static renderUser(user) {
    if (user instanceof AbstractUser) {
      console.log(user.displayInfo());
      if (user instanceof Buyer) {
        this.renderWishlist(user.wishlist);
      }
    } else {
      console.log('Invalid User');
    }
   
  }
  static renderError(error) {
    console.log(`Error : ${error.message}`);
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
export default UserView