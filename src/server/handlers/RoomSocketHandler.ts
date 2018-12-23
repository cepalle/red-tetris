import GameManager from '../data/game/GameManager';
import {Socket} from 'socket.io';
import {IGame, IPlayerState} from '@src/common/IType';
import {SocketHandler} from '@src/server/handlers/SocketHandler';
import {ENUM_SOCKET_DEF} from '@src/common/socket-definitions';
import {ENUM_ERROR} from '@src/common/errors-definitions';

class RoomSocketHandler extends SocketHandler {

  /**
   * Constructor of RoomSocketHandler class
   */
  constructor(socket: Socket) {
    super(socket);
  }

  /**
   * Create a room and add player to this room
   */
  createRoom(data: any, response: string): boolean {
    if (GameManager.hasGame(data.roomName)) {
      return false;
    }
    const game = GameManager.addGame(data.roomName);
    const player = game.addPlayer(data.playerName, this.id, true);
    this.sendSuccess(response, game, player);
    return true;
  }

  /**
   * Create a room and add player to this room
   */
  joinGame(data: any, response: string = ENUM_SOCKET_DEF.JOIN_GAME_RESPONSE): void {
    if (this.dataIsValid(data, response)) {
      if (this.createRoom(data, response)) {
        return;
      }
      const game = GameManager.getGame(data.roomName);
      if (game.containId(this.id) || game.containPlayer(data.playerName)) {
        this.socket.emit(response, {error: ENUM_ERROR.PLAYER_ALREADY_IN_ROOM});
      } else {
        const player = game.addPlayer(data.playerName, this.id);
        this.sendSuccess(response, game, player);
      }
    }
  }

  /**
   * Remove a player from a room
   */
  quitGame(data: any, response: string = ENUM_SOCKET_DEF.QUIT_GAME): void {
    if (this.dataIsValid(data, response) && this.gameIsValid(data, response)) {
      const game = GameManager.getGame(data.roomName);
      if (!game || !game.containId(this.id)) {
        this.socket.emit(response, {error: ENUM_ERROR.PLAYER_NOT_IN_ROOM});
      } else {
        const player = game.removePlayer(data.playerName);
        this.sendSuccess(response, game, player);
      }
    }
  }

  /**
   * Set the getState of the room to avoid player join in a game that has already started.
   * @param {string} data
   * @param {string} data.roomName
   * @param {object} data.params
   * @param {boolean} data.params.addWallLine
   * @param {boolean} data.params.groundResizer
   * @param response
   */
  startPlaying(data: any, response: string = ENUM_SOCKET_DEF.START_PLAYING_RESPONSE) {
    if (this.checkData('roomName', data, response) &&
      this.gameIsValid(data, response) &&
      this.playerIsMaster(response)) {
      const game = GameManager.getGameById(this.id);
      if (!game.waiting) {
        console.log('hey');
        this.socket.emit(response, {error: ENUM_ERROR.ROOM_ALREADY_IN_GAME});
      } else {
        if (data.params) {
          game.setParams(data.params);
        }
        game.setWaiting(false);
        this.socket.emit(response, {success: true});
      }
    }
  }

  /**
   * Check if data contain data.roomName and data.playerName
   * @param {Object} data
   * @param {string} response
   * @returns {boolean}
   */
  dataIsValid(data: any, response: string) {
    if (data.roomName && data.playerName) {
      return true;
    } else {
      this.socket.emit(response, {error: ENUM_ERROR.UNEXPECTED_DATA});
      return false;
    }
  }

  /**
   * Send success message to the client
   * @param {string} response
   * @param {Game} game
   * @param {Player} player
   */
  sendSuccess(response: string, game: IGame, player: IPlayerState) {
    this.socket.emit(response, {success: true, game, player});
  }

}

export {RoomSocketHandler};
