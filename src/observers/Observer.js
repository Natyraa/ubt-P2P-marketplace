class Observer {
    update(data) {
      throw new Error("Observer 'update' method must be implemented.");
    }
  }
  
  export default Observer;
  