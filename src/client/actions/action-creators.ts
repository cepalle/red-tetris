import {IError, IGame, IParams, IPiece, IPlayerState} from '../reducers/reducer';
import {ENUM_PIECES_MOVE, ENUM_PIECES} from '../util/grid-piece-handler';

enum EnumAction {
  ADD_PIECES_FLOW,
  ADD_ERROR,
  UPDATE_PLAYERS,
  PIECES_MOVE,
  UPDATE_GRID,
  RECV_START_GAME,
  ADD_WALL_LINE,
  CONNECTION_RESPONSE,
  SEND_START_GAME,
  UPDATE_ROOM_PLAYER_NAME,
  UPDATE_GAMES,
  EMIT_QUIT_GAME,
  TOGGLE_ADD_WALL_LINE,
  TOGGLE_GROUND_RESIZER,
  UPDATE_EMITE_LOOSE,
  UPDATE_EMITE_JOIN_ROOM,
  UPDATE_EMITE_UPDATE_GRID,
  UPDATE_EMITE_COMPLETE_LINE,
  CLEAN_ERROR,
  UPDATE_SOCKET_IS_CONNECT,
}

interface IAction {
  readonly type: EnumAction
}

// ---

interface IAddPiecesFlow extends IAction {
  readonly type: EnumAction.ADD_PIECES_FLOW
  readonly pieces: IPiece[]
}

const ADD_PIECES_FLOW = (pieces: IPiece[]): IAddPiecesFlow => {
  return {
    type: EnumAction.ADD_PIECES_FLOW,
    pieces: pieces,
  };
};

interface IAddError extends IAction {
  readonly type: EnumAction.ADD_ERROR,
  readonly error: IError
}

const ADD_ERROR = (error: IError): IAddError => {
  return {
    type: EnumAction.ADD_ERROR,
    error: error,
  };
};

interface IUpadtePlayers extends IAction {
  readonly type: EnumAction.UPDATE_PLAYERS,
  readonly players: IPlayerState[]
}

const UPDATE_PLAYERS = (players: IPlayerState[]): IUpadtePlayers => {
  return {
    type: EnumAction.UPDATE_PLAYERS,
    players: players,
  };
};

interface IPiecesMove extends IAction {
  readonly type: EnumAction.PIECES_MOVE,
  readonly move: ENUM_PIECES_MOVE
}

const PIECES_MOVE = (move: ENUM_PIECES_MOVE): IPiecesMove => {
  return {
    type: EnumAction.PIECES_MOVE,
    move: move,
  };
};

interface IUpdateGrid extends IAction {
  readonly type: EnumAction.UPDATE_GRID,
  readonly grid: ENUM_PIECES[][],
  readonly playerName: string,
}

const UPDATE_GRID = (grid: ENUM_PIECES[][], playerName: string): IUpdateGrid => {
  return {
    type: EnumAction.UPDATE_GRID,
    grid: grid,
    playerName: playerName,
  };
};

interface IRecvStartGame extends IAction {
  readonly type: EnumAction.RECV_START_GAME,
  readonly pieces: IPiece[],
  readonly params: IParams,
}

const RECV_START_GAME = (pieces: IPiece[], params: IParams): IRecvStartGame => {
  return {
    type: EnumAction.RECV_START_GAME,
    pieces: pieces,
    params: params,
  };
};

interface IAddWallLine extends IAction {
  readonly type: EnumAction.ADD_WALL_LINE,
  readonly amount: number
}

const ADD_WALL_LINE = (amount: number): IAddWallLine => {
  return {
    type: EnumAction.ADD_WALL_LINE,
    amount: amount,
  };
};

interface IConnectionResponse extends IAction {
  readonly type: EnumAction.CONNECTION_RESPONSE
}

const CONNECTION_RESPONSE = (): IConnectionResponse => {
  return {
    type: EnumAction.CONNECTION_RESPONSE,
  };
};

interface ISendStartGame extends IAction {
  readonly type: EnumAction.SEND_START_GAME
}

const SEND_START_GAME = (): ISendStartGame => {
  return {
    type: EnumAction.SEND_START_GAME,
  };
};

interface IUpdateRoomPlayerName extends IAction {
  readonly type: EnumAction.UPDATE_ROOM_PLAYER_NAME,
  readonly roomName: string,
  readonly playerName: string
}

const UPDATE_ROOM_PLAYER_NAME = (roomName: string, playerName: string): IUpdateRoomPlayerName => {
  return {
    type: EnumAction.UPDATE_ROOM_PLAYER_NAME,
    roomName: roomName,
    playerName: playerName,
  };
};

interface IUpdateGame extends IAction {
  readonly type: EnumAction.UPDATE_GAMES,
  readonly games: IGame[]
}

const UPDATE_GAMES = (games: IGame[]): IUpdateGame => {
  return {
    type: EnumAction.UPDATE_GAMES,
    games: games,
  };
};

interface IEmitQuitGame extends IAction {
  readonly type: EnumAction.EMIT_QUIT_GAME
}

const EMIT_QUIT_GAME = (): IEmitQuitGame => {
  return {
    type: EnumAction.EMIT_QUIT_GAME,
  };
};

