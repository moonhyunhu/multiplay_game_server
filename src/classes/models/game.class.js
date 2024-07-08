import { createLocationPacket } from '../../utils/notification/game.notification.js';

const MAX_PLAYERS = 10;

class Game {
  constructor(id) {
    this.id = id;
    this.users = [];
    this.state = 'waiting'; // 'waiting', 'inProgress'
  }

  addUser(user) {
    if (this.users.length >= MAX_PLAYERS) {
      throw new Error('Game session is full');
    }
    this.users.push(user);
    this.startGame();

  }

  getUser(userId) {
    return this.users.find((user) => user.id === userId);
  }

  removeUser(userId) {
    this.users = this.users.filter((user) => user.id !== userId);

    if (this.users.length < MAX_PLAYERS) {
      this.state = 'waiting';
    }
  }

  startGame() {
    this.state = 'inProgress';
  }

  getAllplayerLocation() {
    const allLocation = this.users.map((user) => {
      return {
        id: user.id,
        playerId: user.playerId,
        x: user.x,
        y: user.y,
      };
    });
    return createLocationPacket(allLocation);
  }

  getExceptMePlayerLocation(userId) {
    const allLocation = this.users.map((user) => {
      return {
        id: user.id,
        playerId: user.playerId,
        x: user.x,
        y: user.y,
      };
    });
    
    const exceptMeLocation = allLocation.filter((user) => user.id !== userId);
    return createLocationPacket(exceptMeLocation);
  }
}

export default Game;
