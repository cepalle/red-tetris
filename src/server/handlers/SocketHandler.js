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
    if (!RoomManager.getRoomById(this.id)) {
      this.socket.emit(response, {error: errorsDefs.ROOM_NOT_EXIST});
      return false;
    }
    return true;
  }

  playerCanPlay(data, response) {
    if (this.roomIsValid(data, response)) {
      const room = RoomManager.getRoomById(this.id);
      const user = room.getUser(this.id);
      if (data.playerName && user.username !== data.playerName)
      {
        this.socket.emit(response, {error: errorsDefs.ROOM_NOT_EXIST});
        return false;
      }
      else {
        if (!room.waiting && !user.loose)
          return true;
        this.socket.emit(response, {error: errorsDefs.USER_CANT_PLAY});
      }
    }
    return false;
  }

  /**
   * Check if the player is master
   * @param {string} response
   * @returns {boolean}
   */
  playerIsMaster(response) {
    if (!RoomManager.getRoomById(this.id).getUser(this.id).master) {
      this.socket.emit(response, {error: errorsDefs.USER_NOT_MASTER});
      return false;
    }
    return true;
  }

  /**
   * Check if data was present
   * @param {string} check - a list of string separated by a comma
   * @param {Object} data
   * @param {string} response
   */
  checkData(check, data, response) {
    const split = check.split(",");
    for (let i = 0; i < split.length; i++) {
      const key = split[i];
      if (!data[key])
      {
        this.socket.emit(response, {error: errorsDefs.UNEXPECTED_DATA});
        return false;
      }
      if (key === "roomName" && !RoomManager.getRoomById(this.id).name === data[key])
      {
        this.socket.emit(response, {error: errorsDefs.UNEXPECTED_DATA});
        return false;
      }
    }
    return true;
  }
}

module.exports = SocketHandler;
