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
    const db = this.readDB();
    const notification = db.notifications.find((notification) => notification.id === id);
    return notification || null;
  }

  // Create a new notification (Email or SMS)
  static createNotification(notificationType, userId, message, contactInfo) {
    const db = this.readDB();// Load data from db.json
    const notifications = db.notifications || [];// Ensure notifications array exists

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
      type,
      userId,
      message,
      contactInfo,
      date: new Date().toISOString(),
    };

    notifications.push(newNotification);// Add to notifications array
    db.notifications = notifications;// Update db.json data
    this.writeDB(db);// Save changes to db.json
    
    return newNotification;// Return the created notification
  }

  // Delete a notification by ID
  static deleteNotification(id) {
    const db = this.readDB();
    const index = db.notifications.findIndex((notification) => notification.id === id);

    if (index === -1) {
      throw new Error(`Notification with ID ${id} not found.`);
    }

    db.notifications.splice(index, 1); // Remove notification from array
    this.writeDB(db); // Save changes to db.json

    return true;
  }
}

export default NotificationController;
