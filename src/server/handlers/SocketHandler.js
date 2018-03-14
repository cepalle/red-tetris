class SocketHandler {
  constructor(socket) {
    this.socket = socket;
    this.id = socket.id;
  }

  /**
   *
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
}

module.exports = SocketHandler;
