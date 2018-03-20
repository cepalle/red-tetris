import Room from "./Room";

class RoomManager {

  constructor() {
    /** @type {Array<Room>} */
    this.rooms = [];
  }

  /**
   * Get room from a name,
   * @param {string} roomName
   * @returns {Room}
   */
  getRoom(roomName) {
    return this.rooms.find(e => e.name === roomName);
  }

  /**
   * Get a room by id of socket.io
   * @param {string} id
   * @returns {Room | undefined}
   */
  getRoomById(id) {
    return this.rooms.find(e => {
      return e.players.some(e => e.id === id);
    })
  }

  /**
   * Return true if a room with that name exist or false else
   * @param {string} roomName
   * @returns {boolean}
   */
  hasRoom(roomName) {
    if (typeof roomName !== "string")
      return false;
    return this.getRoom(roomName) !== undefined;
  }

  /**
   * Add a room to the RoomManager
   * @param roomName
   * @returns {Room | boolean}
   */
  addRoom(roomName) {
    if (this.getRoom(roomName) !== undefined)
      return false;
    const room = new Room(roomName);
    this.rooms.push(room);
    return room;
  }

  /**
   * Destroy a room with name roomName, before that, remove all player from room properly
   * @param {string} roomName
   * @returns {boolean}
   */
  deleteRoom(roomName) {
    if (this.getRoom(roomName) === undefined)
      return false;
    const room = this.getRoom(roomName);
    this.rooms.removeObj(room);
    return true;
  }

}

const rm =  new RoomManager();

export default rm;
