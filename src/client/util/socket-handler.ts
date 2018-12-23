import socketDefs from '../../common/socket-definitions';
import {loggerSock} from './logger-handler';
import {
  ADD_ERROR,
  ADD_PIECES_FLOW,
  ADD_WALL_LINE,
  CONNECTION_RESPONSE,
  RECV_START_GAME,
  ReduxAction,
  UPDATE_GAMES,
  UPDATE_GRID,
  UPDATE_PLAYERS,
} from '../actions/action-creators';
import {store} from '@src/client/middlewares/store';
import io from 'socket.io-client';
import {IGame, IPiece} from '@src/client/reducers/reducer';
import {Dispatch} from 'redux';

const socket = io.connect('http://localhost:4433');
const socketEmit = (ev: string, ag: any) => socket.emit(ev, ag);

const socketIsConnect = () => socket.connected;

// PACKET

/**
 * Request: PACKET_PLAYER_JOIN
 */

interface IPacketPlayerJoin {
  game: IGame,
  player: any
}

const cbPacketPlayerJoin = (dispatch: Dispatch<ReduxAction>) => (arg: IPacketPlayerJoin) => {
  loggerSock(['recv PACKET_PLAYER_JOIN']);

  const {game} = arg;

  if (game !== undefined && game.players !== undefined) {
    dispatch(UPDATE_PLAYERS(game.players));
  }
};
socket.on(socketDefs.PACKET_PLAYER_JOIN, cbPacketPlayerJoin(store.dispatch));

/**
 * Request: PACKET_PLAYER_QUIT
 */

interface IPacketPlayerQuit {
  player: any,
  game: IGame
}

const cbPacketPlayerQuit = (dispatch: Dispatch<ReduxAction>) => (arg: IPacketPlayerQuit) => {
  loggerSock(['recv PACKET_PLAYER_QUIT']);

  const {game} = arg;

  if (game && game.players) {
    dispatch(UPDATE_PLAYERS(game.players));
  }
};
socket.on(socketDefs.PACKET_PLAYER_QUIT, cbPacketPlayerQuit(store.dispatch));

/**
 * Request: PACKET_PLAYER_PROMOTED
 */

interface IPacketPlayerPromoted {
  player: any,
  game: IGame
}

const cbPacketPlayerPromoted = (dispatch: Dispatch<ReduxAction>) => (arg: IPacketPlayerPromoted) => {
  loggerSock(['recv PACKET_PLAYER_PROMOTED']);

  const {game} = arg;

  if (game && game.players) {
    dispatch(UPDATE_PLAYERS(game.players));
  }
};
socket.on(socketDefs.PACKET_PLAYER_PROMOTED, cbPacketPlayerPromoted(store.dispatch));

/**
 * Request: PACKET_PLAYER_LOSE
 */

interface IPacketPlayerLose {
  player: any,
  game: IGame
}

const cbPacketPlayerLose = (dispatch: Dispatch<ReduxAction>) => (arg: IPacketPlayerLose) => {
  loggerSock(['recv PACKET_PLAYER_LOSE']);

  const {game} = arg;

  if (game && game.players) {
    dispatch(UPDATE_PLAYERS(game.players));
  }
};
socket.on(socketDefs.PACKET_PLAYER_LOSE, cbPacketPlayerLose(store.dispatch));

/**
 * Request: PACKET_GAME_START
 */

interface IPacketGameStart {
  pieces: IPiece[],
  game: IGame,
}

const cbPacketGameStart = (dispatch: Dispatch<ReduxAction>) => (arg: IPacketGameStart) => {
  loggerSock(['recv PACKET_GAME_START', game.params]);

  const {pieces, game} = arg;

  if (pieces && game && game.params) {
    dispatch(RECV_START_GAME(pieces, game.params));
  }
};
socket.on(socketDefs.PACKET_GAME_START, cbPacketGameStart(store.dispatch));

/**
 * Request: PACKET_GENFLOW
 */

interface IPacketGenFlow {
  pieces: IPiece[]
}

