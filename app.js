import UserView from "./src/views/UserView.js";
import UserController from "./src/controllers/UserController.js";
import UserRole from "./src/enums/userRole.js";
import ReviewController from "./src/controllers/ReviewController.js";
import ReviewView from "./src/views/ReviewView.js";
// Example: Create and display a user

async function createUser() {
  const userData = { 
    id: 2, 
    name: "Jane Doe", 
    email: "janedoe@example.com", 
    role: UserRole.BUYER, // Use enum for the role
    password: "securepassword123" 
  };
  
  
  const createdUser = await UserController.createUser(userData);
  
  // Render user information if user is created successfully
  if (createdUser) {
    console.log(true);
    UserView.renderUser(createdUser);
  }

  // If error, render the error message
  else {
    const error = new Error("Unable to create user");
    UserView.renderError(error);
  }
}
async function createReview() {
  const reviewData = {
    id: 1,
    reviewerId: 101,
    revieweeId: 202,
    rating: 5,
    comment: "Excellent Product",
    productId: 1001,
  }
  const createdReview = await ReviewController.createReview(reviewData)

  if (createdReview) {
    ReviewView.renderReview(createdReview)
  } else {
    return `Failed to create review`
  }
}
async function createProduct() {
  const productData = {
    id: 101,
    name: "Gaming Laptop",
    description: "High-performance gaming laptop",
    price: 1500,
    category: "Electronics",
    stockQuantity: 20,
    brand: "Alienware",
    warranty: 24,
  };

  const createdProduct = await ProductController.createProduct(productData);

  if (createdProduct) {
    ProductView.renderProduct(createdProduct);
  } else {
    const error = new Error("Unable to create product");
    ProductView.renderError(error);
  }
}

createProduct();
createReview()
