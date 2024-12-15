
// import WishlistItemCategory from "../enums/wishlistItemCategory.js";
import AbstractWishList from "./AbstractWishList";

class BuyerWishList extends AbstractWishList {
  addItem(item) {
    if (!item || typeof item !== "string"){
      throw new Error(`Item must be a valid string`)
    }
    const wishlistItem = {item: item.trim() , category}
    this.items.push(wishlistItem)
    console.log(`${item} added to your wishlist under ${category}`);
  }
  removeItem(item) {
    const index = this.items.findIndex((wishlistItem) => wishlistItem.item === item);
    if (index !== -1) {
        this.items.splice(index, 1);
        console.log(`${item} removed from your wishlist.`);
    } else {
        console.log(`${item} is not in your wishlist.`);
    }
  }
  listItems() {
    if (this.items.length === 0) {
      console.log('Your wishlist is empty');
    } else {
      console.log('Your wishlist');
      this.items.forEach(( item, index) => {
        console.log(`${index + 1}. ${item} `);
    });
    }
  }
}
export default BuyerWishList;