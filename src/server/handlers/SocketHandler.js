const RoomManager = require("../data/room/RoomsManager");
const errorsDefs = require("../../common/errors-definitions");

class SocketHandler {
  constructor(socket) {
    this.socket = socket;
    this.id = socket.id;
  }

  /**
   * Check if a room is valid
   * @param {Object} data
   * @param {string} response
   * @returns {boolean}
   */
  roomIsValid(data, response) {
    if (!RoomManager.hasRoom(data.roomName)) {
      this.socket.emit(response, {error: errorsDefs.ROOM_NOT_EXIST});
      return false;
    }
    return true;
  }

  /**
   * Check if the player is master
   * @param {string} response
   * @returns {boolean}
   */
  playerIsMaster(response) {
    if (!RoomManager.getRoomById(this.id).getUser(this.id)) {
      this.socket.emit(response, {error: errorsDefs.USER_NOT_MASTER});
      return false;
    }
  }
}

module.exports = SocketHandler;
