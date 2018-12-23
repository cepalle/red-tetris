import {Socket} from 'socket.io';
import {IPlayer} from '@src/server/RoomManager';
import {GRID_HEIGHT, GRID_WIDTH} from '@src/common/grid';
import {ENUM_PIECES} from '@src/common/IType';
import {genFlow} from '@src/server/flowUtils';

const factPlayer = (playerName: string, socket: Socket, master: boolean): IPlayer => {
  const grid = Array(GRID_HEIGHT).fill(0).map(() =>
    Array(GRID_WIDTH).fill(ENUM_PIECES.empty),
  );

  return {
    playerName: playerName,
    socket: socket,
    isSpectator: true,
    grid: grid,
    score: 0,
    lineCompleted: 0,
    win: false,
    lost: false,
    master: master,
    flow: genFlow(20),
  };
};

export {factPlayer};
