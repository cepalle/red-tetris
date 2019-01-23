import io from "socket.io-client";
import socketDefs from "../../common/socket-definitions";
import {store} from "../middlewares/store";
import {
  cbConnectionResponse, cbGenFlowResponse, cbHomeResponse,
  cbJoinRoomResponse,
  cbPacketGameStart,
  cbPacketGenFlow,
  cbPacketPlayerCompleteLine,
  cbPacketPlayerJoin,
  cbPacketPlayerLose,
  cbPacketPlayerPromoted,
  cbPacketPlayerQuit,
  cbPacketTetrisPlacePiece, cbPlayerCompleteLineResponse,
  cbPlayerLooseResponse,
  cbQuitRoomResponse,
  cbStartPlayingResponse,
  cbTetrisPlacePieceResponse
} from "./socket-handler";

const socket = io.connect('http://localhost:4433');
const socketEmit = (ev, ag) => socket.emit(ev, ag);

const socketIsConnect = () => socket.connected;

socket.on(socketDefs.PACKET_PLAYER_JOIN, arg => cbPacketPlayerJoin(arg, store.dispatch));
socket.on(socketDefs.PACKET_PLAYER_QUIT, arg => cbPacketPlayerQuit(arg, store.dispatch));
socket.on(socketDefs.PACKET_PLAYER_PROMOTED, arg => cbPacketPlayerPromoted(arg, store.dispatch));
socket.on(socketDefs.PACKET_PLAYER_LOSE, arg => cbPacketPlayerLose(arg, store.dispatch));
socket.on(socketDefs.PACKET_GAME_START, arg => cbPacketGameStart(arg, store.dispatch));
socket.on(socketDefs.PACKET_GENFLOW, arg => cbPacketGenFlow(arg, store.dispatch));
socket.on(socketDefs.PACKET_PLAYER_COMPLETE_LINE, arg => cbPacketPlayerCompleteLine(arg, store.dispatch));
socket.on(socketDefs.PACKET_TETRIS_PLACE_PIECE, arg => cbPacketTetrisPlacePiece(arg, store.dispatch));

socket.on(socketDefs.JOIN_GAME_RESPONSE, arg => cbJoinRoomResponse(arg, store.dispatch));
socket.on(socketDefs.HOME_RESPONSE, arg => cbHomeResponse(arg, store.dispatch));
socket.on(socketDefs.QUIT_ROOM_RESPONSE, arg => cbQuitRoomResponse(arg, store.dispatch));
socket.on(socketDefs.START_PLAYING_RESPONSE, arg => cbStartPlayingResponse(arg, store.dispatch));
socket.on(socketDefs.CONNECTION_RESPONSE, arg => cbConnectionResponse(arg, store.dispatch));
socket.on(socketDefs.TETRIS_PLACE_PIECE_RESPONSE, arg => cbTetrisPlacePieceResponse(arg, store.dispatch));
socket.on(socketDefs.PLAYER_LOOSE_RESPONSE, arg => cbPlayerLooseResponse(arg, store.dispatch));
socket.on(socketDefs.PLAYER_COMPLETE_LINE_RESPONSE, arg => cbPlayerCompleteLineResponse(arg, store.dispatch));
socket.on(socketDefs.GENFLOW_RESPONSE, arg => cbGenFlowResponse(arg, store.dispatch));

export {
  socketEmit,
  socketIsConnect,
  socket,
};
