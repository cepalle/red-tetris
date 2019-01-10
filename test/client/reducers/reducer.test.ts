import {describe, it} from 'mocha';
import {reducer} from '../../../src/client/reducers/reducer';
import {
  ON_SET_ERROR,
  ON_SET_ROOM_STATE,
  ON_SET_ROOMS_PLAYERS_NAME,
  REFRESH,
} from '../../../src/client/actions/action-creators';
import {EnumError} from '../../../src/common/socketEventClient';

describe('action-creators.test.ts', () => {

  const state = reducer(undefined, {} as any);

  it('ON_SET_ERROR', () => {
    reducer(state, ON_SET_ERROR({
      error_type: EnumError.PLAYER_SAME_NAME,
      msg: 'msg',
    }));
  });

  it('ON_SET_ROOM_STATE', () => {
    reducer(state, ON_SET_ROOM_STATE({
      room: {
        roomName: 'roomname',
        playing: true,
        players: [],
        optionGame: {
          addWallLine: true,
          groundResizer: true,
        },
      },
    }));
  });

  it('ON_SET_ROOMS_PLAYERS_NAME', () => {
    reducer(state, ON_SET_ROOMS_PLAYERS_NAME({
      roomsPlayersName: [],
    }));
  });

  it('REFRESH', () => {
    reducer(state, REFRESH(false));
  });

  state.socket.disconnect();
});
