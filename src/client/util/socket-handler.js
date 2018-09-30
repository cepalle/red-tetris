import socketDefs from "../../common/socket-definitions";
import {logger_sock} from "./logger-handler";
import {
  addError, addPiecesFlow, addWallLine, connectionResponse, startGame, updateGames, updateGrid,
  updatePlayers
} from "../actions/action-creators"

//----------------------------------------------------------------------------
//
// PACKET
//
//----------------------------------------------------------------------------

/**
 * Request: PACKET_PLAYER_JOIN
 * Data recv: {player, game}
 */
const cbPacketPlayerJoin = ({game}, dispatch) => {
  logger_sock(["recv PACKET_PLAYER_JOIN"]);

  if (game && game.players) {
    dispatch(updatePlayers(game.players));
  }
};

/**
 * Request: PACKET_PLAYER_QUIT
 * Data recv: {player, room}
 */
const cbPacketPlayerQuit = ({game}, dispatch) => {
  logger_sock(["recv PACKET_PLAYER_QUIT"]);

  if (game && game.players) {
    dispatch(updatePlayers(game.players));
  }
};

/**
 * Request: PACKET_PLAYER_PROMOTED
 * Data recv: {player, room}
 */
const cbPacketPlayerPromoted = ({game}, dispatch) => {
  logger_sock(["recv PACKET_PLAYER_PROMOTED"]);

  if (game && game.players) {
    dispatch(updatePlayers(game.players));
  }
};

/**
 * Request: PACKET_PLAYER_LOSE
 * Data recv: {player, room}
 */
const cbPacketPlayerLose = ({game}, dispatch) => {
  logger_sock(["recv PACKET_PLAYER_LOSE"]);

  if (game && game.players) {
    dispatch(updatePlayers(game.players));
  }
};

/**
 * Request: PACKET_GAME_START
 * Data recv: {game, pieces}
 */
const cbPacketGameStart = ({pieces, game}, dispatch) => {
  logger_sock(["recv PACKET_GAME_START", game.params]);

  if (pieces && game && game.params) {
    dispatch(startGame(pieces, game.params));
  }
};

/**
 * Request: PACKET_GENFLOW
 * Data recv: {[pieces]} (default 10)
 */
const cbPacketGenFlow = ({pieces}, dispatch) => {
  logger_sock(["recv PACKET_GENFLOW"]);

  if (pieces) {
    dispatch(addPiecesFlow(pieces));
  }
};

/**
 * Request: PACKET_PLAYER_COMPLETE_LINE
 * Data recv: {player, game, amount}
 */
const cbPacketPlayerCompleteLine = ({game, amount}, dispatch) => {
  logger_sock(["recv PACKET_PLAYER_COMPLETE_LINE"]);

  if (game && game.players) {
    dispatch(updatePlayers(game.players));
  }
  if (amount && game && game.params && game.params.addWallLine) {
    dispatch(addWallLine(amount));
  }
};

/**
 * Request: PACKET_TETRIS_PLACE_PIECE
 * Data recv: {grid, playerName} gridAndPlayer
 */
const cbPacketTetrisPlacePiece = ({grid, playerName}, dispatch) => {
  logger_sock(["recv PACKET_TETRIS_PLACE_PIECE"]);

  if (grid && playerName) {
    dispatch(updateGrid(grid, playerName));
  }
};

//----------------------------------------------------------------------------
//
// RESPONSE
//
//----------------------------------------------------------------------------

/**
 * Request: JOIN_GAME_RESPONSE
 * Data recv: {error: {type, message}} || {success, game, user}
 */
const cbJoinRoomResponse = ({error, game}, dispatch) => {
  logger_sock(["recv JOIN_GAME_RESPONSE"]);

  if (error) {
    dispatch(addError(error));
  }
  if (game && game.players) {
    dispatch(updatePlayers(game.players));
  }
};

/**
 * Request: HOME_RESPONSE
 * Data recv: {games}
 */
const cbHomeResponse = ({games}, dispatch) => {
  logger_sock(["recv HOME_RESPONSE"]);

  if (games && games.rooms) {
    dispatch(updateGames(games.rooms));
  }
};

/**
 * Request: QUIT_ROOM_RESPONSE
 * Data recv: {error: {type, message}} || {success, game, user}
 */
const cbQuitRoomResponse = ({error, game}, dispatch) => {
  logger_sock(["recv QUIT_ROOM_RESPONSE"]);

  if (error) {
    dispatch(addError(error))
  }
  if (game && game.players) {
    dispatch(updatePlayers(game.players))
  }
};

/**
 * Request: START_PLAYING_RESPONSE
 * Data recv: {error: {type, message}} || {success}
 */
const cbStartPlayingResponse = ({error}, dispatch) => {
  logger_sock(["recv START_PLAYING_RESPONSE"]);

  if (error) {
    dispatch(addError(error))
  }
};

/**
 * Request: CONNECTION_RESPONSE
 * Data recv: {}
 */
const cbConnectionResponse = (_, dispatch) => {
  logger_sock(["recv CONNECTION_RESPONSE"]);

  dispatch(connectionResponse())
};

