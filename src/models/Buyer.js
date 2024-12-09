import AbstractUser from "./AbstractUser.js";
import UserRole from "../enums/userRole.js";

class Buyer extends AbstractUser {
  constructor(id , name , email  ) {
    super(id ,name , email , UserRole.BUYER);
  }
  displayInfo() {
    return `Buyer: ${this.name} , Email : ${this.email} `
  }
  performAction() {
    console.log(`Buyer : ${this.name} is browsing products`);
  }
}
export default Buyer;

/**Constructor accepts name and email as paramters which will be passes to the parent AbstractUser via the super() method 
 * displayInfo() is a method inherited from the AbstractedUser . The byer class overrides it to provide specific implementation for buyers
 * THis structure follows inheritance and polymorphism
 * Constrcutor initialized an instance of AbstractUser 
 * super() invokes the constructor of AbstractUser
 * super is a keyword used in classes to call the constructor or access the properties and methods of a superclass(in our case AbstractUser)
*/