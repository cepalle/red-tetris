import GameManager from '../data/game/GameManager';
import {ENUM_ERROR} from '@src/common/errors-definitions';
import {Socket} from 'socket.io';

class SocketHandler {
  socket: Socket;
  id: string;

  constructor(socket: Socket) {
    this.socket = socket;
    this.id = socket.id;
  }

  /**
   * Check if a room is valid
   */
  gameIsValid(data: any, response: string): boolean {
    if (!GameManager.getGameById(this.id)) {
      this.socket.emit(response, {error: ENUM_ERROR.ROOM_NOT_EXIST});
      return false;
    }
    return true;
  }

  playerCanPlay(data: any, response: string): boolean {
    if (this.gameIsValid(data, response)) {
      const game = GameManager.getGameById(this.id);
      const player = game.getPlayer(this.id);
      if (data.playerName && player.playerName !== data.playerName) {
        this.socket.emit(response, {error: ENUM_ERROR.ROOM_NOT_EXIST});
        return false;
      } else {
        if (!game.waiting && !player.loose) {
          return true;
        }
        this.socket.emit(response, {error: ENUM_ERROR.PLAYER_CANT_PLAY});
      }
    }
    return false;
  }

  /**
   * Check if the player is master
   */
  playerIsMaster(response: string): boolean {
    if (!GameManager.getGameById(this.id).getPlayer(this.id).master) {
      this.socket.emit(response, {error: ENUM_ERROR.PLAYER_NOT_MASTER});
      return false;
    }
    return true;
  }

  /**
   * Check if data was present
   */
  checkData(check: string, data: any, response: string): boolean {
    const split = check.split(',');
    for (let i = 0; i < split.length; i++) {
      const key = split[i];
      if (!data[key]) {
        this.socket.emit(response, {error: ENUM_ERROR.UNEXPECTED_DATA});
        return false;
      }
      if (key === 'roomName' && !GameManager.getGame(data.roomName).name === data[key]) {
        this.socket.emit(response, {error: ENUM_ERROR.UNEXPECTED_DATA});
        return false;
      }
    }
    return true;
  }
}

export {SocketHandler};
