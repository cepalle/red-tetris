/**
 * @type {Map}
 */
const socketMap = require("../App");
const {PARTS} = require("../../common/pieces");
const socketDefs = require("../../common/socket-definitions");
const SocketMap = require("../data/SocketMap");

class PacketSender {
  /**
   * This packet is sent when a new player is coming in a room.
   * The player who join will not be notified.
   * @param {User} player
   * @param {Room} room
   */
  static sendPlayerJoin(player, room) {
    PacketSender.sendPacketToAllPlayer(socketDefs.PACKET_PLAYER_JOIN, player, room, {player, room});
  }

  /**
   * This packet is sent when a player quit the room.
   * The player who quit will not be notified.
   * @param {User} player
   * @param {Room} room
   */
  static sendPlayerQuit(player, room) {
    PacketSender.sendPacketToAllPlayer(socketDefs.PACKET_PLAYER_QUIT, player, room, {player, room});
  }

  /**
   * This packet is sent when the master of the room quit the room.
   * A new master is promoted (the second who have join).
   * @param {User} player
   * @param {Room} room
   */
  static sendPlayerPromoted(player, room) {
    PacketSender.sendPacketToAllPlayer(socketDefs.PACKET_PLAYER_PROMOTED, player, room, {player, room}, false);
  }

  /**
   * This packet is sent when the game start, will be sent to all players in the room.
   * @param {Room} room
   */
  static sendGameStart(room) {
    const pieces = [];
    for(let i = 0; i < 10; i++)
      pieces.push(PARTS[Math.floor(Math.random() * PARTS.length)]);
    PacketSender.sendPacketToAllPlayer(socketDefs.PACKET_GAME_START, undefined, room, {room, pieces}, false);
  }

  /**
   * Sent a set of pieces for tetris game to all clients.
   * @param {Room} room
   * @param {Array<number>} pieces
   */
  static sendGenFlow(room, pieces) {
    PacketSender.sendPacketToAllPlayer(socketDefs.PACKET_GENFLOW, undefined, room, {pieces}, false);
  }

  /**
   * Sent to all player that a player has place a piece.
   * @param {Room} room
   * @param {Array<Array<number>>}grid
   * @param {User} user
   */
  static sendPlayerPlacePiece(room, grid, user) {
    PacketSender.sendPacketToAllPlayer(socketDefs.PACKET_TETRIS_PLACE_PIECE, user, room, {
      grid,
      playerName: user.username
    })
  }

  static sendPacketToAllPlayer(packetName, user, room, data, exceptConcerned = true) {
    room.users.filter(e => exceptConcerned ? e.getId() !== user.getId() : true).forEach(e => {
      const socket = SocketMap.sockets.get(e.id);
      socket.emit(packetName, data);
    });
  }
}

module.exports = PacketSender;
