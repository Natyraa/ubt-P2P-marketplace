import AbstractReview from "../models/AbstractReview.js";

class ReviewView {
  static renderReview (review) {
    if (review instanceof AbstractReview) {
      console.log(review.createReview());
    } else {
      console.log('Invalid review');
    }
  }
  static renderError(error) {
    console.log(`Error : ${error.message}`);
  }
}
export default ReviewView;

/**Static methods , means it can be called on the class itself rather than an instance of the class.. It is responsible for displaying information on the cli .  */