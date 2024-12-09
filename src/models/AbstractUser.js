class AbstractUser {
  constructor( id ,name , email, role) {
    if (this.constructor === AbstractUser) {
      throw new Error('Abstract Classes cannot be instantiated')
    }
    this.id = id;
    this.name = name;
    this.email = email;
    this.role = role;
    
  }
  //Abstract methods must be implemented in subclasses
  displayInfo() {
    throw new Error("Method 'displayInfo()' must be implemented.");
  }
  performAction() {
    throw new Error("Method 'performAction()' must be implemented");
}
}
export default AbstractUser;

/**This is an abstract class intented to serve as a base class for other user types 
 * Constructor method initializes a new object
 *  if (this.constructor === AbstractUser) {
      throw new Error('Abstract Classes cannot be instantiated')
    }  - this is an abstract class enforcement , which assures that AbstractUser class cannot be directly instantiated 
      Abstract classes are meant to be a a blueprint for other classes and not used directly
      displayMethod() is a  abstract method in the class that can be inherited or overridden . This pattern forces the sublass to provide an implementation for the method .
      Javascript does not have built in support for abstract classes in the way languages have . However we can simulate abstract classes 
*/