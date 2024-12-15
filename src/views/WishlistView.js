class WishlistView {
  static renderWishlist(wishlist) {
    if (Array.isArray(wishlist)) {
      if (wishlist.length === 0) {
        console.log("Your wishlist is empty.");
      } else {
        console.log("Your Wishlist:");
        wishlist.forEach((item, index) => {
          console.log(`${index + 1}. ${item}`);
        });
      }
    } else {
      console.log("Invalid wishlist data.");
    }
  }

  static renderItemAdded(item) {
    console.log(`${item} added to your wishlist.`);
  }

  static renderItemRemoved(item) {
    console.log(`${item} removed from your wishlist.`);
  }

  static renderError(error) {
    console.log(`Error: ${error.message}`);
  }
}

export default WishlistView;