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
