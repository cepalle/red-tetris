import {ENUM_ROUTE, IState} from '@src/client/reducers/reducer';
import {IOnSetError, IOnSetRoomesPlayersName, IOnSetRoomeState, IRefresh} from '@src/client/actions/action-creators';
import {urlGetRoomPlayerName} from '@src/client/util/url-handler';

const reducerOnSetRoomState = (state: IState, action: IOnSetRoomeState): IState => {
  return {
    ...state,
    roomState: action.arg.room,
  };
};

const reducerOnSetRoomsPlayersName = (state: IState, action: IOnSetRoomesPlayersName): IState => {
  return {
    ...state,
    roomsPlayersName: action.arg.roomsPlayersName,
  };
};

const reducerOnSetError = (state: IState, action: IOnSetError): IState => {
  return {
    ...state,
    route: ENUM_ROUTE.HOME,
    errorMsg: action.arg.msg,
  };
};

const reducerRefresh = (state: IState, action: IRefresh): IState => {
  if (action.socketReconnect) {
    state.socket.disconnect();
  }
  const {playerName, roomName} = urlGetRoomPlayerName();
  const route = (playerName !== undefined && roomName !== undefined) ? ENUM_ROUTE.TETRIS_GAME : ENUM_ROUTE.HOME;
  if (action.socketReconnect) {
    state.socket.connect();
  }

  return {
    ...state,
    playerName: playerName,
    roomName: roomName,
    route: route,
  };
};

export {
  reducerOnSetRoomState,
  reducerOnSetRoomsPlayersName,
  reducerRefresh,
  reducerOnSetError,
};