interface IToggleAddWallLine extends IAction {
  readonly type: EnumAction.TOGGLE_ADD_WALL_LINE
}

const TOGGLE_ADD_WALL_LINE = (): IToggleAddWallLine => {
  return {
    type: EnumAction.TOGGLE_ADD_WALL_LINE,
  };
};

interface IToggleGroundResizer extends IAction {
  readonly type: EnumAction.TOGGLE_GROUND_RESIZER
}

const TOGGLE_GROUND_RESIZER = (): IToggleGroundResizer => {
  return {
    type: EnumAction.TOGGLE_GROUND_RESIZER,
  };
};

interface IUpdateEmitLoose extends IAction {
  readonly type: EnumAction.UPDATE_EMITE_LOOSE,
  readonly bool: boolean
}

const UPDATE_EMITE_LOOSE = (bool: boolean): IUpdateEmitLoose => {
  return {
    type: EnumAction.UPDATE_EMITE_LOOSE,
    bool,
  };
};

interface IUpdateEmiteJoinRoom extends IAction {
  readonly  type: EnumAction.UPDATE_EMITE_JOIN_ROOM,
  readonly bool: boolean
}

const UPDATE_EMITE_JOIN_ROOM = (bool: boolean): IUpdateEmiteJoinRoom => {
  return {
    type: EnumAction.UPDATE_EMITE_JOIN_ROOM,
    bool,
  };
};

interface IUpdateEmiteUpdateGrid extends IAction {
  readonly type: EnumAction.UPDATE_EMITE_UPDATE_GRID,
  readonly bool: boolean
}

const UPDATE_EMITE_UPDATE_GRID = (bool: boolean): IUpdateEmiteUpdateGrid => {
  return {
    type: EnumAction.UPDATE_EMITE_UPDATE_GRID,
    bool,
  };
};

interface IUpdateEmiteCompleteLine extends IAction {
  readonly type: EnumAction.UPDATE_EMITE_COMPLETE_LINE,
  readonly nb: number
}

const UPDATE_EMITE_COMPLETE_LINE = (nb: number): IUpdateEmiteCompleteLine => {
  return {
    type: EnumAction.UPDATE_EMITE_COMPLETE_LINE,
    nb,
  };
};

interface ICleanError extends IAction {
  readonly type: EnumAction.CLEAN_ERROR
}

const CLEAN_ERROR = (): ICleanError => {
  return {
    type: EnumAction.CLEAN_ERROR,
  };
};

interface IUpdateSocketIsConnect extends IAction {
  readonly  type: EnumAction.UPDATE_SOCKET_IS_CONNECT,
  readonly  bool: boolean
}

const UPDATE_SOCKET_IS_CONNECT = (bool: boolean): IUpdateSocketIsConnect => {
  return {
    type: EnumAction.UPDATE_SOCKET_IS_CONNECT,
    bool,
  };
};

type ReducerAction = IUpdateEmiteJoinRoom
  | IUpdateEmiteUpdateGrid
  | IUpdateEmiteCompleteLine
  | ICleanError
  | IUpdateEmitLoose
  | IToggleGroundResizer
  | IToggleAddWallLine
  | IEmitQuitGame
  | IUpdateGame
  | IUpdateRoomPlayerName
  | ISendStartGame
  | IConnectionResponse
  | IAddWallLine
  | IRecvStartGame
  | IUpdateGrid
  | IPiecesMove
  | IUpadtePlayers
  | IAddError
  | IAddPiecesFlow
  | IUpdateSocketIsConnect;

export {
  PIECES_MOVE,
  ADD_PIECES_FLOW,
  ADD_ERROR,
  UPDATE_PLAYERS,
  ENUM_PIECES_MOVE,
  UPDATE_GRID,
  RECV_START_GAME,
  ADD_WALL_LINE,
  CONNECTION_RESPONSE,
  SEND_START_GAME,
  UPDATE_ROOM_PLAYER_NAME,
  UPDATE_GAMES,
  EMIT_QUIT_GAME,
  TOGGLE_ADD_WALL_LINE,
  TOGGLE_GROUND_RESIZER,
  UPDATE_EMITE_LOOSE,
  UPDATE_EMITE_JOIN_ROOM,
  UPDATE_EMITE_UPDATE_GRID,
  UPDATE_EMITE_COMPLETE_LINE,
  CLEAN_ERROR,
  UPDATE_SOCKET_IS_CONNECT,
  IUpdateEmiteJoinRoom,
  IUpdateEmiteUpdateGrid,
  IUpdateEmiteCompleteLine,
  ICleanError,
  EnumAction,
  IAction,
  IUpdateEmitLoose,
  IToggleGroundResizer,
  IToggleAddWallLine,
  IEmitQuitGame,
  IUpdateGame,
  IUpdateRoomPlayerName,
  ISendStartGame,
  IConnectionResponse,
  IAddWallLine,
  IRecvStartGame,
  IUpdateGrid,
  IPiecesMove,
  IUpadtePlayers,
  IAddError,
  IAddPiecesFlow,
  ReducerAction,
};
