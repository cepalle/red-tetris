import SocketHandler from "./SocketHandler";
import socketDefs from "../../common/socket-definitions";

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

export default GlobalSocketHandler;
