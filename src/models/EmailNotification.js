import AbstractNotification from "./AbstractNotification.js";

class EmailNotification extends AbstractNotification {
  constructor(userId, message, emailAddress) {
    super(userId, message);

    if (!emailAddress || !emailAddress.includes("@")) {
      throw new Error("A valid email address is required.");
    }

    this.emailAddress = emailAddress; // Recipient's email address
  }

  // Implement the send method
  send() {
    console.log(
      `Email sent to ${this.emailAddress}:\nMessage: ${this.message}\nDate: ${this.date}`
    );
    return true; // Simulate a successful email sending
  }
}

export default EmailNotification;
/**EmailNotification is a subclass that inherits all the properties and methods initialized form the AbstractNotification . This subclass has a constrcutor that will directly invoked when creating an instance of this subclass , which then will invoke indirectly the constructor of the abstract class , which is super here . The method send must be implemented here and in ebery subclass that extends this parent class otherwise javascript will throw an error */
