import {ENUM_PIECES, IPiece, IPos} from '@src/common/grid-piece-handler';
import {Socket} from 'socket.io';

interface IPlayer {
  playerName: string;
  socket: Socket;
  isSpectator: boolean;
  grid: ENUM_PIECES[][];
  score: number;
  nbLineCompleted: number;
  playing: boolean;
  win: boolean;
  lost: boolean;
  flow: IPiece[];
  posPiece: IPos;
  isMaster: boolean;
}

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
  IOptionGame,
  IRoomState,
};
