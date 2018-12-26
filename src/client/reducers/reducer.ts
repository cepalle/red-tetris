import {EnumAction, ReduxAction} from '../actions/action-creators';
import {urlGetPlayerName, urlGetRoomName} from '@src/client/util/url-handler';
import * as io from 'socket.io-client';
import {IRoomPlayersName} from '@src/common/socketEventClient';
import {
  reducerOnSetRoomsPlayersName,
  reducerOnSetRoomState,
} from '@src/client/reducers/reducer-aux';
import {IRoomState} from '@src/common/ITypeRoomManager';

// mv socket handler ?
const SOCKET_URL = 'http://localhost:4433';

interface IState {
  readonly socket: SocketIOClient.Socket,
  readonly roomState: IRoomState | undefined,
  readonly playerName: string | undefined,
  readonly roomName: string | undefined,
  readonly roomsPlayersName: IRoomPlayersName[],
}

const initApp = (): IState => {
  const socket: SocketIOClient.Socket = io(SOCKET_URL);

  return {
    socket: socket,
    roomState: undefined,
    playerName: urlGetPlayerName(),
    roomName: urlGetRoomName(),
    roomsPlayersName: [],
  };
};

const reducer = (state = initApp(), action: ReduxAction): IState => {
  switch (action.type) {
    case EnumAction.ON_SET_ROOM_STATE:
      return reducerOnSetRoomState(state, action);
    case EnumAction.ON_SET_ROOMS_PLAYERS_NAME:
      return reducerOnSetRoomsPlayersName(state, action);
    default:
      return state;
  }
};

export {
  reducer,
  EnumAction,
  IState,
};
