import {ENUM_PIECES, GRID_HEIGHT, GRID_WIDTH, initPose} from '../common/grid-piece-handler';
import {IPlayer} from '../common/ITypeRoomManager';
import {Socket} from 'socket.io';

class Player {

  static factPlayer = (playerName: string, socket: Socket, isMaster: boolean): IPlayer => {
    const grid = Array(GRID_HEIGHT).fill(0).map(() =>
      Array(GRID_WIDTH).fill(ENUM_PIECES.empty),
    );

    return {
      playerName: playerName,
      socket: socket,
      isSpectator: true,
      grid: grid,
      score: 0,
      nbLineCompleted: 0,
      playing: false,
      win: false,
      lost: false,
      isMaster: isMaster,
      flow: [],
      posPiece: initPose(),
    };
  };
}

export {
  Player,
};
