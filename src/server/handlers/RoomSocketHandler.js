const SocketHandler = require("./SocketHandler");
const RoomManager = require("../data/room/RoomsManager");
const socketDefs = require("../../common/socket-definitions");
const errorsDefs = require("../../common/errors-definitions");

class RoomSocketHandler extends SocketHandler {

  /**
   * Constructor of RoomSocketHandler class
   * @param socket
   */
  constructor(socket) {
    super(socket);
  }

  /**
   * Create a room and add player to this room
   * @param {string} data.roomName
   * @param {string} data.playerName
   */
  createRoom(data, response) {
    if (RoomManager.hasRoom(data.roomName))
      return false;
    const room = RoomManager.addRoom(data.roomName);
    const user = room.addUser(data.playerName, this.id, true);
    this.sendSuccess(response, room, user);
    return true;
  }

  /**
   * Create a room and add player to this room
   * @param {Object} data
   * @param {string} data.roomName
   * @param {string} data.playerName
   * @param {string} response
   */
  joinRoom(data, response = socketDefs.JOIN_ROOM_RESPONSE) {
    if (this.dataIsValid(data, response)) {
      if (this.createRoom(data, response)) {
        return;
      }
      const room = RoomManager.getRoom(data.roomName);
      if (!room.canJoin())
        this.socket.emit(response, {error: errorsDefs.ROOM_ALREADY_IN_GAME});
      if (room.containUser(data.playerName))
        this.socket.emit(response, {error: errorsDefs.USER_ALREADY_IN_ROOM});
      else {
        const user = room.addUser(data.playerName, this.id);
        this.sendSuccess(response, room, user)
      }
    }
  }

  /**
   * Remove a player from a room
   * @param {string} data.roomName
   * @param {string} data.playerName
   * @param {string} response
   */
  quitRoom(data, response = socketDefs.QUIT_ROOM) {
    if (this.dataIsValid(data, response) && this.roomIsValid(data, response)) {
      const room = RoomManager.getRoom(data.roomName);
      if (!room.containUser(data.playerName))
        this.socket.emit(response, {error: errorsDefs.USER_NOT_IN_ROOM});
      else {
        const user = room.removeUser(data.playerName);
        this.sendSuccess(response, room, user);
      }
    }
  }

  /**
   * Check if data contain data.roomName and data.playerName
   * @param {Object} data
   * @param {string} response
   * @returns {boolean}
   */
  dataIsValid(data, response) {
    if (data.roomName && data.playerName)
      return true;
    else {
      this.socket.emit(response, {error: errorsDefs.UNEXPECTED_DATA});
      return false;
    }
  }

  /**
   * Send success message to the client
   * @param {string} response
   * @param {Room} room
   * @param {User} user
   */
  sendSuccess(response, room, user) {
    this.socket.emit(response, {success: true, room, user})
  }
}

module.exports = RoomSocketHandler;
