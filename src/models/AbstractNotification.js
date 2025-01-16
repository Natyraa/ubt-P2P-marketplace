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
/**
 * Abstract Notificination is an absract class which means , all the subclasses that will extend this class , will inherit all the properties and methods initialized here . Javascript does not support directly abstract classes directly , but there are some way to indirectly to invoke them . Abstract classes serve as a blueprint for other classes and cannot be instatied directly , otherwise javascript with throw an error . Hence the firdt if condition
 */
