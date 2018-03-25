module.exports = {

  //----------------------------------------------------------------------------
  //
  // CLIENT -> SERVER
  //
  //----------------------------------------------------------------------------

  /**
   * Used to tell to the backend when a player want to join a room.
   * Data to sent: {roomName, playerName}
   */
  JOIN_GAME: "joinGame",

  /**
   * Used to tell when a player leave a room manually.
   * Data to sent: {roomName, playerName}
   */
  QUIT_GAME: "quitGame",

  /**
   * Used to tell to the backend that the room enter in a no-waiting getState and no player can join the room after.
   * Data to sent: {roomName}
   */
  START_PLAYING: "startPlaying",

  /**
   * Used to tell to the server that a client was connected
   * Data to sent: {}
   */
  CONNECTION: "connection",

  /**
   * Used to ask to the server new pieces
   * Data to sent: {roomName}
   */
  GENFLOW: "genFlow",

  /**
   * Used to tell to the server that a player has loose
   * Data to sent: {roomName, playerName}
   */
  PLAYER_LOOSE: "playerLoose",

  /**
   * Used to tell to the server that a player has complete a line
   * Data to sent: {roomName, playerName, amount}
   */
  PLAYER_COMPLETE_LINE: "playerCompleteLine",

  /**
   * Used to tell to other clients that a player has placed a piece
   * Data to sent: {grid, playerName}
   */
  TETRIS_PLACE_PIECE: "tetrisPlacePiece",

  /**
   * Player has disconnected
   * Data to sent: {}
   */
  DISCONNECT: "disconnect",

  //----------------------------------------------------------------------------
  //
  // SERVER RESPONSE -> CLIENT
  //
  //----------------------------------------------------------------------------


  /**
   * Used to tell to the client if he has join or not the room.
   * Data to sent: {error: {type, message}} || {success, game, player} -- before user
   */
  JOIN_GAME_RESPONSE: "joinGameResponse",


  /**
   * Used to tell to the client if he has successfully quit the room.
   * Data to sent: {error: {type, message}} || {success, game, player} -- before user
   */
  QUIT_ROOM_RESPONSE: "quitGameResponse",


  /**
   * Used to tell to the client if the room has enter in a no-waiting getState.
   * Data to sent: {error: {type, message}} || {success}
   */
  START_PLAYING_RESPONSE: "startPlayingResponse",

  /**
   * Used to tell to the client that he successful the socket.io
   * Data to sent: {}
   */
  CONNECTION_RESPONSE: "connectionResponse",

  /**
   * Used to tell if the request is ok
   * Data to sent: {error: {type, message}} || {success}
   */
  TETRIS_PLACE_PIECE_RESPONSE: "tetrisPlacePieceResponse",

  /**
   * Used to tell to the client that the request fail or success
   * Data to sent: {error: {type, message}} || {success}
   */
  PLAYER_LOOSE_RESPONSE: "playerLooseResponse",

  /**
   * Used to tell to the client that the request fail or success
   * Data to sent: {error: {type, message}} || {success, game}
   */
  PLAYER_COMPLETE_LINE_RESPONSE: "playerCompleteLineResponse",

  /**
   * Used to tell if the genFlow is successful
   * Data to sent: {error: {type, message}} || {success}
   */
  GENFLOW_RESPONSE: "genFlowResponse",

  //----------------------------------------------------------------------------
  //
  // SERVER -> CLIENT ONLY
  //
  //----------------------------------------------------------------------------

  /**
   * Sent to all player that a player has joined the room. Except to the player that join the room.
   * Data to sent: {player, game}
   */
  PACKET_PLAYER_JOIN: "packetPlayerJoin",

  /**
   * Sent to all player that a player has quit the room. Except to the player that left the room.
   * Data to sent: {player, game}
   */
  PACKET_PLAYER_QUIT: "packetPlayerQuit",

  /**
   * When a player leave the room if the player was master, a new player need to be promoted as master. This packet tell
   * to all players that a new player is now promoted as master.
   * Data to sent: {player, game}
   */
  PACKET_PLAYER_PROMOTED: "packetPlayerPromoted",

  /**
   * Sent to all players except the player who lose that a player has loose the game.
   * Data to sent: {player, game}
   */
  PACKET_PLAYER_LOSE: "packetPlayerLose",

  /**
   * Sent to all players that the game start
   * Data to sent: {game, pieces}
   */
  PACKET_GAME_START: "packetGameStart",

  /**
   * Sent new pieces for tetris.
   * Data to sent: {[pieces]} (default 10)
   */
  PACKET_GENFLOW: "packetGenFlow",

  /**
   * Sent to all player except the sender that a player complete the line.
   * Data to sent: {player, game}
   */
  PACKET_PLAYER_COMPLETE_LINE: "packetPlayerCompleteLine",

  /**
   * Sent to all player that a player has placed a piece to his grid.
   * Data to sent: {grid, playerName}
   */
  PACKET_TETRIS_PLACE_PIECE: "packetPlayerPlacePiece",

};
