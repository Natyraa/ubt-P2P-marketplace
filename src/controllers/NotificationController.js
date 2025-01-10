import fs from "fs";
import path from "path";
import NotificationSubject from "../subjects/NotificationSubject.js";
import EmailObserver from "../observers/EmailObserver.js";
import SMSObserver from "../observers/SMSObserver.js";

const dbFilePath = path.join(process.cwd(), "db.json");

class NotificationController {
  constructor() {
    // Initialize the NotificationSubject and attach observers
    this.notificationSubject = new NotificationSubject();
    this.initializeObservers();
  }

  // Attach observers to the NotificationSubject
  initializeObservers() {
    const emailObserver = new EmailObserver();
    const smsObserver = new SMSObserver();

    this.notificationSubject.attach(emailObserver); // Use 'attach' to match Observer design pattern
    this.notificationSubject.attach(smsObserver);
  }

  // Read database from db.json
  static readDB() {
    const data = fs.readFileSync(dbFilePath, "utf-8");
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
  createNotification(notificationType, contactInfo, messageTemplate, context = {}) {
    const db = NotificationController.readDB(); // Load data from db.json
    const notifications = db.notifications || []; // Ensure notifications array exists

    // Determine contactInfo (use email if available, fallback to phoneNumber)
    const resolvedContactInfo = contactInfo.email || contactInfo.phoneNumber;

    // Debugging: Log resolvedContactInfo
    console.log("Resolved Contact Info:", resolvedContactInfo);

    // Validate contactInfo
    if (!resolvedContactInfo) {
      console.error("Error: Contact info is missing (email and phoneNumber are both undefined).");
      return null;
    }

    // Resolve message from the template using the context
    const resolvedMessage = this.resolveMessageTemplate(messageTemplate, context);

    // Notify observers
    if (this.notificationSubject) {
      this.notificationSubject.notifyObservers({
        type: notificationType,
        contactInfo: resolvedContactInfo,
        message: resolvedMessage,
      });
    } else {
      console.error("Error: notificationSubject is not initialized.");
    }

    // Add the new notification to the database
    const newNotification = {
      id: notifications.length + 1, // Auto-increment ID
      type: notificationType,
      contactInfo: resolvedContactInfo,
      message: resolvedMessage,
      date: new Date().toISOString(),
    };

    notifications.push(newNotification); // Add to notifications array
    db.notifications = notifications; // Update db.json data
    NotificationController.writeDB(db); // Save changes to db.json

    // Debugging: Log the created notification
    console.log("New Notification Created:", newNotification);

    return newNotification; // Return the created notification
  }

  // Helper method to resolve message templates
  resolveMessageTemplate(template, context) {
    return template.replace(/\{(\w+)\}/g, (_, key) => context[key] || "undefined");
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