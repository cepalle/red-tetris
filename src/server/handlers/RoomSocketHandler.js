
const RoomManager = require("../data/room/RoomsManager");
const socketDefs = require("../../common/socket-definitions");

const ERRORS = {
  UNEXPECTED_DATA: {
    type: "UNEXPECTED_DATA",
    message: "An unknown data can not be processed."
  },
  ROOM_EXIST: {
    type: "ROOM_EXIST",
    message: "Room already exist."
  },
  ROOM_NOT_EXIST: {
    type: "ROOM_NOT_EXIST",
    message: "Room not exist."
  },
  ROOM_ALREADY_IN_GAME: {
    type: "ROOM_NOT_EXIST",
    message: "Room is already in game."
  },
  USER_ALREADY_IN_ROOM: {
    type: "USER_ALREADY_IN_ROOM",
    message: "An user with the same name is already in this room."
  },
  USER_NOT_IN_ROOM: {
    type: "USER_NOT_IN_ROOM",
    message: "User is not in the room."
  }
};

class RoomSocketHandler {

  /**
   * Constructor of RoomSocketHandler class
   * @param socket
   */
  constructor(socket) {
    this.socket = socket;
    this.id = socket.id;
  }

  /**
   * Create a room and add player to this room
   * @param {string} data.roomName
   * @param {string} data.playerName
   */
  createRoom(data, response = socketDefs.CREATE_ROOM) {
    if (this.dataIsValid(data, response)) {
      if (RoomManager.hasRoom(data.roomName)) {
        this.socket.emit(response, {error: ERRORS.ROOM_EXIST});
        return;
      }
      const room = RoomManager.addRoom(data.roomName);
      const user = room.addUser(data.playerName, this.id, true);
      this.sendSuccess(response, room, user);
    }
  }

  /**
   * Create a room and add player to this room
   * @param {Object} data
   * @param {string} data.roomName
   * @param {string} data.playerName
   * @param {string} response
   */
  joinRoom(data, response = socketDefs.CREATE_ROOM_RESPONSE) {
    if (this.dataIsValid(data, response) && this.roomIsValid(data, response)) {
      const room = RoomManager.getRoom(data.roomName);
      if (!room.canJoin())
        this.socket.emit(response, {error: ERRORS.ROOM_ALREADY_IN_GAME});
      if (room.containUser(data.playerName))
        this.socket.emit(response, {error: ERRORS.USER_ALREADY_IN_ROOM});
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
        this.socket.emit(response, {error: ERRORS.USER_NOT_IN_ROOM});
      else {
        const user = room.removeUser(data.playerName);
        this.sendSuccess(response, room, user);
      }
    }
  }

  /**
   *
   * @param {Object} data
   * @param {string} response
   * @returns {boolean}
   */
  roomIsValid(data, response) {
    if (!RoomManager.hasRoom(data.roomName)) {
      this.socket.emit(response, {error: ERRORS.ROOM_NOT_EXIST});
      return false;
    }
    return true;
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
      this.socket.emit(response, {error: ERRORS.UNEXPECTED_DATA});
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
