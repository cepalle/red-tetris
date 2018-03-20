import GameManager from "../data/game/GameManager";
import errorsDefs from "../../common/errors-definitions";

class SocketHandler {
  constructor(socket) {
    this.socket = socket;
    this.id = socket.id;
  }

  /**
   * Check if a room is valid
   * @param {Object} data
   * @param {string} response
   * @returns {boolean}
   */
  gameIsValid(data, response) {
    if (!GameManager.getGameById(this.id)) {
      this.socket.emit(response, {error: errorsDefs.ROOM_NOT_EXIST});
      return false;
    }
    return true;
  }

  playerCanPlay(data, response) {
    if (this.gameIsValid(data, response)) {
      const game = GameManager.getGameById(this.id);
      const player = game.getPlayer(this.id);
      if (data.playerName && player.playerName !== data.playerName)
      {
        this.socket.emit(response, {error: errorsDefs.ROOM_NOT_EXIST});
        return false;
      }
      else {
        if (!game.waiting && !player.loose)
          return true;
        this.socket.emit(response, {error: errorsDefs.PLAYER_CANT_PLAY});
      }
    }
    return false;
  }

  /**
   * Check if the player is master
   * @param {string} response
   * @returns {boolean}
   */
  playerIsMaster(response) {
    if (!GameManager.getGameById(this.id).getPlayer(this.id).master) {
      this.socket.emit(response, {error: errorsDefs.PLAYER_NOT_MASTER});
      return false;
    }
    return true;
  }

  /**
   * Check if data was present
   * @param {string} check - a list of string separated by a comma
   * @param {Object} data
   * @param {string} response
   */
  checkData(check, data, response) {
    const split = check.split(",");
    for (let i = 0; i < split.length; i++) {
      const key = split[i];
      if (!data[key])
      {
        this.socket.emit(response, {error: errorsDefs.UNEXPECTED_DATA});
        return false;
      }
      if (key === "roomName" && !GameManager.getGameById(this.id).name === data[key])
      {
        this.socket.emit(response, {error: errorsDefs.UNEXPECTED_DATA});
        return false;
      }
    }
    return true;
  }
}

export default SocketHandler;
