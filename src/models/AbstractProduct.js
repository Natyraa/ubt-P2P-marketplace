class AbstractProduct {
  constructor(id , productName , description , price) {
    if (this.constructor === AbstractProduct) {
      throw new Error('Abstarct class AbstractProduct cannot be instantiated')
    }
    this.id = id,
    this.productName = productName,
    this.description = description,
    this.price = price
  }
  displayDetails() {
    throw new Error("Method 'displayDetails()' must be implemented in a subclass");
  }
}
export default AbstractProduct

/**AbstractProduct is an abstract class intended to serve as a base case for other types 
 * constructor method initialized a new object 
 * The constructor in an abstract class is used to initalize the common properties or perform common setup required by its sunclasses . It is typically invoked indirectly through a subclass constructor
 * displaydetails is an abstract method i
 *n the class that must be inherited , or can be overriden(polymorphism)
 when a subclass is instantiated the constructor os the subclass automatically calls the constructor of the abstract class . 
 * Javascript does not jave built in support for abstract classes . However we can simulate abstract classes
 */