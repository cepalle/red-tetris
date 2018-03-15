import io from 'socket.io-client';
import {store} from "../redux/store"
import {addError, addPartsFlow, updateUsers, updateGrid} from "../redux/action-creators"
import socketDefs from "../../common/socket-definitions";
import {logger_sock} from "../logger";

const socket = io.connect('http://localhost:4433');

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
socket.on(socketDefs.PACKET_TETRIS_PLACE_PIECE, arg => cbPacketTetrisPlacePiece(arg));

/**
 * Request: PACKET_PLAYER_JOIN
 * Data recv: {player, room}
 */
const cbPacketPlayerJoin = arg => {
  logger_sock(["recv PACKET_PLAYER_JOIN", arg]);

  if (arg.error) {
    store.dispatch(addError(arg.error))
  } else {
    store.dispatch(updateUsers(arg.room.users))
  }
};

/**
 * Request: PACKET_PLAYER_QUIT
 * Data recv: {player, room}
 */
const cbPacketPlayerQuit = arg => {
  logger_sock(["recv PACKET_PLAYER_QUIT", arg]);

  if (arg.error) {
    store.dispatch(addError(arg.error))
  } else {
    store.dispatch(updateUsers(arg.room.users))
  }
};

/**
 * Request: PACKET_PLAYER_PROMOTED
 * Data recv: {player, room}
 */
const cbPacketPlayerPromoted = arg => {
  logger_sock(["recv PACKET_PLAYER_PROMOTED", arg]);

  if (arg.error) {
    store.dispatch(addError(arg.error))
  } else {
    store.dispatch(updateUsers(arg.room.users))
  }
};

//TODO
/**
 * Request: PACKET_PLAYER_LOSE
 * Data recv: {player, room}
 */
const cbPacketPlayerLose = arg => {
  logger_sock(["recv PACKET_PLAYER_LOSE", arg]);
};

//TODO
/**
 * Request: PACKET_GAME_START
 * Data recv: {room}
 */
const cbPacketGameStart = arg => {
  logger_sock(["recv PACKET_GAME_START", arg]);

  // settimestamp?
};

/**
 * Request: PACKET_GENFLOW
 * Data recv: {[pieces]} (default 10)
 */
const cbPacketGenFlow = ({pieces}) => {
  logger_sock(["recv PACKET_GENFLOW"]);

  store.dispatch(addPartsFlow(pieces));
};

/**
 * Request: PACKET_TETRIS_PLACE_PIECE
 * Data recv: {grid, playerName}
 */
const cbPacketTetrisPlacePiece = arg => {
  logger_sock(["recv PACKET_TETRIS_PLACE_PIECE", arg]);

  store.dispatch(updateGrid(arg));
};

//----------------------------------------------------------------------------
//
// RESPONSE
//
//----------------------------------------------------------------------------

socket.on(socketDefs.JOIN_ROOM_RESPONSE, arg => cbJoinRoomResponse(arg));
socket.on(socketDefs.QUIT_ROOM_RESPONSE, arg => cbQuitRoomResponse(arg));
socket.on(socketDefs.START_PLAYING_RESPONSE, arg => cbStartPlayingResponse(arg));
socket.on(socketDefs.CONNECTION_RESPONSE, arg => cbConnectionResponse(arg));
socket.on(socketDefs.TETRIS_PLACE_PIECE_RESPONSE, arg => cbTetrisPlacePieceResponse(arg));
socket.on(socketDefs.GENFLOW_RESPONSE, arg => cbGenFlowResponse(arg));

/**
 * Request: JOIN_ROOM_RESPONSE
 * Data recv: {error: {type, message}} || {success, room, user}
 */
const cbJoinRoomResponse = arg => {
  logger_sock(["recv JOIN_ROOM_RESPONSE", arg]);

  if (arg.error) {
    store.dispatch(addError(arg.error))
  } else {
    store.dispatch(updateUsers(arg.room.users))
  }
};

//TODO
/**
 * Request: QUIT_ROOM_RESPONSE
 * Data recv: {error: {type, message}} || {success, room, user}
 */
const cbQuitRoomResponse = arg => {
  logger_sock(["recv QUIT_ROOM_RESPONSE", arg]);
};

//TODO
/**
 * Request: START_PLAYING_RESPONSE
 * Data recv: {error: {type, message}} || {success}
 */
const cbStartPlayingResponse = arg => {
  logger_sock(["recv START_PLAYING_RESPONSE", arg]);
};

/**
 * Request: CONNECTION_RESPONSE
 * Data recv: {}
 */
const cbConnectionResponse = () => {
  logger_sock(["recv CONNECTION_RESPONSE"]);

  emitJoinRoom();
};

/**
 * Request: TETRIS_PLACE_PIECE_RESPONSE
 * Data recv: {error: {type, message}} || {success}
 */
const cbTetrisPlacePieceResponse = () => {
  logger_sock(["recv TETRIS_PLACE_PIECE_RESPONSE"]);
};

//TODO
/**
 * Request: GENFLOW_RESPONSE
 * Data recv: {}
 */
const cbGenFlowResponse = arg => {
  logger_sock(["recv GENFLOW_RESPONSE", arg]);
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
const emitJoinRoom = () => {
  logger_sock(["emit JOIN_ROOM"]);

  socket.emit(socketDefs.JOIN_ROOM, {
    roomName: store.getState().roomName,
    playerName: store.getState().playerName
  });
};

//TODO
/**
 * Used to tell when a player leave a room manually.
 * Data to sent: {roomName, playerName}
 */
const emitQuitRoom = () => {
  logger_sock(["emit QUIT_ROOM"]);
};

//TODO
/**
 * Used to tell to the backend that the room enter in a no-waiting state and no player can join the room after.
 * Data to sent: {roomName}
 */
const emitStartPlaying = () => {
  logger_sock(["emit START_PLAYING"]);
};

/**
 * Used to ask to the server new pieces
 * Data to sent: {roomName}
 */
const emitGenFlow = () => {
  logger_sock(["emit GENFLOW"]);

  socket.emit(socketDefs.GENFLOW, {roomName: store.getState().roomName});
};

/**
 * Used to tell to other clients that a player has placed a piece
 * Data to sent: {grid, playerName}
 */
const emitTetrisPlacePiece = (grid, playerName) => {
  logger_sock(["emit TETRIS_PLACE_PIECE"]);

  socket.emit(socketDefs.TETRIS_PLACE_PIECE, {grid: grid, playerName: playerName});
};

export {emitJoinRoom, emitQuitRoom, emitStartPlaying, emitGenFlow, emitTetrisPlacePiece};
