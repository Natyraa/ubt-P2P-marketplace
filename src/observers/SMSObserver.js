import Observer from './Observer.js';
import fs from "fs";
import path from "path";

const dbFilePath = path.join(process.cwd(), "db.json");

class SMSObserver extends Observer {
    update(data) {
        const { contactInfo, message } = data; // Use contactInfo
        if (!contactInfo) {
          console.error("SMSObserver: Missing contact information.");
          return;
        }
      
        // Simulate sending SMS
        console.log(`Sending SMS to ${contactInfo}: ${message}`);
      
        // Log SMS notification to db.json
        const db = JSON.parse(fs.readFileSync(dbFilePath, "utf-8"));
        const notifications = db.notifications || [];
        notifications.push({
          id: notifications.length + 1,
          type: "sms",
          contactInfo,
          message,
          date: new Date().toISOString(),
        });
        db.notifications = notifications;
        fs.writeFileSync(dbFilePath, JSON.stringify(db, null, 2));
      }
}

export default SMSObserver;

/**fs - file system is a module used to interact with the file system , particularly for reading from and writing to files
 * path , helps to construct the file path for the db.json
 * updae method recieves data , which is expected to be an object contanting the sms notificaion details
 * When the SMSObserver is notified (i.e., when the subject calls update()), it receives the data object, which contains contactInfo (the phone number) and message (the SMS content).
It then logs the SMS details to the console, simulating the sending of an SMS.
Finally, it updates the db.json file by adding a new record with the notification details, allowing you to track all SMS notifications sent.


Observer (EmailObserver, SMSObserver): These are the recipients of the notification, each with a custom way of handling it (like sending emails or SMS).
NotificationSubject: The entity that triggers notifications. It notifies all registered observers whenever an event occurs, such as a new transaction.
update() method: This method is called by the NotificationSubject to notify the observers when a new event occurs (e.g., a transaction).
Observers (EmailObserver, SMSObserver): Each observer handles the notification in its own way. For example, EmailObserver sends an email, and SMSObserver sends an SMS. They can also log the event to a file or database.
 */
