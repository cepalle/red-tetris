import {ENUM_PIECES, GRID_HEIGHT, GRID_WIDTH, initPiece, IPiece, IPos} from '@src/common/grid-piece-handler';
import {genFlow} from '@src/common/flowUtils';

interface IPlayer {
  playerName: string;
  socketId: string;
  isSpectator: boolean;
  grid: ENUM_PIECES[][];
  score: number;
  nbLineCompleted: number;
  playing: boolean;
  win: boolean;
  lost: boolean;
  flow: IPiece[];
  posPiece: IPos;
}

const factPlayer = (playerName: string, socketId: string): IPlayer => {
  const grid = Array(GRID_HEIGHT).fill(0).map(() =>
    Array(GRID_WIDTH).fill(ENUM_PIECES.empty),
  );

  return {
    playerName: playerName,
    socketId: socketId,
    isSpectator: true,
    grid: grid,
    score: 0,
    nbLineCompleted: 0,
    playing: false,
    win: false,
    lost: false,
    flow: genFlow(20),
    posPiece: initPiece(),
  };
};

interface IOptionGame {
  readonly addWallLine: boolean,
  readonly groundResizer: boolean,
}

interface IRoomState {
  roomName: string;
  playing: boolean;
  players: IPlayer[];
  optionGame: IOptionGame;
}

export {
  IPlayer,
  factPlayer,
  IOptionGame,
  IRoomState,
};
