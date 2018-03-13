const Room = require("./Room");

class RoomManager {

  constructor() {
    console.log("Initialisation of RoomManager");
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
   * @returns {(Room, boolean)}
   */
  addRoom(roomName) {
    if (this.getRoom(roomName) !== undefined)
      return false;
    const room = new Room(roomName);
    this.rooms.push(room);
    return room;
  }

  /**
   * Destroy a room with name roomName, before that, remove all user from room properly
   * @param roomName
   * @returns {boolean}
   */
  destroyRoom(roomName) {
    if (typeof roomName !== "string" || this.getRoom(roomName) === undefined)
      return false;
    const room = this.getRoom(roomName);
    if (room.getUsers().length === 0)
      return false;
    room.getUsers().forEach(e => {
      room.removeUser(e.username);
    });
    return true;
  }
}

const rm =  new RoomManager();

module.exports = rm;
