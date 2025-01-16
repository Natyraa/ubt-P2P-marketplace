import Peer from 'simple-peer';
import wrtc from 'wrtc';
import readline from 'readline';

class P2PController {
  static initiateConnection(user1, user2) {
    console.log(`[INFO] Initiating P2P connection between ${user1.name} and ${user2.name}`);

    const peer1 = new Peer({ initiator: true, wrtc });
    const peer2 = new Peer({ wrtc });

    // Create readline interfaces for both users
    const rl1 = this.createReadlineInterface(user1);
    const rl2 = this.createReadlineInterface(user2);

    // Signal handling
    this.setupSignalHandling(peer1, peer2);

    // Message handling
    this.setupMessageHandling(peer1, user1, rl1);
    this.setupMessageHandling(peer2, user2, rl2);

    // Clean up and graceful shutdown
    this.setupGracefulShutdown(peer1, peer2, rl1, rl2);
  }

  // Function to create readline interface
  static createReadlineInterface(user) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.setPrompt(`${user.name}: `);
    rl.prompt();
    return rl;
  }

  // Function to handle signaling data
  static setupSignalHandling(peer1, peer2) {
    peer1.on('signal', (data) => {
      console.log('[SIGNAL] Sending signal to peer2');
      peer2.signal(data);
    });

    peer2.on('signal', (data) => {
      console.log('[SIGNAL] Sending signal to peer1');
      peer1.signal(data);
    });
  }

  // Function to handle message input and output
  static setupMessageHandling(peer, user, rl) {
    rl.on('line', (input) => {
      if (input === 'exit') {
        peer.destroy();
        rl.close();
        console.log(`${user.name} disconnected.`);
        process.exit();
      }

      const messageData = JSON.stringify({ sender: user.name, message: input });
      peer.send(messageData);
      console.log(`[SENT] ${user.name}: ${input}`);
      rl.prompt();
    });

    peer.on('data', (data) => {
      try {
        const { sender, message } = JSON.parse(data.toString());
        console.log(`[RECEIVED] ${sender} says: ${message}`);
        rl.prompt();
      } catch (error) {
        console.error('[ERROR] Failed to process incoming message:', error);
      }
    });
  }

  // Graceful shutdown on SIGINT
  static setupGracefulShutdown(peer1, peer2, rl1, rl2) {
    process.on('SIGINT', () => {
      console.log('[INFO] Closing connections and exiting...');
      peer1.destroy();
      peer2.destroy();
      rl1.close();
      rl2.close();
      process.exit();
    });
  }
}

// Example usage
const jane = { name: 'Jane Doe' };
const john = { name: 'John Smith' };

// Uncomment the line below to initiate connection
// P2PController.initiateConnection(jane, john);

export default P2PController;
