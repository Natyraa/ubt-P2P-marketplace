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