import {
  ENUM_SOCKET_EVENT_CLIENT,
  IEventClientSetError,
  IEventClientSetRoomsPlayersName,
  IEventClientSetRoomState,
} from '@src/common/socketEventClient';
import {Dispatch, Store} from 'redux';
import {
  ON_SET_ERROR,
  ON_SET_ROOM_STATE,
  ON_SET_ROOMS_PLAYERS_NAME,
  ReduxAction,
} from '@src/client/redux/actions/action-creators';
import {IDataState} from '@src/client/redux/reducer';

// ON

const cbSetRoomState = (
  dispatch: Dispatch<ReduxAction>,
) => (
  arg: IEventClientSetRoomState,
) => {
  // console.log(ENUM_SOCKET_EVENT_CLIENT.SET_ROOM_STATE, arg);

  dispatch(ON_SET_ROOM_STATE(arg));
};

const cbSetRoomsPlayersName = (
  dispatch: Dispatch<ReduxAction>,
) => (
  arg: IEventClientSetRoomsPlayersName,
) => {
  // console.log(ENUM_SOCKET_EVENT_CLIENT.SET_ROOMS_PLAYERS_NAME, arg);

  dispatch(ON_SET_ROOMS_PLAYERS_NAME(arg));
};

const cbSetError = (
  dispatch: Dispatch<ReduxAction>,
) => (
  arg: IEventClientSetError,
) => {
  // console.log(ENUM_SOCKET_EVENT_CLIENT.SET_ROOMS_PLAYERS_NAME, arg);

  dispatch(ON_SET_ERROR(arg));
};

const cbOnConnection = () => {
  window.location.href = `/#/home`;
};

const onAll = (store: Store<IDataState>) => () => {

  const socket = store.getState().socket;
  const dispatch = store.dispatch;

  socket.on('connect', cbOnConnection);

  socket.on(ENUM_SOCKET_EVENT_CLIENT.SET_ROOM_STATE, cbSetRoomState(dispatch));
  socket.on(ENUM_SOCKET_EVENT_CLIENT.SET_ROOMS_PLAYERS_NAME, cbSetRoomsPlayersName(dispatch));
  socket.on(ENUM_SOCKET_EVENT_CLIENT.SET_ERROR, cbSetError(dispatch));
};

export {
  onAll,
  cbSetRoomState,
  cbOnConnection,
  cbSetError,
  cbSetRoomsPlayersName,
};
