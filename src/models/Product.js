import AbstractProduct from './AbstractProduct.js'

class Product extends AbstractProduct {
  constructor(id , productName , description , price) {
    super(id , productName , description , price) 
  }
 displayDetails() {
  return `Product ${this.productName} with description ${this.description} and price : $${this.price} was listed for sale `
 }
}
export default Product;

/**Product class extends the AbstratProduct which means the properites and methods implemented in the abstract class , must be implemented on the subclass . The constructor of the subclass is invoked directly when created an instance of this class , which then invokes indirectly the constructor of th abstractclass , in which case is the super
 * displayDetails ia a method initalized in the abstract class which means it must be implement in other subclasses that are extended from the abstract class , otherwise javascript with throw an error
 * Javascript does not natively support enforcing abstract methods directly so additional steps are required to emulate such behavior
 * So the abstract class includes a constructor to initialize shared properies and an abstract method
 */