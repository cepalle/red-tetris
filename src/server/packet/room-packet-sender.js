/**
 * @type {Map}
 */
const socketMap = require("../main");


//----------------------------------------------------------------------------
//
// Packet room client side
// packetPlayerJoin       = {player, room}
// paccketPlayerQuit      = {player, room}
// packetPlayerPromoted   = {player, room}
// packetGameStart        = {room}
//
//----------------------------------------------------------------------------

/**
 * This packet is sent when a new player is coming in a room.
 * The player who join will not be notified.
 * @param {User} user
 * @param {Room} room
 */
function packetSendPlayerJoin(user, room) {
  sendPacketToAllPlayer("packetPlayerJoin", user, room, {user, room});
}

/**
 * This packet is sent when a player quit the room.
 * The player who quit will not be notified.
 * @param {User} user
 * @param {Room} room
 */
function packetSendPlayerQuit(user, room) {
  sendPacketToAllPlayer("packetPlayerQuit", user, room, {user, room});
}

/**
 * This packet is sent when the master of the room quit the room.
 * A new master is promoted (the second who have join).
 * @param {User} user
 * @param {Room} room
 */
function packetSendPlayerPromoted(user, room) {
  sendPacketToAllPlayer("packetPlayerPromoted", user, room, {user, room}, false);
}

/**
 * This packet is sent when the game start, will be sent to all players in the room.
 * @param {Room} room
 */
function packetSendGameStart(room) {
  sendPacketToAllPlayer("packetGameStart", user, room, {room}, false);
}

function sendPacketToAllPlayer(packetName, user, room, data, exceptConcerned = true) {
  room.getUsers().filter(e => exceptConcerned ? e.getId() !== user.getId() : true).forEach(e => {
    const socket = socketMap.get(e.id);
    socket.emit(packetName, data);
  });
}

module.exports = { packetSendPlayerJoin, packetSendPlayerPromoted, packetSendPlayerQuit, packetSendGameStart};
