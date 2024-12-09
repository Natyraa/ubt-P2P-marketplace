import AbstractUser from "./AbstractUser.js";
import UserRole from "../enums/userRole.js";


class Seller extends AbstractUser{
  constructor(id ,name , email ) {
    super(id , name , email , UserRole.SELLER)
  }
  displayInfo() {
    return `Seller : ${this.name} , email : ${this.email}`
  }


  performAction() {
    console.log(`Seller: ${this.name} is listing products for sale`);
  }
}

export default Seller;