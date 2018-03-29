import io from 'socket.io-client';
import {store} from "../middlewares/store"
import socketDefs from "../../common/socket-definitions";
import {logger, logger_sock} from "./logger-handler";
import {
  addError, addPiecesFlow, addWallLine, connectionResponse, startGame, updateGames, updateGrid,
  updatePlayers
} from "../actions/action-creators"

const socket = io.connect('http://localhost:4433');
// const socket = io.connect('https://le-101.tk:4433');


//----------------------------------------------------------------------------
//
// PACKET
//
//----------------------------------------------------------------------------

socket.on(socketDefs.PACKET_PLAYER_JOIN, arg => cbPacketPlayerJoin(arg));
socket.on(socketDefs.PACKET_PLAYER_QUIT, arg => cbPacketPlayerQuit(arg));
socket.on(socketDefs.PACKET_PLAYER_PROMOTED, arg => cbPacketPlayerPromoted(arg));
socket.on(socketDefs.PACKET_PLAYER_LOSE, arg => cbPacketPlayerLose(arg));
socket.on(socketDefs.PACKET_GAME_START, arg => cbPacketGameStart(arg));
socket.on(socketDefs.PACKET_GENFLOW, arg => cbPacketGenFlow(arg));
socket.on(socketDefs.PACKET_PLAYER_COMPLETE_LINE, arg => cbPacketPlayerCompleteLine(arg));
socket.on(socketDefs.PACKET_TETRIS_PLACE_PIECE, arg => cbPacketTetrisPlacePiece(arg));

/**
 * Request: PACKET_PLAYER_JOIN
 * Data recv: {player, game}
 */
const cbPacketPlayerJoin = ({game}) => {
  logger_sock(["recv PACKET_PLAYER_JOIN"]);

  store.dispatch(updatePlayers(game.players));
};

/**
 * Request: PACKET_PLAYER_QUIT
 * Data recv: {player, room}
 */
const cbPacketPlayerQuit = ({game}) => {
  logger_sock(["recv PACKET_PLAYER_QUIT"]);

  store.dispatch(updatePlayers(game.players));
};

/**
 * Request: PACKET_PLAYER_PROMOTED
 * Data recv: {player, room}
 */
const cbPacketPlayerPromoted = ({game}) => {
  logger_sock(["recv PACKET_PLAYER_PROMOTED"]);

  store.dispatch(updatePlayers(game.players));
};

/**
 * Request: PACKET_PLAYER_LOSE
 * Data recv: {player, room}
 */
const cbPacketPlayerLose = ({game}) => {
  logger_sock(["recv PACKET_PLAYER_LOSE"]);

  store.dispatch(updatePlayers(game.players));
};

/**
 * Request: PACKET_GAME_START
 * Data recv: {game, pieces}
 */
const cbPacketGameStart = ({pieces, game}) => {
  logger_sock(["recv PACKET_GAME_START", game.params]);

  store.dispatch(startGame(pieces, game.params));
};

/**
 * Request: PACKET_GENFLOW
 * Data recv: {[pieces]} (default 10)
 */
const cbPacketGenFlow = ({pieces}) => {
  logger_sock(["recv PACKET_GENFLOW"]);

  store.dispatch(addPiecesFlow(pieces));
};

/**
 * Request: PACKET_PLAYER_COMPLETE_LINE
 * Data recv: {player, game, amount}
 */
const cbPacketPlayerCompleteLine = ({game, amount}) => {
  logger_sock(["recv PACKET_PLAYER_COMPLETE_LINE"]);

  store.dispatch(updatePlayers(game.players));
  if (game.params.addWallLine) {
    store.dispatch(addWallLine(amount));
  }
};

/**
 * Request: PACKET_TETRIS_PLACE_PIECE
 * Data recv: {grid, playerName} gridAndPlayer
 */
const cbPacketTetrisPlacePiece = ({grid, playerName}) => {
  logger_sock(["recv PACKET_TETRIS_PLACE_PIECE"]);

  store.dispatch(updateGrid(grid, playerName));
};

//----------------------------------------------------------------------------
//
// RESPONSE
//
//----------------------------------------------------------------------------

socket.on(socketDefs.JOIN_GAME_RESPONSE, arg => cbJoinRoomResponse(arg));
socket.on(socketDefs.HOME_RESPONSE, arg => cbHomeResponse(arg));
socket.on(socketDefs.QUIT_ROOM_RESPONSE, arg => cbQuitRoomResponse(arg));
socket.on(socketDefs.START_PLAYING_RESPONSE, arg => cbStartPlayingResponse(arg));
socket.on(socketDefs.CONNECTION_RESPONSE, arg => cbConnectionResponse(arg));
socket.on(socketDefs.TETRIS_PLACE_PIECE_RESPONSE, arg => cbTetrisPlacePieceResponse(arg));
socket.on(socketDefs.PLAYER_LOOSE_RESPONSE, arg => cbPlayerLooseResponse(arg));
socket.on(socketDefs.PLAYER_COMPLETE_LINE_RESPONSE, arg => cbPlayerCompleteLineResponse(arg));
socket.on(socketDefs.GENFLOW_RESPONSE, arg => cbGenFlowResponse(arg));

/**
 * Request: JOIN_GAME_RESPONSE
 * Data recv: {error: {type, message}} || {success, game, user}
 */
