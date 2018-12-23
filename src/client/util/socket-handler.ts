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
import {IError, IGame, IParams, IPiece, IPlayerState} from '@src/client/reducers/reducer';
import {Dispatch} from 'redux';
import {ENUM_PIECES} from '@src/client/util/grid-piece-handler';

const socket = io.connect('http://localhost:4433');
const socketEmit = (ev: string, ag: any) => socket.emit(ev, ag);

const socketIsConnect = () => socket.connected;

// PACKET

/**
 * Request: PACKET_PLAYER_JOIN
 */

interface IPacketPlayerJoin {
  game: IGame,
  player: IPlayerState
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
  player: IPlayerState,
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
  player: IPlayerState,
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
  player: IPlayerState,
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
  player: IPlayerState,
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
socket.on(socketDefs.PACKET_GENFLOW, cbPacketGenFlow(store.dispatch));

/**
 * Request: PACKET_TETRIS_PLACE_PIECE
 * Data recv: {grid, playerName} gridAndPlayer
 */

interface IPacketTetrisPlacePiece {
  grid: ENUM_PIECES[][],
  playerName: string,
}

const cbPacketTetrisPlacePiece = (dispatch: Dispatch<ReduxAction>) => (arg: IPacketTetrisPlacePiece) => {
  loggerSock(['recv PACKET_TETRIS_PLACE_PIECE']);

  const {grid, playerName} = arg;

  if (grid && playerName) {
    dispatch(UPDATE_GRID(grid, playerName));
  }
};
socket.on(socketDefs.PACKET_TETRIS_PLACE_PIECE, cbPacketTetrisPlacePiece(store.dispatch));

//----------------------------------------------------------------------------
//
// RESPONSE
//
//----------------------------------------------------------------------------

/**
 * Request: JOIN_GAME_RESPONSE
 */

interface IJoinRoomResponse {
  error?: IError,

  success?: any,
  game?: IGame,
  user?: any,
}

const cbJoinRoomResponse = (dispatch: Dispatch<ReduxAction>) => (arg: IJoinRoomResponse) => {
  loggerSock(['recv JOIN_GAME_RESPONSE']);

  const {error, game} = arg;

  if (error) {
    dispatch(ADD_ERROR(error));
  }
  if (game && game.players) {
    dispatch(UPDATE_PLAYERS(game.players));
  }
};
socket.on(socketDefs.JOIN_GAME_RESPONSE, cbJoinRoomResponse(store.dispatch));

/**
 * Request: HOME_RESPONSE
 */

interface IHomeResponse {
  games: any, // TODO check
}

const cbHomeResponse = (dispatch: Dispatch<ReduxAction>) => (arg: IHomeResponse) => {
  loggerSock(['recv HOME_RESPONSE']);

  const {games} = arg;

  if (games && games.rooms) {
    dispatch(UPDATE_GAMES(games.rooms));
  }
};
socket.on(socketDefs.HOME_RESPONSE, cbHomeResponse(store.dispatch));

/**
 * Request: QUIT_ROOM_RESPONSE
 */

interface IQuitRoomResponse {
  error?: IError,

  success?: any,
  game?: IGame,
  user?: any,
}

const cbQuitRoomResponse = (dispatch: Dispatch<ReduxAction>) => (arg: IQuitRoomResponse) => {
  loggerSock(['recv QUIT_ROOM_RESPONSE']);

  const {error, game} = arg;

  if (error) {
    dispatch(ADD_ERROR(error));
  }
  if (game && game.players) {
    dispatch(UPDATE_PLAYERS(game.players));
  }
};
socket.on(socketDefs.QUIT_ROOM_RESPONSE, cbQuitRoomResponse(store.dispatch));

/**
 * Request: START_PLAYING_RESPONSE
 * Data recv: {error: {type, message}} || {success}
 */

interface IStartPlayerResponse {
  error?: IError,

  success?: any,
}

const cbStartPlayingResponse = (dispatch: Dispatch<ReduxAction>) => (arg: IStartPlayerResponse) => {
  loggerSock(['recv START_PLAYING_RESPONSE']);

  const {error} = arg;

  if (error) {
    dispatch(ADD_ERROR(error));
  }
};
socket.on(socketDefs.START_PLAYING_RESPONSE, cbStartPlayingResponse(store.dispatch));

/**
 * Request: CONNECTION_RESPONSE
 */
const cbConnectionResponse = (dispatch: Dispatch<ReduxAction>) => () => {
  loggerSock(['recv CONNECTION_RESPONSE']);

  dispatch(CONNECTION_RESPONSE());
};
socket.on(socketDefs.CONNECTION_RESPONSE, cbConnectionResponse(store.dispatch));

/**
 * Request: TETRIS_PLACE_PIECE_RESPONSE
 * Data recv: {error: {type, message}} || {success}
 */

interface ITetrisPlacePieceResponse {
  error?: IError,

  success?: any,
}

const cbTetrisPlacePieceResponse = (dispatch: Dispatch<ReduxAction>) => (arg: ITetrisPlacePieceResponse) => {
  loggerSock(['recv TETRIS_PLACE_PIECE_RESPONSE']);

  const {error} = arg;

  if (error) {
    dispatch(ADD_ERROR(error));
  }
};
socket.on(socketDefs.TETRIS_PLACE_PIECE_RESPONSE, cbTetrisPlacePieceResponse(store.dispatch));

/**
 * Request: PLAYER_LOOSE_RESPONSE
 */

interface IPlayerLooseResponse {
  error?: IError,

