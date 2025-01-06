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