const cbPacketGenFlow = (dispatch: Dispatch<ReduxAction>) => (arg: IPacketGenFlow) => {
  loggerSock(['recv PACKET_GENFLOW']);

  const {pieces} = arg;

  if (pieces) {
    dispatch(ADD_PIECES_FLOW(pieces));
  }
};
socket.on(socketDefs.PACKET_GENFLOW, cbPacketGenFlow(store.dispatch));

/**
 * Request: PACKET_PLAYER_COMPLETE_LINE
 */

interface IPacketPlayerCompleteLine {
  game: IGame,
  amount: number,
  player: any,
}

const cbPacketPlayerCompleteLine = (dispatch: Dispatch<ReduxAction>) => (arg: IPacketPlayerCompleteLine) => {
  loggerSock(['recv PACKET_PLAYER_COMPLETE_LINE']);

  const {game, amount} = arg;

  if (game && game.players) {
    dispatch(UPDATE_PLAYERS(game.players));
  }
  if (amount && game && game.params && game.params.addWallLine) {
    dispatch(ADD_WALL_LINE(amount));
  }
};
socket.on(socketDefs.PACKET_GENFLOW, arg => cbPacketGenFlow(arg, store.dispatch));

/**
 * Request: PACKET_TETRIS_PLACE_PIECE
 * Data recv: {grid, playerName} gridAndPlayer
 */
const cbPacketTetrisPlacePiece = (dispatch: Dispatch<ReduxAction>) => ({grid, playerName}, dispatch) => {
  loggerSock(['recv PACKET_TETRIS_PLACE_PIECE']);

  if (grid && playerName) {
    dispatch(UPDATE_GRID(grid, playerName));
  }
};
socket.on(socketDefs.PACKET_TETRIS_PLACE_PIECE, arg => cbPacketTetrisPlacePiece(arg, store.dispatch));

//----------------------------------------------------------------------------
//
// RESPONSE
//
//----------------------------------------------------------------------------

/**
 * Request: JOIN_GAME_RESPONSE
 * Data recv: {error: {type, message}} || {success, game, user}
 */
const cbJoinRoomResponse = (dispatch: Dispatch<ReduxAction>) => ({error, game}, dispatch) => {
  loggerSock(['recv JOIN_GAME_RESPONSE']);

  if (error) {
    dispatch(ADD_ERROR(error));
  }
  if (game && game.players) {
    dispatch(UPDATE_PLAYERS(game.players));
  }
};
socket.on(socketDefs.JOIN_GAME_RESPONSE, arg => cbJoinRoomResponse(arg, store.dispatch));

/**
 * Request: HOME_RESPONSE
 * Data recv: {games}
 */
const cbHomeResponse = (dispatch: Dispatch<ReduxAction>) => ({games}, dispatch) => {
  loggerSock(['recv HOME_RESPONSE']);

  if (games && games.rooms) {
    dispatch(UPDATE_GAMES(games.rooms));
  }
};
socket.on(socketDefs.HOME_RESPONSE, arg => cbHomeResponse(arg, store.dispatch));

/**
 * Request: QUIT_ROOM_RESPONSE
 * Data recv: {error: {type, message}} || {success, game, user}
 */
const cbQuitRoomResponse = (dispatch: Dispatch<ReduxAction>) => ({error, game}, dispatch) => {
  loggerSock(['recv QUIT_ROOM_RESPONSE']);

  if (error) {
    dispatch(ADD_ERROR(error));
  }
  if (game && game.players) {
    dispatch(UPDATE_PLAYERS(game.players));
  }
};
socket.on(socketDefs.QUIT_ROOM_RESPONSE, arg => cbQuitRoomResponse(arg, store.dispatch));

/**
 * Request: START_PLAYING_RESPONSE
 * Data recv: {error: {type, message}} || {success}
 */
const cbStartPlayingResponse = (dispatch: Dispatch<ReduxAction>) => ({error}, dispatch) => {
  loggerSock(['recv START_PLAYING_RESPONSE']);

  if (error) {
    dispatch(ADD_ERROR(error));
  }
};
socket.on(socketDefs.START_PLAYING_RESPONSE, arg => cbStartPlayingResponse(arg, store.dispatch));

/**
 * Request: CONNECTION_RESPONSE
 * Data recv: {}
 */
