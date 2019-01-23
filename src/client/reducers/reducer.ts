import {EnumAction, ReduxAction} from '../actions/action-creators';
import * as io from 'socket.io-client';
import {IRoomPlayersName, IRoomStateClient} from '@src/common/socketEventClient';
import {
  reducerOnSetError,
  reducerOnSetRoomsPlayersName,
  reducerOnSetRoomState,
  reducerRefresh,
} from '@src/client/reducers/reducer-aux';

// mv socket handler ?
const SOCKET_URL = 'http://localhost:4433';

interface IState {
  readonly socket: SocketIOClient.Socket,
  readonly playerName: string | undefined,
  readonly roomName: string | undefined,

  readonly roomState: IRoomStateClient | undefined,
  readonly roomsPlayersName: IRoomPlayersName[],
  readonly errorMsg: string | undefined,
}

const initApp = (): IState => {
  const socket: SocketIOClient.Socket = io(SOCKET_URL);

  return {
    socket: socket,
    playerName: undefined,
    roomName: undefined,
    roomState: undefined,
    roomsPlayersName: [],
    errorMsg: undefined,
  };
};

const reducer = (state = initApp(), action: ReduxAction): IState => {
  switch (action.type) {
    case EnumAction.ON_SET_ROOM_STATE:
      return reducerOnSetRoomState(state, action);
    case EnumAction.ON_SET_ROOMS_PLAYERS_NAME:
      return reducerOnSetRoomsPlayersName(state, action);
    case EnumAction.ON_SET_ERROR:
      return reducerOnSetError(state, action);
    case EnumAction.REFRESH:
      return reducerRefresh(state, action);
    default:
      return state;
  }
};

export {
  reducer,
  EnumAction,
  IState,
};
