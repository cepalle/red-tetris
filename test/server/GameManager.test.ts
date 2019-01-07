import {describe} from 'mocha';
import {GamesManager} from '../../src/server/GamesManager';
import {ADD_PLAYER, DEL_PLAYER} from '../../src/server/Game';

describe('GameManager.test.ts', () => {
  const gameManager = new GamesManager();
  const socket: any = {
    emit: (...arg: any[]) => {
      // console.log('emit: ', arg);
    },
    id: '123',
  };

  it('', () => {
    gameManager.dispatch({
      roomName: 'room1',
      actionRoom: ADD_PLAYER('playerName', socket),
    });

    gameManager.dispatch({
      socketId: socket.id,
      actionRoom: DEL_PLAYER(socket.id),
    });

  });

});
