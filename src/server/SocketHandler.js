
const RoomManager = require("RoomsManager");

//----------------------------------------------------------------------------
//
// Event Socket.io Server side
// createRoom    = {roomName, playerName}
// joinRoom      = {roomName, playerName}
// quitRoom      = {roomName, playerName}
// startPlaying  = {roomName, playerName}
//
// Event Socket.io Client side
// createRoomResponse    = {error: {type, message}} || {success}
// joinRoomResponse      = {error: {type, message}} || {success}
// quitRoomResponse      = {error: {type, message}} || {success}
// startPlayingResponse  = {error: {type, message}} || {success}
//
//----------------------------------------------------------------------------

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
  }
};

class SocketHandler {

  constructor(socket) {
    this.socket = socket;
    this.id = socket.id;
  }

  /**
   * Create a room and add player to this room
   * @param {string} data.roomName
   * @param {string} data.playerName
   */
  createRoom(data, response = "createRoomResponse") {
    if (this.dataIsValid(data, response)) {
      if (RoomManager.hasRoom(data.roomName)) {
        this.socket.emit(response, {error: ERRORS.ROOM_EXIST});
        return;
      }
      RoomManager.addRoom(data.roomName).addUser(data.playerName, this.id);
      this.socket.emit(response, {success: true})
    }
  }

  /**
   * Create a room and add player to this room
   * @param {string} data.roomName
   * @param {string} data.playerName
   */
  joinRoom(data, response = "joinRoomResponse") {
    if (this.dataIsValid(data, response)) {
      if (!RoomManager.hasRoom(data.roomName)) {
        this.socket.emit(response, {error: ERRORS.ROOM_NOT_EXIST});
        return;
      }
      if (!RoomManager.getRoom(data.roomName).canJoin())
    }
  }

  /**
   * Check if data contain data.roomName and data.playerName
   * @param data
   * @param response
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

}
