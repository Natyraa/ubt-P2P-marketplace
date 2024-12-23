class AbstractReview {
  constructor(id , reviewerId , revieweeId , rating , comment){
    if (this.contructor === AbstractReview) {
      throw new Error("Abstract Review is an abstract class and cannot be instantianted")
    }
    this.id = id;
    this.reviewerId = reviewerId;
    this.revieweeId = revieweeId;
    this.rating = rating;
    this.comment = comment;
  }

  createReview() {
    throw new Error('Method createReview() must be implemented')
  }
}
export default AbstractReview;
/**This class abstractreview is designed to serve as an abstract class. It cannot be instantiated directly and it provides a blueprint for other review classes like ProductReview , UserReview to extend and implement their own specific behaviors .  Abstract classes are meant to be inhrereted not instantiated directly . Constrcutor method , initialized the properties of an object instance . createReview()  is an abstract method . It doesnt have an implementation here .The purpose here is to force subclasses that extend AbstractReview to provide their own implementation of the createReview . If a subclass does not implement createReview() an error will be thrown */