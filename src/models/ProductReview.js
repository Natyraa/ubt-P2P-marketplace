import AbstractReview from "./AbstractReview.js"

class ProductReview extends AbstractReview {
  constructor(id , reviewerId , revieweeId , rating , comment , productId) {
    super(id , reviewerId , revieweeId , rating , comment);
    this.productId = productId
  }
  createReview() {
    return `Review for product ID ${this.productId}: ${this.comment} .`
  }
  
}
export default ProductReview;

/**Product review is a subclass that extends AbstractReview , which meand it inhretirs all the parameters and methods inialized in the AbstractReview , the parameters are inherited through the super , the constructor of the subclass is involed directly when creating an instance of this subclass , which then invokes indirectly the constructor of tha parent class . The method createReview must be implemented , otherwise Javascript will throw an error */