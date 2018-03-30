/**
 * @type {Map}
 */
import SocketMap from "../data/SocketMap";
import socketDefs from "../../common/socket-definitions";
import Piece from "../data/piece/Piece";

class PacketSender {

  /**
   * This packet is sent when a new player is coming in a game.
   * The player who join will not be notified.
   * @param {Player} player
   * @param {Game} game
   */
  static sendPlayerJoin(player, game) {
    PacketSender.sendPacketToAllPlayer(socketDefs.PACKET_PLAYER_JOIN, player, game, {player, game});
  }

  /**
   * This packet is sent when a player quit the game.
   * The player who quit will not be notified.
   * @param {Player} player
   * @param {Game} game
   */
  static sendPlayerQuit(player, game) {
    PacketSender.sendPacketToAllPlayer(socketDefs.PACKET_PLAYER_QUIT, player, game, {player, game});
  }

  /**
   * This packet is sent to tell to all players that a player has lose.
   * @param {Player} player
   * @param {Game} game
   */
  static sendPlayerLoose(player, game) {
    PacketSender.sendPacketToAllPlayer(socketDefs.PACKET_PLAYER_LOSE, player, game, {game, player})
  }

  /**
   * This packet is sent to tell to all player that a player has complete a line
   * @param {Player} player
   * @param {Game} game
   */
  static sendPlayerCompleteLine(player, game, amount) {
    PacketSender.sendPacketToAllPlayer(socketDefs.PACKET_PLAYER_COMPLETE_LINE, player, game, {game, player, amount})
  }

  /**
   * This packet is sent when the master of the game quit the game.
   * A new master is promoted (the second who have join).
   * @param {Player} player
   * @param {Game} game
   */
  static sendPlayerPromoted(player, game) {
    PacketSender.sendPacketToAllPlayer(socketDefs.PACKET_PLAYER_PROMOTED, player, game, {player, game}, false);
  }

  /**
   * This packet is sent when the game start, will be sent to all players in the game.
   * @param {Game} game
   */
  static sendGameStart(game) {
    const pieces = Piece.generatePieces(10);
    PacketSender.sendPacketToAllPlayer(socketDefs.PACKET_GAME_START, undefined, game, {game, pieces}, false);
  }

  /**
   * Sent a set of pieces for tetris game to all clients.
   * @param {Game} game
   * @param {Array<number>} pieces
   */
  static sendGenFlow(game, pieces) {
    PacketSender.sendPacketToAllPlayer(socketDefs.PACKET_GENFLOW, undefined, game, {pieces}, false);
  }

  /**
   * Sent to all player that a player has place a piece.
   * @param {Game} game
   * @param {Array<Array<number>>}grid
   * @param {Player} player
   */
  static sendPlayerPlacePiece(game, grid, player) {
    PacketSender.sendPacketToAllPlayer(socketDefs.PACKET_TETRIS_PLACE_PIECE, player, game, {
      grid,
      playerName: player.playerName
    })
  }

  /**
   *
   * @param {string} packetName
   * @param player
   * @param game
   * @param data
   * @param exceptConcerned
   */
  static sendPacketToAllPlayer(packetName, player, game, data, exceptConcerned = true) {
    if (!game) {
      return;
    }
    game.players.filter(e => exceptConcerned ? e.id !== player.id : true).forEach(e => {
      const socket = SocketMap.sockets.get(e.id);
      if (socket)
        socket.emit(packetName, data);
    });
  }
}

export default PacketSender;
