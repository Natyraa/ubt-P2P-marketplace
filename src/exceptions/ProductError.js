class ProductError extends Error {
  constructor(message) {
    super(message)
    this.name = "ProductError";
  }
}


export default ProductError;