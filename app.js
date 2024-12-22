import UserView from "./src/views/UserView.js";
import UserController from "./src/controllers/UserController.js";
import UserRole from "./src/enums/userRole.js";

// Example: Create and display a user

async function run() {
  const userData = { 
    id: 2, 
    name: "Jane Doe", 
    email: "janedoe@example.com", 
    role: UserRole.BUYER, // Use enum for the role
    password: "securepassword123" 
  };
  
  
  const createdUser = await UserController.createUser(userData);
  
  // Render user information if user is created successfully
  if (createdUser) {
    console.log(true);
    UserView.renderUser(createdUser);
  }

  // If error, render the error message
  else {
    const error = new Error("Unable to create user");
    UserView.renderError(error);
  }
}

run();
