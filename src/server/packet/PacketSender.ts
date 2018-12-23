/**
 * @type {Map}
 */
import {ENUM_SOCKET_DEF} from '@src/common/socket-definitions';
import {ENUM_PIECES, IPiece} from '@src/common/IType';
import {socketMap} from '@src/server/data/SocketMap';
import {Player} from '@src/server/data/player/Player';
import {Game} from '@src/server/data/game/Game';
import {Piece} from '@src/server/data/piece/Piece';

class PacketSender {

  /**
   * This packet is sent when a new player is coming in a game.
   * The player who join will not be notified.
   */
  static sendPlayerJoin(player: Player, game: Game): void {
    PacketSender.sendPacketToAllPlayer(ENUM_SOCKET_DEF.PACKET_PLAYER_JOIN, player, game, {player, game});
  }

  /**
   * This packet is sent when a player quit the game.
   * The player who quit will not be notified.
   */
  static sendPlayerQuit(player: Player, game: Game): void {
    PacketSender.sendPacketToAllPlayer(ENUM_SOCKET_DEF.PACKET_PLAYER_QUIT, player, game, {player, game});
  }

  /**
   * This packet is sent to tell to all players that a player has lose.
   */
  static sendPlayerLoose(player: Player, game: Game): void {
    PacketSender.sendPacketToAllPlayer(ENUM_SOCKET_DEF.PACKET_PLAYER_LOSE, player, game, {game, player});
  }

  /**
   * This packet is sent to tell to all player that a player has complete a line
   */
  static sendPlayerCompleteLine(player: Player, game: Game, amount: number): void {
    PacketSender.sendPacketToAllPlayer(ENUM_SOCKET_DEF.PACKET_PLAYER_COMPLETE_LINE, player, game, {
      game,
      player,
      amount,
    });
  }

  /**
   * This packet is sent when the master of the game quit the game.
   * A new master is promoted (the second who have join).
   */
  static sendPlayerPromoted(player: Player, game: Game): void {
    PacketSender.sendPacketToAllPlayer(ENUM_SOCKET_DEF.PACKET_PLAYER_PROMOTED, player, game, {player, game}, false);
  }

  /**
   * This packet is sent when the game start, will be sent to all players in the game.
   */
  static sendGameStart(game: Game): void {
    const pieces = Piece.generatePieces(10);
    PacketSender.sendPacketToAllPlayer(ENUM_SOCKET_DEF.PACKET_GAME_START, undefined, game, {game, pieces}, false);
  }

  /**
   * Sent a set of pieces for tetris game to all clients.
   */
  static sendGenFlow(game: Game, pieces: IPiece[]): void {
    PacketSender.sendPacketToAllPlayer(ENUM_SOCKET_DEF.PACKET_GENFLOW, undefined, game, {pieces}, false);
  }

  /**
   * Sent to all player that a player has place a piece.
   */
  static sendPlayerPlacePiece(game: Game, grid: ENUM_PIECES[][], player: Player): void {
    PacketSender.sendPacketToAllPlayer(ENUM_SOCKET_DEF.PACKET_TETRIS_PLACE_PIECE, player, game, {
      grid,
      playerName: player.playerName,
    });
  }

  /**
   *
   */
  static sendPacketToAllPlayer(
    packetName: string,
    player: Player | undefined,
    game: Game,
    data: any,
    exceptConcerned: boolean = true,
  ): void {
    if (!game || !player) {
      return;
    }
    game.players.filter(e => exceptConcerned ? e.id !== player.id : true).forEach(e => {
      const socket = socketMap.sockets.get(e.id);
      if (socket) {
        socket.emit(packetName, data);
      }
    });
  }
}

export {PacketSender};
