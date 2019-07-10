import {describe, it} from 'mocha';
import {reducer} from '../../../src/client/redux/reducer';
import {keysHandler} from '../../../src/client/util/keys-handler';

describe('event-handler.test.ts', () => {

  const dispatchMock = (...arg: any[]) => {
  };
  const state: any = reducer(undefined, {} as any);

  const storeMock: any = {
    getState: () => state,
    dispatch: dispatchMock,
  };

  it('keysHandler', () => {
    const keys = [
      13,
      32,
      37,
      38,
      39,
      40,
      83,
      67,
    ];

    keysHandler(storeMock)({
      preventDefault: () => {
      },
      keyCode: 13,
    });

    state.playerName = 'playerName';
    state.roomState = {
      players: [{
        playerName: 'playerName',
        playing: true,
      }],
    };

    keys.forEach((k) => {
      keysHandler(storeMock)({
        preventDefault: () => {
        },
        keyCode: k,
      });
    });

    keysHandler(storeMock)({
      preventDefault: () => {
      },
      keyCode: 13,
    });

  });

  state.client.disconnect();
});
