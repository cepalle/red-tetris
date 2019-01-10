import {describe, it} from 'mocha';
import {ENUM_ROUTE, reducer} from '../../../src/client/reducers/reducer';
import {
  cbOnConnection,
  cbSetError,
  cbSetRoomsPlayersName,
  cbSetRoomState, onAll,
} from '../../../src/client/util/socket-handler';

describe('socket-handler.test.ts', () => {

  const dispatchMock = (...arg: any[]) => {
  };
  const state: any = reducer(undefined, {} as any);

  const storeMock = {
    getState: () => state,
    dispatch: dispatchMock,
  };

  it('cbSetRoomState', () => {
    cbSetRoomState(dispatchMock as any)({} as any);
  });

  it('cbSetRoomsPlayersName', () => {
    cbSetRoomsPlayersName(dispatchMock as any)({} as any);
  });

  it('cbSetError', () => {
    cbSetError(dispatchMock as any)({} as any);
  });

  it('cbOnConnection', () => {
    cbOnConnection(storeMock as any)();
    state.route = ENUM_ROUTE.TETRIS_GAME;
    cbOnConnection(storeMock as any)();
  });

  it('onAll', () => {
    onAll(storeMock as any)();
  });

  state.socket.disconnect();
});
