import Room from "./Game";

class GameManager {

  constructor() {
    /** @type {Array<Game>} */
    this.rooms = [];
  }

  /**
   * Get game from a name,
   * @param {string} roomName
   * @returns {Game}
   */
  getGame(roomName) {
    return this.rooms.find(e => e.name === roomName);
  }

  /**
   * Get a game by id of socket.io
   * @param {string} id
   * @returns {Game | undefined}
   */
  getGameById(id) {
    return this.rooms.find(e => {
      return e.players.some(e => e.id === id);
    })
  }

  /**
   * Return true if a game with that name exist or false else
   * @param {string} roomName
   * @returns {boolean}
   */
  hasGame(roomName) {
    if (typeof roomName !== "string")
      return false;
    return this.getGame(roomName) !== undefined;
  }

  /**
   * Add a game to the GameManager
   * @param roomName
   * @returns {Game | boolean}
   */
  addGame(roomName) {
    if (this.getGame(roomName) !== undefined)
      return false;
    const room = new Room(roomName);
    this.rooms.push(room);
    return room;
  }

  /**
   * Destroy a game with name roomName, before that, remove all player from room properly
   * @param {string} roomName
   * @returns {boolean}
   */
  deleteGame(roomName) {
    if (this.getGame(roomName) === undefined)
      return false;
    const room = this.getGame(roomName);
    this.rooms.removeObj(room);
    return true;
  }

}

const rm =  new GameManager();

export default rm;
