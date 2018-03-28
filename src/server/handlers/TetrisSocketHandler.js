import {PIECES} from "../../common/pieces";
import SocketHandler from "./SocketHandler";
import GameManager from "../data/game/GameManager";
import PacketSender from "../packet/PacketSender";
import socketDefs from "../../common/socket-definitions";
import errorsDefs from "../../common/errors-definitions";
import Piece from "../data/piece/Piece";

const LINE_SCORE = [40,100,300,1200,2500,3500];

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
      const game = GameManager.getGameById(this.id);
      if (game) {
        const player = game.getPlayer(this.id);
        PacketSender.sendPlayerPlacePiece(game, data.grid, player);
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
    if (this.gameIsValid(data, response))
    {
      const tetrisPieces = Piece.generatePieces(10);
      this.socket.emit(response, {success: true});
      PacketSender.sendGenFlow(GameManager.getGame(data.roomName), tetrisPieces);
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
      const game = GameManager.getGame(data.roomName);
      const player = game.getPlayer(this.id);
      player.loose = true;
      PacketSender.sendPlayerLoose(player, game);
      this.socket.emit(response, {success: true});
      game.gameHasEnd();
    }
  }

  /**
   * Send to all player that a player has complete a line.
   * @param {Object} data
   * @param {string} data.roomName
   * @param {number} data.amount
   * @param {string} response
   */
  playerCompleteLine(data, response = socketDefs.PLAYER_COMPLETE_LINE_RESPONSE) {
    if (this.playerCanPlay(data, response))
    {
      const game = GameManager.getGame(data.roomName);
      const player = game.getPlayer(this.id);
      player.lines += data.amount || 1;
      player.score += LINE_SCORE[(data.amount || 1) - 1];
      if (game.params.addWallLine)
        PacketSender.sendPlayerCompleteLine(player, game, data.amount || 1);
      this.socket.emit(response, {success: true, game});
    }
  }
}

export default TetrisSocketHandler;
