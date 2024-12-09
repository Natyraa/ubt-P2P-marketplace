class UserNotFoundException extends Error {
  constructor(message) {
    super(message);
    this.name = 'UserNotFoundException'
  }
}
export default UserNotFoundException;

/**This is a subclass of the built in error class in javascript , which meand that UserNotFoundExcpetion inherits all the properties and methods of the Error class , allowing it to nehave like a regular error with some additional custom behaviour , in this case a custom error name */