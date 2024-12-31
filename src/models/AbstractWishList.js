class AbstractWishList {
  constructor( ) {
    if (this.constructor === AbstractWishList) {
      throw new Error("AbstractWishList is an abstract class and cannot be instantiated")
    } 
   
    this.items = []
  }
  addItem(item) {
    throw new Error(`addItem() must be implemented in a subclass`)
  }
  removeItem(item) {
    throw new Error(`removeItem() must be implemented in a subclass`)
  }
  listItems() {
    throw new Error(`listItems() must be implemented in a subclass`)
  }
}
export default AbstractWishList;