/**
 * Request: TETRIS_PLACE_PIECE_RESPONSE
 * Data recv: {error: {type, message}} || {success}
 */
const cbTetrisPlacePieceResponse = ({error}, dispatch) => {
  logger_sock(["recv TETRIS_PLACE_PIECE_RESPONSE"]);

  if (error) {
    dispatch(addError(error))
  }
};

/**
 * Request: PLAYER_LOOSE_RESPONSE
 * Data recv: {}
 */
const cbPlayerLooseResponse = ({error}, dispatch) => {
  logger_sock(["recv PLAYER_LOOSE_RESPONSE"]);

  if (error) {
    dispatch(addError(error))
  }
};

/**
 * Request: PLAYER_COMPLETE_LINE_RESPONSE
 * Data recv: {}
 */
const cbPlayerCompleteLineResponse = ({error, game}, dispatch) => {
  logger_sock(["recv PLAYER_COMPLETE_LINE_RESPONSE"]);

  if (error) {
    dispatch(addError(error));
  }
  if (game && game.players) {
    dispatch(updatePlayers(game.players));
  }
};

/**
 * Request: GENFLOW_RESPONSE
 * Data recv: {}
 */
const cbGenFlowResponse = ({error}, dispatch) => {
  logger_sock(["recv GENFLOW_RESPONSE"]);

  if (error) {
    dispatch(addError(error));
  }
};

//----------------------------------------------------------------------------
//
// EMIT
//
//----------------------------------------------------------------------------

/**
 * Used to tell to the backend when a player want to join a room.
 * Data to sent: {roomName, playerName}
 */
const emitJoinRoom = (roomName, playerName, emit) => {
  logger_sock(["emit JOIN_GAME"]);

  emit(socketDefs.JOIN_GAME, {
    roomName: roomName,
    playerName: playerName
  });
};

/**
 * Used to tell to the backend that the room enter in a no-waiting getState and no player can join the room after.
 * Data to sent: {roomName, params}
 */
const emitStartPlaying = (roomName, params, emit) => {
  logger_sock(["emit START_PLAYING", params]);

  emit(socketDefs.START_PLAYING, {
    roomName: roomName,
    params: params
  });
};

/**
 * Used to ask to the server new pieces
 * Data to sent: {roomName}
 */
const emitGenFlow = (roomName, emit) => {
  logger_sock(["emit GENFLOW"]);

  emit(socketDefs.GENFLOW, {
    roomName: roomName
  });
};

/**
 * Used to say to others player that you loose
 * Data to sent: {roomName, playerName}
 */
const emitPlayerLoose = (roomName, playerName, emit) => {
  logger_sock(["emit PLAYER_LOOSE"]);

  emit(socketDefs.PLAYER_LOOSE, {
    roomName: roomName,
    playerName: playerName
  });
};

/**
 * Used to say to others player that you completed a line
 * Data to sent: {roomName, playerName}
 */
const emitPlayerCompleteLine = (roomName, playerName, amount, emit) => {
  logger_sock(["emit PLAYER_COMPLETE_LINE"]);

  emit(socketDefs.PLAYER_COMPLETE_LINE, {
    roomName: roomName,
    playerName: playerName,
    amount: amount,
  });
};

/**
 * Used to tell to other clients that a player has placed a piece
 * Data to sent: {grid, playerName}
 */
const emitTetrisPlacePiece = (roomName, playerName, grid, emit) => {
  logger_sock(["emit TETRIS_PLACE_PIECE"]);

  emit(socketDefs.TETRIS_PLACE_PIECE, {
    grid: grid,
    roomName: roomName,
    playerName: playerName
  });
};

/**
 * Used to ask the server the list of room
 */
const emitHome = (emit) => {
  logger_sock(["emit HOME"]);

  emit(socketDefs.HOME);
};

/**
 * Used to say to others player that you loose
 * Data to sent: {roomName, playerName}
 */
const emitQuitGame = (roomName, playerName, emit) => {
  logger_sock(["emit QUIT_GAME"]);

  emit(socketDefs.QUIT_GAME, {
    roomName: roomName,
    playerName: playerName
  });
};


export {
  emitJoinRoom,
  emitStartPlaying,
  emitGenFlow,
  emitTetrisPlacePiece,
  emitPlayerLoose,
  emitPlayerCompleteLine,
  cbPacketPlayerJoin,
  cbPacketPlayerQuit,
  cbPacketPlayerPromoted,
  cbPacketPlayerLose,
  cbPacketGameStart,
  cbPacketGenFlow,
  cbPacketPlayerCompleteLine,
  cbPacketTetrisPlacePiece,
  cbJoinRoomResponse,
  cbQuitRoomResponse,
  cbStartPlayingResponse,
  cbConnectionResponse,
  cbTetrisPlacePieceResponse,
  cbPlayerLooseResponse,
  cbPlayerCompleteLineResponse,
  cbGenFlowResponse,
  cbHomeResponse,
  emitHome,
  emitQuitGame,
};
