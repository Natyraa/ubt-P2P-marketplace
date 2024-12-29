// UserController.js
import Buyer from '../models/Buyer.js';
import Seller from '../models/Seller.js';
import UserRole from "../enums/userRole.js";
import UserException from "../exceptions/AuthenticationEsception.js";

const USERS_API = "http://localhost:3001/users"; // Your backend endpoint

class UserController {
  static async createUser(userData) {
    try {
      let user;

      // Validate input data
      if (!userData.name || !userData.email || !userData.password) {
        throw new UserException("Name, email, and password are required");
      }

      // Instantiate a class based on the role
      switch (userData.role) {
        case UserRole.BUYER:
          user = new Buyer(userData.id, userData.name, userData.email, userData.password);
          break;
        case UserRole.SELLER:
          user = new Seller(userData.id, userData.name, userData.email, userData.password);
          break;
        default:
          throw new UserException("Invalid role specified");
      }

      // Send user data to the backend
      const response = await fetch(USERS_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,  // Hardcoded in Buyer/Seller
          password: user.password,
        }),
      });

      if (!response.ok) {
        throw new UserException("Could not create user");
      }

      const createdUserData = await response.json();

      // Re-instantiate the user with the correct class
      let createdUser;
      if (createdUserData.role === UserRole.BUYER) {
        createdUser = new Buyer(createdUserData.id, createdUserData.name, createdUserData.email, createdUserData.password);
      } else if (createdUserData.role === UserRole.SELLER) {
        createdUser = new Seller(createdUserData.id, createdUserData.name, createdUserData.email, createdUserData.password);
      }

      // Return the newly instantiated user
      return createdUser;
    } catch (error) {
      console.error("Error creating user:", error.message);
      return null;
    }
  }

  static async getUsers() {
    try {
      const response = await fetch(USERS_API);
      if (!response.ok) {
        throw new UserException("Failed to fetch users");
      }
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error fetching users:", error.message);
      return null;
    }
  }

  static async loginUser(email, password) {
    try {
      const users = await this.getUsers();
      const userData = users.find(user => user.email === email && user.password === password);
      if (!userData) {
        throw new UserException("Invalid email or password");
      }

      // Instantiate the correct class (Buyer or Seller)
      let user;
      if (userData.role === UserRole.BUYER) {
        user = new Buyer(userData.id, userData.name, userData.email, userData.password);
      } else if (userData.role === UserRole.SELLER) {
        user = new Seller(userData.id, userData.name, userData.email, userData.password);
      }

      return user;
    } catch (error) {
      console.error("Error logging in user:", error.message);
      return null;
    }
  }
}

export default UserController;


/**When working with REST APIs that return plain objects (e.g., JSON), you may encounter situations where the objects don't have methods from their class, such as displayInfo(), because they are just plain JavaScript objects. To ensure your objects have the correct class methods, you need to re-instantiate them after receiving the data.

Here's the step-by-step summary for handling this situation: */
