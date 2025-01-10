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
  