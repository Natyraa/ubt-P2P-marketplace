import Product from "../models/Product.js"
import ProductError from "../exceptions/ProductError.js"

const PRODUCT_API = "http://localhost:3001/product";

class ProductController {
  static async createProductListing(productData) {
    try {
      let product;
      if (!productData.id || !productData.productName || !productData.description || !productData.price) {
        throw new ProductError('Product name , description and price are required');
      }
      product = new Product(productData.id , productData.productName , productData.description , productData.price)
      const response = await fetch(PRODUCT_API , {
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify({
          id: product.id,
          productName: product.productName,
          description: product.description,
          price: product.price
        })
      })
      if (!response.ok) {
        throw new ProductError('Could not create product listing')
      }
      const createProductListing = await response.json()
      return new Product(
        createProductListing.id , 
        createProductListing.productName ,
        createProductListing.description ,
        createProductListing.price
      )
    }
    catch (error) {
      console.log('Error creating product listing:' , error.message);
      return null
    }
  }
}
export default ProductController;