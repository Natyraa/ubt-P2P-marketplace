import ProductReview from "../models/ProductReview.js";
import UserException from "../exceptions/AuthenticationEsception.js";

const REVIEWS_API = "http://localhost:3001/review"

class ReviewController {
  static async createReview(reviewData) {
    try {
      let review;
      if (!reviewData.reviewerId || !reviewData.revieweeId || !reviewData.rating || !reviewData.comment || !reviewData.productId) {
        throw new UserException("All fields (reviewerId, revieweeId, rating, comment, productId) are required");
      }
       review = new ProductReview(
        reviewData.id , reviewData.reviewerId , reviewData.revieweeId , reviewData.rating , reviewData.comment , reviewData.productId
    )
       const response = await fetch(REVIEWS_API , {
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify({
          id: review.id,
          reviewerId : review.reviewerId,
          revieweeId : review.revieweeId,
          rating: review.rating,
          comment : review.comment,
          productId: review.productId
        })
       })
       if (!response.ok) {
        throw new UserException('Could not create review')
       }
       const createdReviewData = await response.json()
       return new ProductReview(
        createdReviewData.id,
        createdReviewData.reviewerId,
        createdReviewData.revieweeId,
        createdReviewData.rating,
        createdReviewData.comment,
        createdReviewData.productId
      );
    } catch (error) {
      console.error("Error creating review:", error.message);
      return null;  
    }
  }
}

export default ReviewController;