import Buyer from '../models/Buyer.js';
import Seller from '../models/Seller.js';
import UserRole from "../enums/userRole.js";
import UserException from "../exceptions/AuthenticationEsception.js"; // Importing the exception class

const USERS_API = "http://localhost:3001/users";

class UserController {
  
  // Create a user with a specific role (Buyer, Seller, etc.)
  static async createUser(userData) {
    
    try {
      let user;

      // Validate input data (throw an exception if invalid)
      if (!userData.name || !userData.email || !userData.password) {
        throw new UserException("Name, email, and password are required");
      }
      // Instantiate a class based on the role
      if (userData.role === UserRole.BUYER) {
       
        user = new Buyer(userData.id, userData.name, userData.email,  userData.password);
        console.log('user' , user);
       
      } else if (userData.role === UserRole.SELLER) {
        user = new Seller(userData.id, userData.name, userData.email ,userData.password);
        console.log("User instance created:", user); // Debugging log
      } else {
        throw new UserException("Invalid role specified");
      }
      // Send only the necessary user data to the backend
      const response = await fetch(USERS_API, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          password: user.password,
        }),
      });

      if (!response.ok) {
        throw new UserException("Could not create user");
      }

      const result = await response.json();
      return result;
    } catch (error) {
      // Catch any error and throw a UserException
      if (error instanceof UserException) {
        console.error("User error:", error.message);
      } else {
        console.error("Unexpected error:", error.message);
      }
      return null;
    }
  }

  // Fetch all users from the API
  static async getUsers() {
    try {
      const response = await fetch(USERS_API);
      if (!response.ok) {
        throw new UserException("Failed to fetch users");
      }
      const result = await response.json();
      return result;
    } catch (error) {
      if (error instanceof UserException) {
        console.error("User error:", error.message);
      } else {
        console.error("Unexpected error:", error.message);
      }
      return null;
    }
  }

  // Login user by checking email and password
  static async loginUser(email, password) {
    try {
      const users = await this.getUsers();
      const userData = users.find((user) => user.email === email && user.password === password);
      if (!userData) {
        throw new UserException("Invalid email or password");
      }

      // Based on the role, instantiate the correct class (Buyer or Seller)
      let user;
      if (userData.role === UserRole.BUYER) {
        user = new Buyer(userData.id, userData.name, userData.email, userData.password);
      } else if (userData.role === UserRole.SELLER) {
        user = new Seller(userData.id, userData.name, userData.email, userData.password);
      }

      // Now you have the user instance with methods like performAction
      return user;
    } catch (error) {
      if (error instanceof UserException) {
        console.error("User error:", error.message);
      } else {
        console.error("Unexpected error:", error.message);
      }
      throw error; // Rethrow the error if necessary
    }
  }
}

export default UserController;
