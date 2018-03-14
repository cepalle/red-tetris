/**
 * @type {Map}
 */
const socketMap = require("../App");
const socketDefs = require("../../common/socket-definitions");

class PacketSender {
  /**
   * This packet is sent when a new player is coming in a room.
   * The player who join will not be notified.
   * @param {User} user
   * @param {Room} room
   */
  static sendPlayerJoin(user, room) {
    PacketSender.sendPacketToAllPlayer(socketDefs.PACKET_PLAYER_JOIN, user, room, {user, room});
  }

  /**
   * This packet is sent when a player quit the room.
   * The player who quit will not be notified.
   * @param {User} user
   * @param {Room} room
   */
  static sendPlayerQuit(user, room) {
    PacketSender.sendPacketToAllPlayer(socketDefs.PACKET_PLAYER_QUIT, user, room, {user, room});
  }

  /**
   * This packet is sent when the master of the room quit the room.
   * A new master is promoted (the second who have join).
   * @param {User} user
   * @param {Room} room
   */
  static sendPlayerPromoted(user, room) {
    PacketSender.sendPacketToAllPlayer(socketDefs.PACKET_PLAYER_PROMOTED, user, room, {user, room}, false);
  }

  /**
   * This packet is sent when the game start, will be sent to all players in the room.
   * @param {Room} room
   */
  static sendGameStart(room) {
    PacketSender.sendPacketToAllPlayer(socketDefs.PACKET_GAME_START, user, room, {room}, false);
  }

  static sendGenFlow(room, pieces) {
    PacketSender.sendPacketToAllPlayer(socketDefs.PACKET_GENFLOW, user, room, {pieces}, false);
  }

  static sendPacketToAllPlayer(packetName, user, room, data, exceptConcerned = true) {
    room.getUsers().filter(e => exceptConcerned ? e.getId() !== user.getId() : true).forEach(e => {
      const socket = socketMap.get(e.id);
      socket.emit(packetName, data);
    });
  }
}



module.exports = PacketSender;
