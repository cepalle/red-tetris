const SocketHandler = require("./SocketHandler");
const PacketSender = require("../packet/PacketSender");
const socketDefs = require("../../common/socket-definitions");
const {PIECES} = require("../../common/pieces");
const RoomManager = require("../data/room/RoomsManager");

class GlobalSocketHandler extends SocketHandler {

  /**
   * Constructor of RoomSocketHandler class
   * @param socket
   */
  constructor(socket) {
    super(socket);
  }

  /**
   * This is used when a client join the socket
   * @param {string} response
   */
  connection(response = socketDefs.CONNECTION_RESPONSE) {
    this.socket.emit(response);
  }
}

module.exports = GlobalSocketHandler;
