import AbstractUser from "./AbstractUser.js";
import UserRole from "../enums/userRole.js"
import BuyerWishlist from "./BuyerWishList.js";
class Buyer extends AbstractUser {
  constructor(id , name , email , password  ) {
    super(id ,name , email , UserRole.BUYER , password );
    this.wishlist = new BuyerWishlist(this);
   
  }
  checkPassword(inputPassword) {
    return inputPassword === this.password
  }
  displayInfo() {
    return `Buyer: ${this.name} , Email : ${this.email} `
  }
 
}
export default Buyer;

/**Constructor accepts name and email as paramters which will be passes to the parent AbstractUser via the super() method 
 * displayInfo() is a method inherited from the AbstractedUser . The byer class overrides it to provide specific implementation for buyers
 * THis structure follows inheritance and polymorphism
 * Constrcutor initialized an instance of AbstractUser 
 * super() invokes the constructor of AbstractUser
 * super is a keyword used in classes to call the constructor or access the properties and methods of a superclass(in our case AbstractUser)
 * 
 * Without passing the buyer object to the BuyerWishlist constructor, the BuyerWishlist class wouldn't have access to the buyer's properties, such as name, to properly render messages or perform other operations that rely on the buyer's details.
*/