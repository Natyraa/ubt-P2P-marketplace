import AbstractWishList from "./AbstractWishList.js";

class BuyerWishlist extends AbstractWishList {
  constructor(buyer) {
      super();
      this.buyer = buyer;
  }

  addItem(item) {
      if (!this.items.includes(item)) {
          this.items.push(item);
          console.log(`${item} has been added to ${this.buyer.name}'s wishlist.`);
      } else {
          console.log(`${item} is already in the wishlist.`);
      }
  }

  removeItem(item) {
      const index = this.items.indexOf(item);
      if (index > -1) {
          this.items.splice(index, 1);
          console.log(`${item} has been removed from ${this.buyer.name}'s wishlist.`);
      } else {
          console.log(`${item} is not in the wishlist.`);
      }
  }

  viewItems() {
      console.log(`${this.buyer.name}'s wishlist:`, this.items);
  }
}
export default BuyerWishlist;