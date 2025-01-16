import AbstractUser from "./AbstractUser.js";
import UserRole from "../enums/userRole.js"
import BuyerWishlist from "./BuyerWishList.js";
class Buyer extends AbstractUser {
  constructor(id , name , email , password  ) {
    super(id ,name , email , UserRole.BUYER , password );
    this.wishlist = new BuyerWishlist(this);
   
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
 * 
 * Constrcutor is a special method that is used to created and intialize an object when a class is instantiated . Defines how the object is created . Super is used to invoke the methods and propertied from the parent class .It is used to call the parent class's constructor and methods . It is mandatory to call the constructor of the parent class .
*/