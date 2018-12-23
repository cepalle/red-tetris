import {SocketHandler} from '@src/server/handlers/SocketHandler';
import {ENUM_SOCKET_DEF} from '@src/common/socket-definitions';
import {Socket} from 'socket.io';
import {roomManager} from '@src/server/data/game/GameManager';

class GlobalSocketHandler extends SocketHandler {

  /**
   * Constructor of RoomSocketHandler class
   * @param socket
   */
  constructor(socket: Socket) {
    super(socket);
  }

  /**
   * This is used when a client join the socket
   * @param {string} response
   */
  connection(response: string = ENUM_SOCKET_DEF.CONNECTION_RESPONSE) {
    this.socket.emit(response);
  }

  home(response: string = ENUM_SOCKET_DEF.HOME_RESPONSE) {
    this.socket.emit(response, {games: roomManager});
  }
}

export {GlobalSocketHandler};
