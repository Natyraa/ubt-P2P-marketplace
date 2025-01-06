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
 * displaydetails is an abstract method in the class that must be inherited , or can be overriden(polymorphism)
 * Javascript does not jave built in support for abstract classes . However we can simulate abstract classes
 */