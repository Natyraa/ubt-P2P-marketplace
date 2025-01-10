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
