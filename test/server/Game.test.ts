import {describe, it} from 'mocha';
import {ADD_PLAYER, DEL_PLAYER, Game, MOVE_PIECE, START_GAME, UPDATE_OPTION_GAME} from '../../src/server/Game';
import {ENUM_PIECES_MOVE} from '../../src/common/grid-piece-handler';

describe('Game.test.ts', () => {

  const game = new Game('roomName');
  const socket: any = {
    emit: (...arg: any[]) => {
      // console.log('emit: ', arg);
    },
    id: '123',
  };

  it('ADD_PLAYER', () => {
    game.dispatch(ADD_PLAYER('playerName', socket));
    game.dispatch(ADD_PLAYER('playerName2', {
      ...socket,
      id: '234',
    }));
  });

  it('UPDATE_OPTION_GAME', () => {
    game.dispatch(UPDATE_OPTION_GAME({groundResizer: true, addWallLine: false}));
  });

  it('START_GAME', () => {
    game.dispatch(START_GAME());
    game.dispatch(ADD_PLAYER('playerName3', {
      ...socket,
      id: '345',
    }));
    game.dispatch(ADD_PLAYER('playerName3', {
      ...socket,
      id: '345',
    }));
  });

  it('MOVE_PIECE', () => {
    game.dispatch(MOVE_PIECE(socket.id, ENUM_PIECES_MOVE.DOWN));
    game.dispatch(MOVE_PIECE(socket.id, ENUM_PIECES_MOVE.RIGHT));
    game.dispatch(MOVE_PIECE(socket.id, ENUM_PIECES_MOVE.ROT_LEFT));
    game.dispatch(MOVE_PIECE(socket.id, ENUM_PIECES_MOVE.ROT_RIGHT));
    game.dispatch(MOVE_PIECE(socket.id, ENUM_PIECES_MOVE.LEFT));
    game.dispatch(MOVE_PIECE(socket.id, ENUM_PIECES_MOVE.SWITCH));
    game.dispatch(MOVE_PIECE(socket.id, ENUM_PIECES_MOVE.DROP));
  });

  it('DEL_PLAYER', () => {
    game.dispatch(DEL_PLAYER(socket.id));
    game.dispatch(DEL_PLAYER('234'));
    game.dispatch(DEL_PLAYER('345'));
  });

  it('game', () => {
    game.nbPlayer();
    game.hasSocketId(socket.id);
  });

  game.unsubscribe();
});
