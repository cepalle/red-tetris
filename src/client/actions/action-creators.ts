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
  type: EnumAction
}

// ---

interface IAddPiecesFlow extends IAction {
  type: EnumAction.ADD_PIECES_FLOW
  pieces: any[] // TODO
}

const ADD_PIECES_FLOW = (pieces: any[]): IAddPiecesFlow => {
  return {
    type: EnumAction.ADD_PIECES_FLOW,
    pieces: pieces
  };
};

interface IAddError extends IAction {
  type: EnumAction.ADD_ERROR,
  error: any // TODO
}

const ADD_ERROR = (error: any): IAddError => {
  return {
    type: EnumAction.ADD_ERROR,
    error: error
  }
};

interface IUpadtePlayers extends IAction {
  type: EnumAction.UPDATE_PLAYERS,
  players: any[]
}

const UPDATE_PLAYERS = (players: any[]): IUpadtePlayers => {
  return {
    type: EnumAction.UPDATE_PLAYERS,
    players: players
  }
};

interface IPiecesMove extends IAction {
  type: EnumAction.PIECES_MOVE,
  move: any
}

const PIECES_MOVE = (move: any): IPiecesMove => {
  return {
    type: EnumAction.PIECES_MOVE,
    move: move
  }
};

interface IUpdateGrid extends IAction {
  type: EnumAction.UPDATE_GRID,
  grid: any,
  playerName: any,
}

const UPDATE_GRID = (grid: any, playerName: any): IUpdateGrid => {
  return {
    type: EnumAction.UPDATE_GRID,
    grid: grid,
    playerName: playerName
  }
};

interface IRecvStartGame extends IAction {
  type: EnumAction.RECV_START_GAME,
  pieces: any,
  params: any,
}

const RECV_START_GAME = (pieces: any, params: any): IRecvStartGame => {
  return {
    type: EnumAction.RECV_START_GAME,
    pieces: pieces,
    params: params
  }
};

interface IAddWallLine extends IAction {
  type: EnumAction.ADD_WALL_LINE,
  amount: any
}

const ADD_WALL_LINE = (amount: any): IAddWallLine => {
  return {
    type: EnumAction.ADD_WALL_LINE,
    amount: amount
  }
};

interface IConnectionResponse extends IAction {
  type: EnumAction.CONNECTION_RESPONSE
}

const CONNECTION_RESPONSE = (): IConnectionResponse => {
  return {
    type: EnumAction.CONNECTION_RESPONSE
  }
};

interface ISendStartGame extends IAction {
  type: EnumAction.SEND_START_GAME
}

const SEND_START_GAME = (): ISendStartGame => {
  return {
    type: EnumAction.SEND_START_GAME
  }
};

interface IUpdateRoomPlayerName extends IAction {
  type: EnumAction.UPDATE_ROOM_PLAYER_NAME,
  roomName: any,
  playerName: any
}

const UPDATE_ROOM_PLAYER_NAME = (roomName: any, playerName: any): IUpdateRoomPlayerName => {
  return {
    type: EnumAction.UPDATE_ROOM_PLAYER_NAME,
    roomName: roomName,
    playerName: playerName
  }
};

interface IUpdateGame extends IAction {
  type: EnumAction.UPDATE_GAMES,
  games: any
}

const UPDATE_GAMES = (games: any): IUpdateGame => {
  return {
    type: EnumAction.UPDATE_GAMES,
    games: games,
  }
};

interface IEmitQuitGame extends IAction {
  type: EnumAction.EMIT_QUIT_GAME
}

const EMIT_QUIT_GAME = (): IEmitQuitGame => {
  return {
    type: EnumAction.EMIT_QUIT_GAME,
  }
};

interface IToggleAddWallLine extends IAction {
  type: EnumAction.TOGGLE_ADD_WALL_LINE
}

const TOGGLE_ADD_WALL_LINE = (): IToggleAddWallLine => {
  return {
    type: EnumAction.TOGGLE_ADD_WALL_LINE,
  }
};

interface IToggleGroundResizer extends IAction {
  type: EnumAction.TOGGLE_GROUND_RESIZER
}

const TOGGLE_GROUND_RESIZER = (): IToggleGroundResizer => {
  return {
    type: EnumAction.TOGGLE_GROUND_RESIZER,
  }
};

interface IUpdateEmitLoose extends IAction {
  type: EnumAction.UPDATE_EMITE_LOOSE,
  bool: boolean
}

const UPDATE_EMITE_LOOSE = (bool: boolean): IUpdateEmitLoose => {
  return {
    type: EnumAction.UPDATE_EMITE_LOOSE,
    bool
  }
};

interface IUpdateEmiteJoinRoom extends IAction {
  type: EnumAction.UPDATE_EMITE_JOIN_ROOM,
  bool: boolean
}

const UPDATE_EMITE_JOIN_ROOM = (bool: boolean): IUpdateEmiteJoinRoom => {
  return {
    type: EnumAction.UPDATE_EMITE_JOIN_ROOM,
    bool
  }
};

interface IUpdateEmiteUpdateGrid extends IAction {
  type: EnumAction.UPDATE_EMITE_UPDATE_GRID,
  bool: boolean
}

const UPDATE_EMITE_UPDATE_GRID = (bool: boolean): IUpdateEmiteUpdateGrid => {
  return {
    type: EnumAction.UPDATE_EMITE_UPDATE_GRID,
    bool
  }
};

interface IUpdateEmiteCompleteLine extends IAction {
  type: EnumAction.UPDATE_EMITE_COMPLETE_LINE,
  nb: number
}

const UPDATE_EMITE_COMPLETE_LINE = (nb: number): IUpdateEmiteCompleteLine => {
  return {
    type: EnumAction.UPDATE_EMITE_COMPLETE_LINE,
    nb
  }
};

interface ICleanError extends IAction {
  type: EnumAction.CLEAN_ERROR
}

const CLEAN_ERROR = (): ICleanError => {
  return {
    type: EnumAction.CLEAN_ERROR
  }
};

interface IUpdateSocketIsConnect extends IAction {
  type: EnumAction.UPDATE_SOCKET_IS_CONNECT,
  bool: boolean
}

const UPDATE_SOCKET_IS_CONNECT = (bool: boolean): IUpdateSocketIsConnect => {
  return {
    type: EnumAction.UPDATE_SOCKET_IS_CONNECT,
    bool
  }
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
