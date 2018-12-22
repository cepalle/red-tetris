import socketDefs from '../../common/socket-definitions';
import {loggerSock} from './logger-handler';
import {
  ADD_ERROR, ADD_PIECES_FLOW, ADD_WALL_LINE, CONNECTION_RESPONSE, RECV_START_GAME, UPDATE_GAMES, UPDATE_GRID,
  UPDATE_PLAYERS,
} from '../actions/action-creators';

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
  loggerSock(['recv PACKET_PLAYER_JOIN']);

  if (game && game.players) {
    dispatch(UPDATE_PLAYERS(game.players));
  }
};

/**
 * Request: PACKET_PLAYER_QUIT
 * Data recv: {player, room}
 */
const cbPacketPlayerQuit = ({game}, dispatch) => {
  loggerSock(['recv PACKET_PLAYER_QUIT']);

  if (game && game.players) {
    dispatch(UPDATE_PLAYERS(game.players));
  }
};

/**
 * Request: PACKET_PLAYER_PROMOTED
 * Data recv: {player, room}
 */
const cbPacketPlayerPromoted = ({game}, dispatch) => {
  loggerSock(['recv PACKET_PLAYER_PROMOTED']);

  if (game && game.players) {
    dispatch(UPDATE_PLAYERS(game.players));
  }
};

/**
 * Request: PACKET_PLAYER_LOSE
 * Data recv: {player, room}
 */
const cbPacketPlayerLose = ({game}, dispatch) => {
  loggerSock(['recv PACKET_PLAYER_LOSE']);

  if (game && game.players) {
    dispatch(UPDATE_PLAYERS(game.players));
  }
};

/**
 * Request: PACKET_GAME_START
 * Data recv: {game, pieces}
 */
const cbPacketGameStart = ({pieces, game}, dispatch) => {
  loggerSock(['recv PACKET_GAME_START', game.params]);

  if (pieces && game && game.params) {
    dispatch(RECV_START_GAME(pieces, game.params));
  }
};

/**
 * Request: PACKET_GENFLOW
 * Data recv: {[pieces]} (default 10)
 */
const cbPacketGenFlow = ({pieces}, dispatch) => {
  loggerSock(['recv PACKET_GENFLOW']);

  if (pieces) {
    dispatch(ADD_PIECES_FLOW(pieces));
  }
};

/**
 * Request: PACKET_PLAYER_COMPLETE_LINE
 * Data recv: {player, game, amount}
 */
const cbPacketPlayerCompleteLine = ({game, amount}, dispatch) => {
  loggerSock(['recv PACKET_PLAYER_COMPLETE_LINE']);

  if (game && game.players) {
    dispatch(UPDATE_PLAYERS(game.players));
  }
  if (amount && game && game.params && game.params.addWallLine) {
    dispatch(ADD_WALL_LINE(amount));
  }
};

/**
 * Request: PACKET_TETRIS_PLACE_PIECE
 * Data recv: {grid, playerName} gridAndPlayer
 */
