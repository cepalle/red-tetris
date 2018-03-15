const SocketHandler = require("./SocketHandler");
const RoomManager = require("../data/room/RoomsManager");
const PacketSender = require("../packet/PacketSender");
const socketDefs = require("../../common/socket-definitions");
const errorsDefs = require("../../common/errors-definitions");

class TetrisSocketHandler extends SocketHandler {
  constructor(socket) {
    super(socket);
  }

  /**
   * Call when a player place a piece.
   * @param {Array<Array<number>>} data.grid
   */
  placePiece(data, response = socketDefs.TETRIS_PLACE_PIECE_RESPONSE) {
    if (!data.grid) {
      this.socket.emit(response, {error: errorsDefs.UNEXPECTED_DATA});
      return ;
    }
    const room = RoomManager.getRoomById(this.id);
    if (room) {
      const user = room.getUser(this.id);
      PacketSender.sendPlayerPlacePiece(room, data.grid, user);
    }
    else
      this.socket.emit(response, {error: errorsDefs.ROOM_NOT_EXIST});
  }
}

module.exports =  TetrisSocketHandler;
