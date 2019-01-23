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
} from '@src/client/actions/action-creators';
import {IState} from '@src/client/reducers/reducer';

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

const cbOnConnection = (
  store: Store<IState>,
) => () => {
  window.location.href = `/#/home`;

  /*
  const state = store.getState();

  if (state.route === ENUM_ROUTE.HOME) {
    const sendSubRoomsPlayersName = (socket: SocketIOClient.Socket, arg: IEventServerSubRoomsPlayersName) => {
      socket.emit(ENUM_SOCKET_EVENT_SERVER.SUB_ROOMS_PLAYERS_NAME, arg);
    };

    sendSubRoomsPlayersName(state.socket, {});
  }

  if (state.route === ENUM_ROUTE.TETRIS_GAME) {
    const sendSubRoomState = (socket: SocketIOClient.Socket, arg: IEventServerSubRoomState) => {
      socket.emit(ENUM_SOCKET_EVENT_SERVER.JOIN_ROOM, arg);
    };

    if (state.roomName !== undefined && state.playerName !== undefined) {
      sendSubRoomState(state.socket, {
        playerName: state.playerName,
        roomName: state.roomName,
      });
    }
  }
  */
};

const onAll = (store: Store<IState>) => () => {

  const socket = store.getState().socket;
  const dispatch = store.dispatch;

  socket.on('connect', cbOnConnection(store));

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
