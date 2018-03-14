import io from 'socket.io-client';
import {store} from "./store"
import {addPartsFlow} from "./action-creators"
import socketDefs from "../common/socket-definitions";
import {logger_sock} from "./logger";

const socket = io.connect('http://localhost:4433');

// packet
socket.on(socketDefs.PACKET_PLAYER_JOIN, p => cbPacketPlayerJoin(p));
socket.on(socketDefs.PACKET_PLAYER_QUIT, p => cbPacketPlayerQuit(p));
socket.on(socketDefs.PACKET_PLAYER_PROMOTED, p => cbPacketPlayerPromoted(p));
socket.on(socketDefs.PACKET_PLAYER_LOSE, p => cbPacketPlayerLose(p));
socket.on(socketDefs.PACKET_GAME_START, p => cbPacketGameStart(p));
socket.on(socketDefs.PACKET_GENFLOW, p => cbPacketGenFlow(p));

// response
socket.on(socketDefs.JOIN_ROOM_RESPONSE, p => cbJoinRoomResponse(p));
socket.on(socketDefs.QUIT_ROOM_RESPONSE, p => cbJoinRoomResponse(p));
socket.on(socketDefs.START_PLAYING_RESPONSE, p => cbJoinRoomResponse(p));
socket.on(socketDefs.CONNECTION_RESPONSE, () => cbConnectionResponse());
socket.on(socketDefs.GENFLOW_RESPONSE, p => cbJoinRoomResponse(p));


// callback socket.on

// packet
const cbPacketPlayerJoin = () => {
  logger_sock(["recv PACKET_PLAYER_JOIN"]);
};

const cbPacketPlayerQuit = () => {
  logger_sock(["recv PACKET_PLAYER_QUIT"]);
};

const cbPacketPlayerPromoted = () => {
  logger_sock(["recv PACKET_PLAYER_PROMOTED"]);
};

const cbPacketPlayerLose = () => {
  logger_sock(["recv PACKET_PLAYER_LOSE"]);
};

const cbPacketGameStart = () => {
  logger_sock(["recv PACKET_GAME_START"]);
};

const cbPacketGenFlow = ({pieces}) => {
  logger_sock(["recv PACKET_GENFLOW"]);
  store.dispatch(addPartsFlow(pieces));
};



// response
const cbConnectionResponse = () => {
  logger_sock(["recv connection response"]);
  emitJoinRoom();
};

const cbJoinRoomResponse = (p) => {
  logger_sock(["recv join room", p]);
};

// socket.emit function

const emitGenFlow = () => {
  logger_sock(["emit genflow"]);
  socket.emit(socketDefs.GENFLOW, {roomName: store.getState().roomName});
};

const emitJoinRoom = () => {
  logger_sock(["emit join room"]);
  socket.emit(socketDefs.JOIN_ROOM, {
    roomName: store.getState().roomName,
    playerName: store.getState().playerName
  });
};

export {emitGenFlow, emitJoinRoom};
