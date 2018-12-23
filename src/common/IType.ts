interface IOptionGame {
  readonly addWallLine: boolean,
  readonly groundResizer: boolean,
}

interface IPos {
  readonly x: number,
  readonly y: number
}

interface IPiece {
  readonly num: number,
  readonly rot: number,
}

// ---

enum ENUM_PIECES_MOVE {
  ROT_RIGHT = 'PIECES_ROT_RIGHT',
  ROT_LEFT = 'PIECES_ROT_LEFT',
  RIGHT = 'PIECES_MOVE_RIGHT',
  LEFT = 'PIECES_MOVE_LEFT',
  DOWN = 'PIECES_MOVE_DOWN',
  DROP = 'PIECES_DROP',
  SWITCH = 'PIECE_SWITCH',
}

enum ENUM_PIECES {
  empty = 0,
  n1 = 1,
  n2 = 2,
  n3 = 3,
  n4 = 4,
  n5 = 5,
  n6 = 6,
  n7 = 7,
  wall,
  preview,
  wall_malus,
  wall_loose,
  wall_win,
  wall_spect,
}

interface IPlayerState {
  readonly grid: number[][],
  readonly win: boolean,
  readonly playerName: string,
  readonly master: boolean,
  readonly loose: boolean,
  readonly score: number,
  readonly lines: number,
  readonly spectator: boolean,
  readonly id: string,
}

interface IError {
  type?: string,
  message?: string
}

interface IGame {
  players: IPlayerState[],
  params: IOptionGame,
}

export {
  IOptionGame,
  IGame,
  IError,
  IPlayerState,
  IPiece,
  IPos,
  ENUM_PIECES,
  ENUM_PIECES_MOVE,
};
