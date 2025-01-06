import fs from "fs";
import path from "path";
import EmailNotification from "../models/EmailNotification.js";
import SMSNotification from "../models/SMSNotification.js";

const dbFilePath = path.join(process.cwd(), "db.json");

class NotificationController {
  // Read database from db.json
  static readDB() {
    const data = fs.readFileSync(dbFilePath);
    return JSON.parse(data);
  }

  // Write database back to db.json
  static writeDB(data) {
    fs.writeFileSync(dbFilePath, JSON.stringify(data, null, 2));
  }

  // Get all notifications
  static getNotifications() {
    const db = this.readDB();
    return db.notifications || [];
  }

  // Get a notification by ID
  static getNotificationById(id) {
    const notifications = this.getNotifications();
    return notifications.find((notification) => notification.id === id);
  }

  // Create a new notification (Email or SMS)
  static createNotification(notificationType, userId, message, contactInfo) {
    const db = this.readDB();
    const notifications = db.notifications || [];

    // Determine notification type
    let notification;
    if (notificationType === "email") {
      notification = new EmailNotification(userId, message, contactInfo);
    } else if (notificationType === "sms") {
      notification = new SMSNotification(userId, message, contactInfo);
    } else {
      throw new Error("Invalid notification type. Must be 'email' or 'sms'.");
    }

    // Add notification to the database
    const newNotification = {
      id: notifications.length + 1, // Auto-increment ID
      ...notification,
    };

    notifications.push(newNotification);
    db.notifications = notifications;

    this.writeDB(db);
    return newNotification;
  }

  // Delete a notification by ID
  static deleteNotification(id) {
    const db = this.readDB();
    const notifications = db.notifications || [];
    const index = notifications.findIndex((notification) => notification.id === id);

    if (index === -1) {
      throw new Error(`Notification with ID ${id} not found.`);
    }

    notifications.splice(index, 1);
    db.notifications = notifications;
    this.writeDB(db);

    return true;
  }
}

export default NotificationController;
