import io from 'socket.io-client';
import {store} from "../middlewares/store"
import socketDefs from "../../common/socket-definitions";
import {logger_sock} from "./logger-handler";

const socket = io.connect('http://localhost:4433');

//----------------------------------------------------------------------------
//
// ON
//
//----------------------------------------------------------------------------

socket.on(socketDefs.ACTION, act => store.dispatch(act));

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
 * Used to tell to the backend that the room enter in a no-waiting state and no player can join the room after.
 * Data to sent: {roomName}
 */
const emitStartPlaying = roomName => {
  logger_sock(["emit START_PLAYING", roomName]);

  socket.emit(socketDefs.START_PLAYING, {
    roomName: roomName
  });
};

/**
 * Used to ask to the server new pieces
 * Data to sent: {roomName}
 */
const emitGenFlow = roomName => {
  logger_sock(["emit GENFLOW", roomName]);

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
const emitPlayerCompleteLine = (roomName, playerName) => {
  logger_sock(["emit PLAYER_COMPLETE_LINE"]);

  socket.emit(socketDefs.PLAYER_COMPLETE_LINE, {
    roomName: roomName,
    playerName: playerName
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

export {
  emitJoinRoom,
  emitStartPlaying,
  emitGenFlow,
  emitTetrisPlacePiece,
  emitPlayerLoose,
  emitPlayerCompleteLine
};