const cbConnectionResponse = (dispatch: Dispatch<ReduxAction>) => (_, dispatch) => {
  loggerSock(['recv CONNECTION_RESPONSE']);

  dispatch(CONNECTION_RESPONSE());
};
socket.on(socketDefs.CONNECTION_RESPONSE, arg => cbConnectionResponse(arg, store.dispatch));

/**
 * Request: TETRIS_PLACE_PIECE_RESPONSE
 * Data recv: {error: {type, message}} || {success}
 */
const cbTetrisPlacePieceResponse = (dispatch: Dispatch<ReduxAction>) => ({error}, dispatch) => {
  loggerSock(['recv TETRIS_PLACE_PIECE_RESPONSE']);

  if (error) {
    dispatch(ADD_ERROR(error));
  }
};
socket.on(socketDefs.TETRIS_PLACE_PIECE_RESPONSE, arg => cbTetrisPlacePieceResponse(arg, store.dispatch));

/**
 * Request: PLAYER_LOOSE_RESPONSE
 * Data recv: {}
 */
const cbPlayerLooseResponse = (dispatch: Dispatch<ReduxAction>) => ({error}, dispatch) => {
  loggerSock(['recv PLAYER_LOOSE_RESPONSE']);

  if (error) {
    dispatch(ADD_ERROR(error));
  }
};
socket.on(socketDefs.PLAYER_LOOSE_RESPONSE, arg => cbPlayerLooseResponse(arg, store.dispatch));

/**
 * Request: PLAYER_COMPLETE_LINE_RESPONSE
 * Data recv: {}
 */
const cbPlayerCompleteLineResponse = (dispatch: Dispatch<ReduxAction>) => ({error, game}, dispatch) => {
  loggerSock(['recv PLAYER_COMPLETE_LINE_RESPONSE']);

  if (error) {
    dispatch(ADD_ERROR(error));
  }
  if (game && game.players) {
    dispatch(UPDATE_PLAYERS(game.players));
  }
};
socket.on(socketDefs.PLAYER_COMPLETE_LINE_RESPONSE, arg => cbPlayerCompleteLineResponse(arg, store.dispatch));

/**
 * Request: GENFLOW_RESPONSE
 * Data recv: {}
 */
const cbGenFlowResponse = (dispatch: Dispatch<ReduxAction>) => ({error}, dispatch) => {
  loggerSock(['recv GENFLOW_RESPONSE']);

  if (error) {
    dispatch(ADD_ERROR(error));
  }
};
socket.on(socketDefs.GENFLOW_RESPONSE, arg => cbGenFlowResponse(arg, store.dispatch));

//----------------------------------------------------------------------------
//
// EMIT
//
//----------------------------------------------------------------------------

/**
 * Used to tell to the backend when a player want to join a room.
 * Data to sent: {roomName, playerName}
 */
const emitJoinRoom = (
  emit: (ev: string, ag: any) => void,
) => (
  roomName: string,
  playerName: string,
) => {
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
const emitStartPlaying = (
  emit: (ev: string, ag: any) => void,
) => (roomName, params, emit) => {
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
const emitGenFlow = (
  emit: (ev: string, ag: any) => void,
) => (roomName, emit) => {
  loggerSock(['emit GENFLOW']);

  emit(socketDefs.GENFLOW, {
    roomName: roomName,
  });
};

/**
 * Used to say to others player that you loose
 * Data to sent: {roomName, playerName}
 */
const emitPlayerLoose = (
  emit: (ev: string, ag: any) => void,
) => (roomName, playerName, emit) => {
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
const emitPlayerCompleteLine = (
  emit: (ev: string, ag: any) => void,
) => (roomName, playerName, amount, emit) => {
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
const emitTetrisPlacePiece = (
  emit: (ev: string, ag: any) => void,
) => (roomName, playerName, grid, emit) => {
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
const emitHome = (
  emit: (ev: string, ag: any) => void,
) => (emit) => {
  loggerSock(['emit HOME']);

  emit(socketDefs.HOME);
};

/**
 * Used to say to others player that you loose
 * Data to sent: {roomName, playerName}
 */
const emitQuitGame = (
  emit: (ev: string, ag: any) => void,
) => (roomName, playerName, emit) => {
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
  socketIsConnect,
  socketEmit,
};
