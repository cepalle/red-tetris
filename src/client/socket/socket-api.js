import io from 'socket.io-client';
import {store} from "../redux/store"
import {addError, addPartsFlow, updateUsers} from "../redux/action-creators"
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

const cbPacketPlayerJoin = (arg) => {
  logger_sock(["recv PACKET_PLAYER_JOIN", arg]);

  if (arg.error) {
    store.dispatch(addError(arg.error))
  } else {
    store.dispatch(updateUsers(arg.room.users))
  }
};

const cbPacketPlayerQuit = (arg) => {
  logger_sock(["recv PACKET_PLAYER_QUIT", arg]);

  if (arg.error) {
    store.dispatch(addError(arg.error))
  } else {
    store.dispatch(updateUsers(arg.room.users))
  }
};

const cbPacketPlayerPromoted = (arg) => {
  logger_sock(["recv PACKET_PLAYER_PROMOTED", arg]);

  if (arg.error) {
    store.dispatch(addError(arg.error))
  } else {
    store.dispatch(updateUsers(arg.room.users))
  }
};

const cbPacketPlayerLose = (arg) => {
  logger_sock(["recv PACKET_PLAYER_LOSE", arg]);
};

const cbPacketGameStart = (arg) => {
  logger_sock(["recv PACKET_GAME_START", arg]);
};

const cbPacketGenFlow = ({pieces}) => {
  logger_sock(["recv PACKET_GENFLOW"]);
  store.dispatch(addPartsFlow(pieces));
};

const cbPacketTetrisPlacePiece = (arg) => {
  logger_sock(["recv PACKET_TETRIS_PLACE_PIECE", arg]);
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
socket.on(socketDefs.GENFLOW_RESPONSE, arg => cbGenFlowResponse(arg));

const cbJoinRoomResponse = (arg) => {
  logger_sock(["recv JOIN_ROOM_RESPONSE", arg]);

  if (arg.error) {
    store.dispatch(addError(arg.error))
  } else {
    store.dispatch(updateUsers(arg.room.users))
  }
};

const cbQuitRoomResponse = (arg) => {
  logger_sock(["recv QUIT_ROOM_RESPONSE", arg]);
};

const cbStartPlayingResponse = (arg) => {
  logger_sock(["recv START_PLAYING_RESPONSE", arg]);
};

const cbConnectionResponse = () => {
  logger_sock(["recv CONNECTION_RESPONSE"]);
  emitJoinRoom();
};

const cbGenFlowResponse = (arg) => {
  logger_sock(["recv GENFLOW_RESPONSE", arg]);
};

//----------------------------------------------------------------------------
//
// EMIT
//
//----------------------------------------------------------------------------

const emitGenFlow = () => {
  logger_sock(["emit GENFLOW"]);
  socket.emit(socketDefs.GENFLOW, {roomName: store.getState().roomName});
};

const emitQuitRoom = () => {
  logger_sock(["emit QUIT_ROOM"]);
};

const emitStartPlaying = () => {
  logger_sock(["emit START_PLAYING"]);
};

const emitJoinRoom = () => {
  logger_sock(["emit JOIN_ROOM"]);
  socket.emit(socketDefs.JOIN_ROOM, {
    roomName: store.getState().roomName,
    playerName: store.getState().playerName
  });
};

export {emitGenFlow, emitQuitRoom, emitStartPlaying, emitJoinRoom};
