class AbstractNotification {
  constructor(userId, message) {
    if (new.target === AbstractNotification) {
      throw new Error("Cannot instantiate an abstract class.");
    }

    if (!userId || !message) {
      throw new Error("User ID and message are required.");
    }

    this.userId = userId; // ID of the user receiving the notification
    this.message = message; // Notification message
    this.date = new Date().toISOString(); // Timestamp of the notification
  }

  // Abstract method to send the notification
  send() {
    throw new Error("Method 'send()' must be implemented.");
  }
}

export default AbstractNotification;