const cbJoinRoomResponse = ({error, game}) => {
  logger_sock(["recv JOIN_GAME_RESPONSE"]);

  if (error) {
    store.dispatch(addError(error));
  } else {
    store.dispatch(updatePlayers(game.players));
  }
};

/**
 * Request: HOME_RESPONSE
 * Data recv: {games}
 */
const cbHomeResponse = ({games}) => {
  logger_sock(["recv HOME_RESPONSE"]);

  store.dispatch(updateGames(games.rooms));
};

/**
 * Request: QUIT_ROOM_RESPONSE
 * Data recv: {error: {type, message}} || {success, game, user}
 */
const cbQuitRoomResponse = ({error, game}) => {
  logger_sock(["recv QUIT_ROOM_RESPONSE"]);

  if (error) {
    store.dispatch(addError(error))
  } else {
    store.dispatch(updatePlayers(game.players))
  }
};

/**
 * Request: START_PLAYING_RESPONSE
 * Data recv: {error: {type, message}} || {success}
 */
const cbStartPlayingResponse = ({error}) => {
  logger_sock(["recv START_PLAYING_RESPONSE"]);

  if (error) {
    store.dispatch(addError(error))
  }
};

/**
 * Request: CONNECTION_RESPONSE
 * Data recv: {}
 */
const cbConnectionResponse = () => {
  logger_sock(["recv CONNECTION_RESPONSE"]);

  store.dispatch(connectionResponse())
};

/**
 * Request: TETRIS_PLACE_PIECE_RESPONSE
 * Data recv: {error: {type, message}} || {success}
 */
const cbTetrisPlacePieceResponse = ({error}) => {
  logger_sock(["recv TETRIS_PLACE_PIECE_RESPONSE"]);

  if (error) {
    store.dispatch(addError(error))
  }
};

/**
 * Request: PLAYER_LOOSE_RESPONSE
 * Data recv: {}
 */
const cbPlayerLooseResponse = ({error}) => {
  logger_sock(["recv PLAYER_LOOSE_RESPONSE"]);

  if (error) {
    store.dispatch(addError(error))
  }
};

/**
 * Request: PLAYER_COMPLETE_LINE_RESPONSE
 * Data recv: {}
 */
const cbPlayerCompleteLineResponse = ({error, game}) => {
  logger_sock(["recv PLAYER_COMPLETE_LINE_RESPONSE"]);

  if (error) {
    store.dispatch(addError(error));
  } else if (game) {
    store.dispatch(updatePlayers(game.players));
  }
};

/**
 * Request: GENFLOW_RESPONSE
 * Data recv: {}
 */
const cbGenFlowResponse = ({error}) => {
  logger_sock(["recv GENFLOW_RESPONSE"]);

  if (error) {
    store.dispatch(addError(error));
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
const emitJoinRoom = (roomName, playerName) => {
  logger_sock(["emit JOIN_GAME"]);

  socket.emit(socketDefs.JOIN_GAME, {
    roomName: roomName,
    playerName: playerName
  });
};

/**
 * Used to tell to the backend that the room enter in a no-waiting getState and no player can join the room after.
 * Data to sent: {roomName, params}
 */
const emitStartPlaying = (roomName, params) => {
  logger_sock(["emit START_PLAYING", params]);

  socket.emit(socketDefs.START_PLAYING, {
    roomName: roomName,
    params: params
  });
};

/**
 * Used to ask to the server new pieces
 * Data to sent: {roomName}
 */
const emitGenFlow = roomName => {
  logger_sock(["emit GENFLOW"]);

  socket.emit(socketDefs.GENFLOW, {
    roomName: roomName
  });
};

/**
 * Used to say to others player that you loose
 * Data to sent: {roomName, playerName}
 */
const emitPlayerLoose = (roomName, playerName) => {
  logger_sock(["emit PLAYER_LOOSE"]);

  socket.emit(socketDefs.PLAYER_LOOSE, {
    roomName: roomName,
    playerName: playerName
  });
};

/**
 * Used to say to others player that you completed a line
 * Data to sent: {roomName, playerName}
 */
const emitPlayerCompleteLine = (roomName, playerName, amount) => {
  logger_sock(["emit PLAYER_COMPLETE_LINE"]);

  socket.emit(socketDefs.PLAYER_COMPLETE_LINE, {
    roomName: roomName,
    playerName: playerName,
    amount: amount,
  });
};

/**
 * Used to tell to other clients that a player has placed a piece
 * Data to sent: {grid, playerName}
 */
const emitTetrisPlacePiece = (roomName, playerName, grid) => {
  logger_sock(["emit TETRIS_PLACE_PIECE"]);

  socket.emit(socketDefs.TETRIS_PLACE_PIECE, {
    grid: grid,
    roomName: roomName,
    playerName: playerName
  });
};

/**
 * Used to ask the server the list of room
 */
const emitHome = () => {
  logger_sock(["emit HOME"]);

  socket.emit(socketDefs.HOME);
};

/**
 * Used to say to others player that you loose
 * Data to sent: {roomName, playerName}
 */
const emitQuitGame = (roomName, playerName) => {
  logger_sock(["emit QUIT_GAME"]);

  socket.emit(socketDefs.QUIT_GAME, {
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
  emitHome,
  emitQuitGame,
};
