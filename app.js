import UserController from "./src/controllers/UserController.js"
import UserView from "./src/views/UserView.js"

import UserNotFoundException from "./src/utils/UserNotFoundException.js"

const users = []

try {
  const buyer = UserController.createBuyer(1 , 'John Doe' , 'john@example.com')
  const seller = UserController.createSeller(2 , 'Jane Smith' , 'jane@example.com');
  const premiumBuyer = UserController.createPremiumBuyer(1 , 'Natyra' , 'natyra@gmail.com')
  users.push(buyer , seller , premiumBuyer)
  //Render user information
  UserView.renderUser(buyer)
  UserView.renderUser(seller)
  UserView.renderUser(premiumBuyer)
  const user = UserController.getUserById(1 , users)
  UserView.renderUser(user)

  const nonExicstingUser = UserController.getUserById(999 , users)
  UserView.renderError(nonExicstingUser)
  
} catch (error) {
  if (error instanceof UserNotFoundException) {
    UserView.renderError(error)

  } else {
    console.log(error);
  }
}