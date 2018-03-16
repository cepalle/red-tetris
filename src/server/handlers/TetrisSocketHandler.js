const {PIECES} = require("../../common/pieces");
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
    if (this.checkData("grid", data, response)) {
      const room = RoomManager.getRoomById(this.id);
      if (room) {
        const user = room.getUser(this.id);
        PacketSender.sendPlayerPlacePiece(room, data.grid, user);
      }
      else
        this.socket.emit(response, {error: errorsDefs.ROOM_NOT_EXIST});
    }
  }

  /**
   * This will generate 10 pieces to all clients.
   * @param {string} data
   * @param {string} data.roomName
   * @param response
   */
  genFlow(data, response = socketDefs.GENFLOW_RESPONSE) {
    if (this.roomIsValid(data, response))
    {
      const tetrisPieces = [];
      for(let i = 0; i < 10; i++)
        tetrisPieces.push(PIECES[Math.floor(Math.random() * PIECES.length)]);
      this.socket.emit(response, {success: true});
      PacketSender.sendGenFlow(RoomManager.getRoom(data.roomName), tetrisPieces);
    }
  }

  /**
   * Send to all player that a player has loose.
   * @param {Object} data
   * @param {string} data.roomName
   * @param {string} response
   */
  playerLoose(data, response = socketDefs.PLAYER_LOOSE_RESPONSE) {
    if (this.playerCanPlay(data, response))
    {
      const room = RoomManager.getRoom(data.roomName);
      const user = room.getUser(this.id);
      PacketSender.sendPlayerLoose(user, room);
      this.socket.emit(response, {success: true})
    }
  }

  /**
   * Send to all player that a player has complete a line.
   * @param {Object} data
   * @param {string} data.roomName
   * @param {string} response
   */
  playerCompleteLine(data, response = socketDefs.PLAYER_COMPLETE_LINE_RESPONSE) {
    if (this.playerCanPlay(data, response))
    {
      const room = RoomManager.getRoom(data.roomName);
      const user = room.getUser(this.id);
      PacketSender.sendPlayerCompleteLine(user, room);
      this.socket.emit(response, {success: true});
    }
  }

}

module.exports =  TetrisSocketHandler;
