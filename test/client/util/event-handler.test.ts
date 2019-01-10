import {describe, it} from 'mocha';
import {ENUM_ROUTE, reducer} from '../../../src/client/reducers/reducer';
import {eventHandler} from '../../../src/client/util/event-handler';

describe('event-handler.test.ts', () => {

  const dispatchMock = (...arg: any[]) => {
  };
  const state: any = reducer(undefined, {} as any);

  const storeMock: any = {
    getState: () => state,
    dispatch: dispatchMock,
  };

  it('eventHandler', () => {
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

    state.route = ENUM_ROUTE.TETRIS_GAME;

    eventHandler(storeMock)({
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
      eventHandler(storeMock)({
        preventDefault: () => {
        },
        keyCode: k,
      });
    });

    state.route = ENUM_ROUTE.HOME;

    eventHandler(storeMock)({
      preventDefault: () => {
      },
      keyCode: 13,
    });

  });

  state.socket.disconnect();
});
