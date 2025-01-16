import AbstractNotification from "./AbstractNotification.js";

class SMSNotification extends AbstractNotification {
  constructor(userId, message, phoneNumber) {
    super(userId, message);

    if (!phoneNumber || phoneNumber.length < 10) {
      throw new Error("A valid phone number is required.");
    }

    this.phoneNumber = phoneNumber; // Recipient's phone number
  }

  // Implement the send method
  send() {
    console.log(
      `SMS sent to ${this.phoneNumber}:\nMessage: ${this.message}\nDate: ${this.date}`
    );
    return true; // Simulate a successful SMS sending
  }
}

export default SMSNotification;
/**SMSNotification is a subclass that extends from AbstractNotificiaon which meand it inherits all the properties and methods initialized in the parent class . It has its own constructor that is invoked directly when creating an instance of this class , which then invokes the super , that is the constructor of the parent class . send method must be implemented here otherwise javascript will throw an error */