import SocketHandler from "./SocketHandler";
import GameManager from "../data/game/GameManager";
import socketDefs from "../../common/socket-definitions";
import errorsDefs from "../../common/errors-definitions";
import PacketSender from "../packet/PacketSender";

class RoomSocketHandler extends SocketHandler {

  /**
   * Constructor of RoomSocketHandler class
   * @param socket
   */
  constructor(socket) {
    super(socket);
  }

  /**
   * Create a room and add player to this room
   * @param {string} data.roomName
   * @param {string} data.playerName
   */
  createRoom(data, response) {
    if (GameManager.hasGame(data.roomName))
      return false;
    const game = GameManager.addGame(data.roomName);
    const player = game.addPlayer(data.playerName, this.id, true);
    this.sendSuccess(response, game, player);
    return true;
  }

  /**
   * Create a room and add player to this room
   * @param {Object} data
   * @param {string} data.roomName
   * @param {string} data.playerName
   * @param {string} response
   */
  joinGame(data, response = socketDefs.JOIN_GAME_RESPONSE) {
    if (this.dataIsValid(data, response)) {
      if (this.createRoom(data, response)) {
        return;
      }
      const game = GameManager.getGame(data.roomName);
      if (game.containId(this.id) || game.containPlayer(data.playerName))
        this.socket.emit(response, {error: errorsDefs.PLAYER_ALREADY_IN_ROOM});
      else {
        const player = game.addPlayer(data.playerName, this.id);
        this.sendSuccess(response, game, player)
      }
    }
  }

  /**
   * Remove a player from a room
   * @param {string} data.roomName
   * @param {string} data.playerName
   * @param {string} response
   */
  quitGame(data, response = socketDefs.QUIT_GAME) {
    if (this.dataIsValid(data, response) && this.gameIsValid(data, response)) {
      const game = GameManager.getGame(data.roomName);
      if (!game.containId(this.id))
        this.socket.emit(response, {error: errorsDefs.PLAYER_NOT_IN_ROOM});
      else {
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
  startPlaying(data, response = socketDefs.START_PLAYING_RESPONSE) {
    if (this.checkData("roomName", data, response) &&
      this.gameIsValid(data, response) &&
      this.playerIsMaster(response)) {
      const game = GameManager.getGameById(this.id);
      if (!game.waiting) {
        this.socket.emit(response, {error: errorsDefs.ROOM_ALREADY_IN_GAME})
      }
      else {
        if (data.params) game.setParams(data.params);
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
  dataIsValid(data, response) {
    if (data.roomName && data.playerName)
      return true;
    else {
      this.socket.emit(response, {error: errorsDefs.UNEXPECTED_DATA});
      return false;
    }
  }

  /**
   * Send success message to the client
   * @param {string} response
   * @param {Game} game
   * @param {Player} player
   */
  sendSuccess(response, game, player) {
    this.socket.emit(response, {success: true, game, player})
  }

}

export default RoomSocketHandler;
