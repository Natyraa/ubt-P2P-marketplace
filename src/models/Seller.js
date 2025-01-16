import AbstractUser from "./AbstractUser.js";
import UserRole from "../enums/userRole.js";


class Seller extends AbstractUser{
  constructor(id ,name , email , password ) {
    super(id , name , email , UserRole.SELLER , password  )
   
  }

  displayInfo() {
    return `Seller : ${this.name} , email : ${this.email}`
  }


 
}

export default Seller;

/**Seller class extends AbstractUser , which means we must call the super of the AbstractClass , otherwise it will throw an error , to acces its propertis and methods . Also each class must have its own constructor , that will be involed when creating an instance of the Seller class in this case . displayInfo must be inherited from that AbstractUser , otherwise Javascript will throw an error .  */