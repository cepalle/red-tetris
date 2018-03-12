const Room = require("./Room");

class RoomManager {
  constructor() {
    this.rooms = [];
  }

  getRoom(roomName) {
    if (typeof roomName !== "string")
      return undefined;
    return this.rooms.find(e => e.name === roomName);
  }

  addRoom(roomName) {
    if (typeof roomName !== "string" || this.getRoom(roomName) !== undefined)
      return false;
    this.rooms.push(new Room(roomName));
  }

  destroyRoom(roomName) {
    if (typeof roomName !== "string" || this.getRoom(roomName) === undefined)
      return false;

  }
}
