import AbstractUser from "../models/AbstractUser.js";
import Buyer from "../models/Buyer.js";
import Seller from "../models/Seller.js";
class UserView {
  static renderUser(user) {
    console.log('rendering user: ' , user);
    console.log("User constructor:", user.constructor.name , user instanceof AbstractUser , user instanceof Buyer);
    if (user instanceof AbstractUser) {
      console.log(user.displayInfo());

    } else {
      console.log('Invalid User');
    }
   
  }
  static renderError(error) {
    console.log(`Error : ${error.message}`);
  }
}
export default UserView