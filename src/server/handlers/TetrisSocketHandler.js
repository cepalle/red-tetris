const SocketHandler = require("./SocketHandler");
const RoomManager = require("../data/room/RoomsManager");
const PacketSender = require("../packet/PacketSender");

class TetrisSocketHandler extends SocketHandler {
  constructor(socket) {
    super(socket);
  }

  /**
   * Call when a player place a piece.
   * @param {Array<Array<number>>} data.grid
   */
  placePiece(data) {
    const room = RoomManager.getRoomById(this.id);
    if (room) {
      const user = room.getUser(this.id);
      PacketSender.sendPlayerPlacePiece(room, data.grid, user);
    }
  }
}

module.exports =  TetrisSocketHandler;
