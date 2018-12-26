import {
  ENUM_SOCKET_EVENT_CLIENT,
  IEventSetRoomsPlayersName,
  IEventSetRoomState,
} from '@src/common/socketEventClient';
import {Dispatch} from 'redux';
import {
  ON_SET_ROOM_STATE,
  ON_SET_ROOMS_PLAYERS_NAME,
  ReduxAction,
  SEND_ROOM_PLAYER_NAME,
} from '@src/client/actions/action-creators';

// ON

const cbSetRoomState = (
  dispatch: Dispatch<ReduxAction>,
) => (
  arg: IEventSetRoomState,
) => {
  dispatch(ON_SET_ROOM_STATE(arg));
};

const cbSetRoomsPlayersName = (
  dispatch: Dispatch<ReduxAction>,
) => (
  arg: IEventSetRoomsPlayersName,
) => {
  dispatch(ON_SET_ROOMS_PLAYERS_NAME(arg));
};

const cbOnConnection = (
  dispatch: Dispatch<ReduxAction>,
) => () => {
  dispatch(SEND_ROOM_PLAYER_NAME());
};

const onAll = (socket: SocketIOClient.Socket, dispatch: Dispatch<ReduxAction>) => {
  socket.on(ENUM_SOCKET_EVENT_CLIENT.SET_ROOM_STATE, cbSetRoomState(dispatch));
  socket.on(ENUM_SOCKET_EVENT_CLIENT.SET_ROOMS_PLAYERS_NAME, cbSetRoomsPlayersName(dispatch));
  socket.on('connect', cbOnConnection(dispatch));
};

export {
  onAll,
};
