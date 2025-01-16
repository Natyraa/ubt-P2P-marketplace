class NotificationSubject {
    constructor() {
      this.observers = [];
    }
  
    addObserver(observer) {
      this.observers.push(observer);
    }
  
    notifyObservers(data) {
        this.observers.forEach((observer) => observer.update(data));
    }

    attach(observer) {
        this.observers.push(observer);
    }
    
    detach(observer) {
        this.observers = this.observers.filter((obs) => obs !== observer);
    }

}
  
  export default NotificationSubject;

  /**The NotificaionSubject class is a key part of the Observer Design Pattern , it maintains a list of observrs such as SMS Observer and EmailObserver , and notifices them when a certain event occurs . The constructor initialized the observers array , which will hold all the observer instances , that need to be modified when an event occurs . An obserber is an object that implements an update() method . When an event occurs the subject will notify all the observers by calling their update() method with some data */
  