const Peer = require('simple-peer');
//import Peer from 'simple-peer';

class P2PController {
  static initiateConnection(user1, user2) {
    // Use WebRTC to establish a P2P connection
    console.log(`Initiating P2P connection between ${user1.name} and ${user2.name}`);
    const peer1 = new Peer({ initiator: true });
    const peer2 = new Peer();

    peer1.on('signal', data => {
      // Send signaling data to user2
    });

    peer2.on('signal', data => {
      // Send signaling data to user1
    });
    // Placeholder for WebRTC code here
  }
}

export default  P2PController;

/**class P2PController encapsulates behavior related to P2P connection 
 * Static methot initateConnectio meand that the method belongs to the class itself not to instances of the class . it can be called directly on the class like P2PCONTROLLER.initateConnection without creating an instance of the P2PCONTROLLER
 * initiateConecction is a method that takes two parameters usser1 and user2 . There are expected to be objects that represent users (in this case the two users involved in the P2P connectioon)
 * The updated version of your code imports simple-peer, a popular library that simplifies WebRTC connections in JavaScript. The simple peer library is imported using require . It simplifies the process of creating WebRTV coneections between peers . 
 * peer1 and peer2 are instanced of the peer class , that was created using the simple-peer library 
 * peer1 is initialized with the option initiatiator : true , which means that this peer will be the one to initiate the connection . peer2 is created without the initiator option, so it will wait for  a signal from peer1 to establish the connection
 * peer1.on('signal) listens for the signal event on peer1 , which is triggered when peer1 has signaling data ready to be sent to the other pear , in this case peer2 . The data recieved in the signal event will containt important signalin information like offers or ICE candidatas that need to be sent to peer2
 */