const cbPacketTetrisPlacePiece = ({grid, playerName}, dispatch) => {
  loggerSock(['recv PACKET_TETRIS_PLACE_PIECE']);

  if (grid && playerName) {
    dispatch(UPDATE_GRID(grid, playerName));
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
  loggerSock(['recv JOIN_GAME_RESPONSE']);

  if (error) {
    dispatch(ADD_ERROR(error));
  }
  if (game && game.players) {
    dispatch(UPDATE_PLAYERS(game.players));
  }
};

/**
 * Request: HOME_RESPONSE
 * Data recv: {games}
 */
const cbHomeResponse = ({games}, dispatch) => {
  loggerSock(['recv HOME_RESPONSE']);

  if (games && games.rooms) {
    dispatch(UPDATE_GAMES(games.rooms));
  }
};

/**
 * Request: QUIT_ROOM_RESPONSE
 * Data recv: {error: {type, message}} || {success, game, user}
 */
const cbQuitRoomResponse = ({error, game}, dispatch) => {
  loggerSock(['recv QUIT_ROOM_RESPONSE']);

  if (error) {
    dispatch(ADD_ERROR(error));
  }
  if (game && game.players) {
    dispatch(UPDATE_PLAYERS(game.players));
  }
};

/**
 * Request: START_PLAYING_RESPONSE
 * Data recv: {error: {type, message}} || {success}
 */
const cbStartPlayingResponse = ({error}, dispatch) => {
  loggerSock(['recv START_PLAYING_RESPONSE']);

  if (error) {
    dispatch(ADD_ERROR(error));
  }
};

/**
 * Request: CONNECTION_RESPONSE
 * Data recv: {}
 */
const cbConnectionResponse = (_, dispatch) => {
  loggerSock(['recv CONNECTION_RESPONSE']);

  dispatch(CONNECTION_RESPONSE());
};

/**
 * Request: TETRIS_PLACE_PIECE_RESPONSE
 * Data recv: {error: {type, message}} || {success}
 */
const cbTetrisPlacePieceResponse = ({error}, dispatch) => {
  loggerSock(['recv TETRIS_PLACE_PIECE_RESPONSE']);

  if (error) {
    dispatch(ADD_ERROR(error));
  }
};

/**
 * Request: PLAYER_LOOSE_RESPONSE
 * Data recv: {}
 */
const cbPlayerLooseResponse = ({error}, dispatch) => {
  loggerSock(['recv PLAYER_LOOSE_RESPONSE']);

  if (error) {
    dispatch(ADD_ERROR(error));
  }
};

/**
 * Request: PLAYER_COMPLETE_LINE_RESPONSE
 * Data recv: {}
 */
const cbPlayerCompleteLineResponse = ({error, game}, dispatch) => {
  loggerSock(['recv PLAYER_COMPLETE_LINE_RESPONSE']);

  if (error) {
    dispatch(ADD_ERROR(error));
  }
  if (game && game.players) {
    dispatch(UPDATE_PLAYERS(game.players));
  }
};

/**
 * Request: GENFLOW_RESPONSE
 * Data recv: {}
 */
const cbGenFlowResponse = ({error}, dispatch) => {
  loggerSock(['recv GENFLOW_RESPONSE']);

  if (error) {
    dispatch(ADD_ERROR(error));
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
  loggerSock(['emit JOIN_GAME']);

  emit(socketDefs.JOIN_GAME, {
    roomName: roomName,
    playerName: playerName,
  });
};

/**
 * Used to tell to the backend that the room enter in a no-waiting getState and no player can join the room after.
 * Data to sent: {roomName, params}
 */
const emitStartPlaying = (roomName, params, emit) => {
  loggerSock(['emit START_PLAYING', params]);

  emit(socketDefs.START_PLAYING, {
    roomName: roomName,
    params: params,
  });
};

/**
 * Used to ask to the server new pieces
 * Data to sent: {roomName}
 */
const emitGenFlow = (roomName, emit) => {
  loggerSock(['emit GENFLOW']);

  emit(socketDefs.GENFLOW, {
    roomName: roomName,
  });
};

/**
 * Used to say to others player that you loose
 * Data to sent: {roomName, playerName}
 */
const emitPlayerLoose = (roomName, playerName, emit) => {
  loggerSock(['emit PLAYER_LOOSE']);

  emit(socketDefs.PLAYER_LOOSE, {
    roomName: roomName,
    playerName: playerName,
  });
};

/**
 * Used to say to others player that you completed a line
 * Data to sent: {roomName, playerName}
 */
const emitPlayerCompleteLine = (roomName, playerName, amount, emit) => {
  loggerSock(['emit PLAYER_COMPLETE_LINE']);

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
  loggerSock(['emit TETRIS_PLACE_PIECE']);

  emit(socketDefs.TETRIS_PLACE_PIECE, {
    grid: grid,
    roomName: roomName,
    playerName: playerName,
  });
};

/**
 * Used to ask the server the list of room
 */
const emitHome = (emit) => {
  loggerSock(['emit HOME']);

  emit(socketDefs.HOME);
};

/**
 * Used to say to others player that you loose
 * Data to sent: {roomName, playerName}
 */
const emitQuitGame = (roomName, playerName, emit) => {
  loggerSock(['emit QUIT_GAME']);

  emit(socketDefs.QUIT_GAME, {
    roomName: roomName,
    playerName: playerName,
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
