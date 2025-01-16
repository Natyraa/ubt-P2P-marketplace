class AbstractUser {
  constructor( id ,name , email, role , password) {
    if (this.constructor === AbstractUser) {
      throw new Error('Abstract Classes cannot be instantiated')
    }
    this.id = id;
    this.name = name;
    this.email = email;
    this.role = role;
    this.password = password
  }
 
  //Abstract methods must be implemented in subclasses
  displayInfo() {
    throw new Error("Method 'displayInfo()' must be implemented.");
  }
}
export default AbstractUser;

/**The AbstractUser is is an abstract class which is used as a blueprint for other classes . The if condtion checks if the AbstractClass is being instantiated directly . In Javascript you cannot instantiate abstract classes , so if this is true , it will throw an error .THis enforces that the AbstractUser can only be extendes , not used as a base object . The contructor intializes the properties which are id , name , email , role , password , with the values provided when an instance is created 
 * The displayInfo method is an abstract method and must be implmented in any class that extends AbstractUser . So the Buyer and Seller Class is where we must implement dispayInfo . Both Premium Buyer and Vip Buyer inhrerit displayInfo from the Buyer . When buyer implement dispayinfo and sublass of Buyer will inherit the displayInfo , unledd you want to change or extend its behaviur. 
*/

