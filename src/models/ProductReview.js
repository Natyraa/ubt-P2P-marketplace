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