Abstract class is in src/models/AbstractUser
Class is in src/models/Buyer.
Enumartion is in src/enums/userRole.js
Interface ????
expection class in utils/USerNotFoundExcpetion
Analyze more static methods

polymorphism - in displayInnfo - src/models/AbstractUser

3 levels of inheritance AbstractUser/Buyer/PremiumBuyer/Vip Buyer

install dependencies 
 npm init -y
npm install inquirer webrtc-adapter
npm install simple-peer
npm install -g node-pre-gyp
npm install wrtc
npm install readline
observer pattern on notificons controller
singletonpattern on shopping cart controller


Observer - a new event happens - a transaction for example , the NotificationSubject is responsible for sending out notifications . The NotificaionSubject call notifyObserves(data) mehod to notify all observer (EmailObserver and SMSObserver)
The EmailObserver and SMSObserver recieieve the notification via thei update() method and decide how to send it (email or SMS) . EmailObserver send an email and SMSObserver send an SMS . Both may log the notfications to a file or database.
Summary - THe observer is the recipient , The subject send out the notification and updated the observers . Each observer (Email SMSObserver) handles the notification on its own way. The subject doesnt know the details about the observers , it just notifies them when needed . in our case is NotificationSubject which calls the update method in the observer no notify all the observers . NotificationSubject keeps track of registered observers . When a new transaction occurs it calls the update method 