import GameManager from '../data/game/GameManager';
import {Socket} from 'socket.io';
import {ENUM_SOCKET_DEF} from '@src/common/socket-definitions';
import {ENUM_ERROR} from '@src/common/errors-definitions';
import {ENUM_PIECES} from '@src/common/IType';
import {SocketHandler} from '@src/server/handlers/SocketHandler';
import {PacketSender} from '@src/server/packet/PacketSender';
import {Piece} from '@src/server/data/piece/Piece';

const LINE_SCORE = [40, 100, 300, 1200, 2500, 3500];

class TetrisSocketHandler extends SocketHandler {

  constructor(socket: Socket) {
    super(socket);
  }

  /**
   * Call when a player place a piece.
   */
  placePiece(data: { grid: ENUM_PIECES[][] }, response: string = ENUM_SOCKET_DEF.TETRIS_PLACE_PIECE_RESPONSE): void {
    if (this.checkData('grid', data, response)) {
      const game = GameManager.getGameById(this.id);
      if (game) {
        const player = game.getPlayer(this.id);
        PacketSender.sendPlayerPlacePiece(game, data.grid, player);
      } else {
        this.socket.emit(response, {error: ENUM_ERROR.ROOM_NOT_EXIST});
      }
    }
  }

  /**
   * This will generate 10 pieces to all clients.
   */
  genFlow(data: any, response: string = ENUM_SOCKET_DEF.GENFLOW_RESPONSE): void {
    if (this.gameIsValid(data, response)) {
      const tetrisPieces = Piece.generatePieces(10);
      this.socket.emit(response, {success: true});
      PacketSender.sendGenFlow(GameManager.getGame(data.roomName), tetrisPieces);
    }
  }

  /**
   * Send to all player that a player has loose.
   */
  playerLoose(data: any, response: string = ENUM_SOCKET_DEF.PLAYER_LOOSE_RESPONSE): void {
    if (this.playerCanPlay(data, response)) {
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
   */
  playerCompleteLine(data: any, response: string = ENUM_SOCKET_DEF.PLAYER_COMPLETE_LINE_RESPONSE) {
    if (this.playerCanPlay(data, response)) {
      const game = GameManager.getGame(data.roomName);
      const player = game.getPlayer(this.id);
      player.lines += data.amount || 1;
      player.score += LINE_SCORE[(data.amount || 1) - 1];
      PacketSender.sendPlayerCompleteLine(player, game, data.amount || 1);
      this.socket.emit(response, {success: true, game});
    }
  }
}

export {TetrisSocketHandler};
