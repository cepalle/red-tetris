const SocketHandler = require("./SocketHandler");
const PacketSender = require("../packet/PacketSender");
const socketDefs = require("../../common/socket-definitions");
const {PARTS} = require("../../common/parts");
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

  /**
   * This will generate 10 pieces to all clients
   * @param {string} data
   * @param {string} data.roomName
   * @param response
   */
  genFlow(data, response = socketDefs.GENFLOW_RESPONSE) {
    if (super.roomIsValid(data, response))
    {
      const tetrisPieces = [];
      for(let i = 0; i < 10; i++)
        tetrisPieces.push(PARTS[Math.floor(Math.random() * PARTS.length)]);
      this.socket.emit(response, {success: true});
      PacketSender.sendGenFlow(RoomManager.getRoom(data.roomName), tetrisPieces);
    }
  }
}

module.exports = GlobalSocketHandler;
