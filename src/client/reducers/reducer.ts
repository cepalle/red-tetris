import {EnumAction, ReduxAction} from '../actions/action-creators';
import {urlGetRoomPlayerName} from '@src/client/util/url-handler';
import * as io from 'socket.io-client';
import {IRoomPlayersName, IRoomStateClient} from '@src/common/socketEventClient';
import {reducerOnSetRoomsPlayersName, reducerOnSetRoomState, reducerRefresh} from '@src/client/reducers/reducer-aux';

// mv socket handler ?
const SOCKET_URL = 'http://localhost:4433';

enum ENUM_ROUTE {
  HOME,
  TETRIS_GAME,
}

interface IState {
  readonly socket: SocketIOClient.Socket,
  readonly playerName: string | undefined,
  readonly roomName: string | undefined,
  readonly route: ENUM_ROUTE,

  readonly roomState: IRoomStateClient | undefined,
  readonly roomsPlayersName: IRoomPlayersName[],
}

const initApp = (): IState => {
  const socket: SocketIOClient.Socket = io(SOCKET_URL);
  const {playerName, roomName} = urlGetRoomPlayerName();

  const route = (playerName !== undefined && roomName !== undefined) ? ENUM_ROUTE.TETRIS_GAME : ENUM_ROUTE.HOME;

  return {
    socket: socket,
    playerName: playerName,
    roomName: roomName,
    route: route,
    roomState: undefined,
    roomsPlayersName: [],
  };
};

const reducer = (state = initApp(), action: ReduxAction): IState => {
  switch (action.type) {
    case EnumAction.ON_SET_ROOM_STATE:
      return reducerOnSetRoomState(state, action);
    case EnumAction.ON_SET_ROOMS_PLAYERS_NAME:
      return reducerOnSetRoomsPlayersName(state, action);
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
  ENUM_ROUTE,
};
