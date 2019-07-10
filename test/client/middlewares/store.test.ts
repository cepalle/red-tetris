import {describe, it} from 'mocha';
import {store} from '../../../src/client/redux/store';
import {
  ON_SET_ERROR,
  SEND_MOVE_PIECE,
  SEND_ROOM_PLAYER_NAME,
  SEND_START_GAME,
  SEND_TOGGLE_OPTION_GAME,
} from '../../../src/client/redux/actions/action-creators';
import {ENUM_PIECES_MOVE} from '../../../src/common/grid-piece-handler';
import {EnumError} from '../../../src/common/socketEventClient';

describe('store.test.ts', () => {

  (store.getState() as any).roomName = 'roomName';

  it('SEND_MOVE_PIECE', () => {
    store.dispatch(SEND_MOVE_PIECE(ENUM_PIECES_MOVE.DROP));
  });

  it('SEND_START_GAME', () => {
    store.dispatch(SEND_START_GAME());
  });

  it('SEND_TOGGLE_OPTION_GAME', () => {
    store.dispatch(SEND_TOGGLE_OPTION_GAME({
      groundResizer: true,
      addWallLine: true,
    }));
  });

  it('SEND_ROOM_PLAYER_NAME', () => {
    store.dispatch(SEND_ROOM_PLAYER_NAME());
  });

  it('ON_SET_ERROR', () => {
      store.dispatch(ON_SET_ERROR({
        msg: '',
        error_type: EnumError.PLAYER_SAME_NAME,
      }));
  });

  store.getState().client.disconnect();
});
