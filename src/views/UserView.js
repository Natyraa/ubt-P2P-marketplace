import AbstractUser from "../models/AbstractUser.js";

class UserView {
  static renderUser(user) {
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