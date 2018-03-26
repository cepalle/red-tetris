import SocketHandler from "./SocketHandler";
import socketDefs from "../../common/socket-definitions";
import GameManager from "../data/game/GameManager"
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

  home(response = socketDefs.HOME_RESPONSE) {
    this.socket.emit(response, {games: GameManager})
  }
}

export default GlobalSocketHandler;
