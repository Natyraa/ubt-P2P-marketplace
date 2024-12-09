// /controllers/UserController.js

import Buyer from '../models/Buyer.js';
import Seller from '../models/Seller.js';
import UserNotFoundException from '../utils/UserNotFoundException.js';
import PremiumBuyer from '../models/PremiumBuyer.js';
class UserController {
  static createBuyer(id, name, email) {
    return new Buyer(id, name, email);
  }

  static createSeller(id, name, email) {
    return new Seller(id, name, email);
  }
  static createPremiumBuyer(id ,name, email) {
    return new PremiumBuyer(id ,name , email)
  }
  static getUserById(id, users) {
    const user = users.find(user => user.id === id);
    if (!user) {
      throw new UserNotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }
}

export default UserController;

/**Byer and Seller are classes the represent the Buyer and Seller entities , These models are used to create new buyer and seller objects 
 * Static methods , means you can call them directly on the UserController class , rather than needing to create an instance of UserController 
*/
