import Observer from './Observer.js';
import fs from "fs";
import path from "path";

const dbFilePath = path.join(process.cwd(), "db.json");

class EmailObserver extends Observer {
  update(data) {
    const { contactInfo, message } = data; // Use contactInfo
    if (!contactInfo) {
      console.error("EmailObserver: Missing contact information.");
      return;
    }
  
    // Simulate sending email
    console.log(`Sending Email to ${contactInfo}: ${message}`);
  
    // Log email notification to db.json
    const db = JSON.parse(fs.readFileSync(dbFilePath, "utf-8"));
    const notifications = db.notifications || [];
    notifications.push({
      id: notifications.length + 1,
      type: "email",
      contactInfo,
      message,
      date: new Date().toISOString(),
    });
    db.notifications = notifications;
    fs.writeFileSync(dbFilePath, JSON.stringify(db, null, 2));
  }
}

export default EmailObserver;
