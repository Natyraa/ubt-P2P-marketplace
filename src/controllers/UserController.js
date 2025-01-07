// UserController.js
import Buyer from '../models/Buyer.js';
import Seller from '../models/Seller.js';
import UserRole from "../enums/userRole.js";
import UserException from "../exceptions/AuthenticationEsception.js";
import PremiumBuyer from '../models/PremiumBuyer.js';
import VIPBuyer from '../models/VipBuyer.js';
const USERS_API = "http://localhost:3001/users"; // Your backend endpoint
class UserFactory {
  static createUser(userData) {
    let user;

    switch (userData.role) {
      case UserRole.BUYER:
        user = new Buyer(userData.id, userData.name, userData.email, userData.password);
        break;
      case UserRole.PREMIUM_BUYER:
        if (!userData.premiumBenefits) {
          throw new UserException("Premium benefits are required for Premium Buyer");
        }
        user = new PremiumBuyer(userData.id, userData.name, userData.email, userData.password, userData.premiumBenefits);
        break;
      case UserRole.VIP_BUYER:
        if (!userData.premiumBenefits || !userData.vipSupportContact) {
          throw new UserException("Premium benefits and VIP support contact are required for VIP Buyer");
        }
        user = new VIPBuyer(
          userData.id,
          userData.name,
          userData.email,
          userData.password,
          userData.premiumBenefits,
          userData.vipSupportContact
        );
        break;
      case UserRole.SELLER:
        user = new Seller(userData.id, userData.name, userData.email, userData.password);
        break;
      default:
        throw new UserException("Invalid role specified");
    }

    return user;
  }
}
class UserController {
  static async createUser(userData) {
    try {
      // Validate input data
      if (!userData.name || !userData.email || !userData.password || !userData.role) {
        throw new UserException("Name, email, password, and role are required");
      }

      // Create user using the UserFactory
      const user = UserFactory.createUser(userData);

      // Send user data to the backend
      const response = await fetch(USERS_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          password: user.password,
          premiumBenefits: user.premiumBenefits || undefined, // Include only if applicable
          vipSupportContact: user.vipSupportContact || undefined, // Include only if applicable
        }),
      });

      if (!response.ok) {
        throw new UserException("Could not create user");
      }

      const createdUserData = await response.json();

      // Re-instantiate the user with the correct class
      const createdUser = UserFactory.createUser(createdUserData);

      // Return the newly instantiated user
      return createdUser;
    } catch (error) {
      console.error("Error creating user:", error.message);
      return null;
    }
  }
}


export default UserController;


/**When working with REST APIs that return plain objects (e.g., JSON), you may encounter situations where the objects don't have methods from their class, such as displayInfo(), because they are just plain JavaScript objects. To ensure your objects have the correct class methods, you need to re-instantiate them after receiving the data.

Here's the step-by-step summary for handling this situation: */
