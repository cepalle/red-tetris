import {describe, it} from 'mocha';
import {reducer} from '../../../src/client/redux/reducer';
import {
  cbSetError,
  cbSetRoomsPlayersName,
  cbSetRoomState, onAll,
} from '../../../src/client/socket-handler';

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

  it('onAll', () => {
    onAll(storeMock as any)();
  });

  state.client.disconnect();
});
