import AbstractUser from "./AbstractUser.js";
import UserRole from "../enums/userRole.js";


class Seller extends AbstractUser{
  constructor(id ,name , email , password ) {
    super(id , name , email , UserRole.SELLER , password  )
   
  }
  checkPassword(inputPassword) {
    return inputPassword === this.password
  }
  displayInfo() {
    return `Seller : ${this.name} , email : ${this.email}`
  }


 
}

export default Seller;