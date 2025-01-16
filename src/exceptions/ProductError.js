class ProductError extends Error {
  constructor(message) {
    super(message)
    this.name = "ProductError";
  }
}


export default ProductError;

/**This is a custom error class , that extends Javascript built in Error Class  . The super calls the constructor of the parent class Error , which is a built in javascript class . */