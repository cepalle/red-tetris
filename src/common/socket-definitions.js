module.exports = {

  //----------------------------------------------------------------------------
  //
  // CLIENT -> SERVER
  //
  //----------------------------------------------------------------------------

  /**
   * Used to send to the backend when a player want to create a room.
   * Data to sent: {roomName, playerName}
   */
  CREATE_ROOM: "createRoom",

  /**
   * Used to tell to the backend when a player want to join a room.
   * Data to sent: {roomName, playerName}
   */
  JOIN_ROOM: "joinRoom",

  /**
   * Used to tell when a player leave a room manually.
   * Data to sent: {roomName, playerName}
   */
  QUIT_ROOM: "quitRoom",

  /**
   * Used to tell to the backend that the room enter in a no-waiting state and no player can join the room after.
   * Data to sent: {roomName}
   */
  START_PLAYING: "startPlaying",

  //----------------------------------------------------------------------------
  //
  // SERVER RESPONSE -> CLIENT
  //
  //----------------------------------------------------------------------------

  /**
   * Used to tell to the client that the room is created or not.
   * Data to sent: {error: {type, message}} || {success, room, user}
   */
  CREATE_ROOM_RESPONSE: "createRoomResponse",

  /**
   * Used to tell to the client if he has join or not the room.
   * Data to sent: {error: {type, message}} || {success, room, user}
   */
  JOIN_ROOM_RESPONSE: "joinRoomResponse",


  /**
   * Used to tell to the client if he has successfully quit the room.
   * Data to sent: {error: {type, message}} || {success, room, user}
   */
  QUIT_ROOM_RESPONSE: "quitRoomResponse",


  /**
   * Used to tell to the client if the room has enter in a no-waiting state.
   * Data to sent: {error: {type, message}} || {success, room, user}
   */
  START_PLAYING_RESPONSE: "startPlayingResponse",

  //----------------------------------------------------------------------------
  //
  // SERVER -> CLIENT ONLY
  //
  //----------------------------------------------------------------------------

  /**
   * Sent to all player that a player has joined the room. Except to the player that join the room.
   * Data to sent: {player, room}
   */
  PACKET_PLAYER_JOIN: "packetPlayerJoin",

  /**
   * Sent to all player that a player has quit the room. Except to the player that left the room.
   * Data to sent: {player, room}
   */
  PACKET_PLAYER_QUIT: "packetPlayerQuit",

  /**
   * When a player leave the room if the player was master, a new player need to be promoted as master. This packet tell
   * to all players that a new player is now promoted as master.
   * Data to sent: {player, room}
   */
  PACKET_PLAYER_PROMOTED: "packetPlayerPromoted",

  /**
   * Sent to all players except the player who lose that a player has loose the game.
   * Data to sent: {player, room}
   */
  PACKET_PLAYER_LOSE: "packetPlayerLose",

  /**
   * Sent to all players that the game start
   * Data to sent: {room}
   */
  PACKET_GAME_START: "packetGameStart",
};
