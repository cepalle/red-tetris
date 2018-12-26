import {EnumAction, ReduxAction} from '../actions/action-creators';
import {urlGetPlayerName, urlGetRoomName} from '@src/client/util/url-handler';
import io from 'socket.io-client';
import {onAll} from '@src/client/util/socket-handler';
import {IRoomPlayersName} from '@src/common/socketEventClient';
import {store} from '@src/client/middlewares/store';
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
  const socket: SocketIOClient.Socket = io.connect(SOCKET_URL);

  onAll(socket, store.dispatch);
  // send player and room name ?

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