  success?: any,
}

const cbPlayerLooseResponse = (dispatch: Dispatch<ReduxAction>) => (arg: IPlayerLooseResponse) => {
  loggerSock(['recv PLAYER_LOOSE_RESPONSE']);

  const {error} = arg;

  if (error) {
    dispatch(ADD_ERROR(error));
  }
};
socket.on(socketDefs.PLAYER_LOOSE_RESPONSE, cbPlayerLooseResponse(store.dispatch));

/**
 * Request: PLAYER_COMPLETE_LINE_RESPONSE
 * Data recv: {}
 */

interface IPlayerCompleteLineResponse {
  error?: IError,

  success?: any,
  game?: IGame,
}

const cbPlayerCompleteLineResponse = (dispatch: Dispatch<ReduxAction>) => (arg: IPlayerCompleteLineResponse) => {
  loggerSock(['recv PLAYER_COMPLETE_LINE_RESPONSE']);

  const {error, game} = arg;

  if (error) {
    dispatch(ADD_ERROR(error));
  }
  if (game && game.players) {
    dispatch(UPDATE_PLAYERS(game.players));
  }
};
socket.on(socketDefs.PLAYER_COMPLETE_LINE_RESPONSE, cbPlayerCompleteLineResponse(store.dispatch));

/**
 * Request: GENFLOW_RESPONSE
 * Data recv: {}
 */

interface IGenFlowResponse {
  error?: IError,

  success?: any,
}

const cbGenFlowResponse = (dispatch: Dispatch<ReduxAction>) => (arg: IGenFlowResponse) => {
  loggerSock(['recv GENFLOW_RESPONSE']);

  const {error} = arg;

  if (error) {
    dispatch(ADD_ERROR(error));
  }
};
socket.on(socketDefs.GENFLOW_RESPONSE, cbGenFlowResponse(store.dispatch));

//----------------------------------------------------------------------------
//
// EMIT
//
//----------------------------------------------------------------------------

/**
 * Used to tell to the backend when a player want to join a room.
 * Data to sent: {roomName, playerName}
 */
const factEmitJoinRoom = (
  emit: (ev: string, ag: any) => void,
) => (
  roomName: string,
  playerName: string,
): void => {
  loggerSock(['emit JOIN_GAME']);

  emit(socketDefs.JOIN_GAME, {
    roomName: roomName,
    playerName: playerName,
  });
};
const emitJoinRoom = factEmitJoinRoom(socketEmit);

/**
 * Used to tell to the backend that the room enter in a no-waiting getState and no player can join the room after.
 * Data to sent: {roomName, params}
 */
const factEmitStartPlaying = (
  emit: (ev: string, ag: any) => void,
) => (roomName: string, params: IParams): void => {
  loggerSock(['emit START_PLAYING', params]);

  // TODO use type
  emit(socketDefs.START_PLAYING, {
    roomName: roomName,
    params: params,
  });
};
const emitStartPlaying = factEmitStartPlaying(socketEmit);

/**
 * Used to ask to the server new pieces
 * Data to sent: {roomName}
 */
const factEmitGenFlow = (
  emit: (ev: string, ag: any) => void,
) => (roomName: string): void => {
  loggerSock(['emit GENFLOW']);

  emit(socketDefs.GENFLOW, {
    roomName: roomName,
  });
};
const emitGenFlow = factEmitGenFlow(socketEmit);

/**
 * Used to say to others player that you loose
 * Data to sent: {roomName, playerName}
 */
const factEmitPlayerLoose = (
  emit: (ev: string, ag: any) => void,
) => (roomName: string, playerName: string): void => {
  loggerSock(['emit PLAYER_LOOSE']);

  emit(socketDefs.PLAYER_LOOSE, {
    roomName: roomName,
    playerName: playerName,
  });
};
const emitPlayerLoose = factEmitPlayerLoose(socketEmit);

/**
 * Used to say to others player that you completed a line
 * Data to sent: {roomName, playerName}
 */
const factEmitPlayerCompleteLine = (
  emit: (ev: string, ag: any) => void,
) => (roomName: string, playerName: string, amount: number): void => {
  loggerSock(['emit PLAYER_COMPLETE_LINE']);

  emit(socketDefs.PLAYER_COMPLETE_LINE, {
    roomName: roomName,
    playerName: playerName,
    amount: amount,
  });
};
const emitPlayerCompleteLine = factEmitPlayerCompleteLine(socketEmit);

/**
 * Used to tell to other clients that a player has placed a piece
 * Data to sent: {grid, playerName}
 */
const factEmitTetrisPlacePiece = (
  emit: (ev: string, ag: any) => void,
) => (roomName: string, playerName: string, grid: ENUM_PIECES[][]): void => {
  loggerSock(['emit TETRIS_PLACE_PIECE']);

  emit(socketDefs.TETRIS_PLACE_PIECE, {
    grid: grid,
    roomName: roomName,
    playerName: playerName,
  });
};
const emitTetrisPlacePiece = factEmitTetrisPlacePiece(socketEmit);

/**
 * Used to ask the server the list of room
 */
const factEmitHome = (
  emit: (ev: string, ag: any) => void,
) => (): void => {
  loggerSock(['emit HOME']);

  emit(socketDefs.HOME, {});
};
const emitHome = factEmitHome(socketEmit);

/**
 * Used to say to others player that you loose
 * Data to sent: {roomName, playerName}
 */
const factEmitQuitGame = (
  emit: (ev: string, ag: any) => void,
) => (roomName: string, playerName: string): void => {
  loggerSock(['emit QUIT_GAME']);

  emit(socketDefs.QUIT_GAME, {
    roomName: roomName,
    playerName: playerName,
  });
};
const emitQuitGame = factEmitQuitGame(socketEmit);

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
