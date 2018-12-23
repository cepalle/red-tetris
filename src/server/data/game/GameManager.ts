import {Game} from './Game';

class GameManager {

  rooms: Game[];

  constructor() {
    this.rooms = [];
  }

  /**
   * Get game from a name,
   */
  getGame(roomName: string): Game | undefined {
    return this.rooms.find(e => e.name === roomName);
  }

  /**
   * Get a game by id of socket.io
   */
  getGameById(id: string): Game | undefined {
    return this.rooms.find(e => {
      return e.players.some(el => el.id === id);
    });
  }

  /**
   * Return true if a game with that name exist or false else
   */
  hasGame(roomName: string): boolean {
    if (typeof roomName !== 'string') {
      return false;
    }
    return this.getGame(roomName) !== undefined;
  }

  /**
   * Add a game to the GameManager
   */
  addGame(roomName: string): Game | undefined {
    if (this.getGame(roomName) !== undefined) {
      return undefined;
    }
    const room = new Game(roomName);
    this.rooms.push(room);
    return room;
  }

  /**
   * Destroy a game with name roomName
   */
  deleteGame(roomName: string): boolean {
    if (this.getGame(roomName) === undefined) {
      return false;
    }
    const room = this.getGame(roomName);
    this.rooms.filter((r) => r === room);
    return true;
  }

}

const roomManager = new GameManager();

export {roomManager};
