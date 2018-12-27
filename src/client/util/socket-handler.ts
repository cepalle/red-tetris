import {ENUM_SOCKET_EVENT_CLIENT, IEventSetRoomsPlayersName, IEventSetRoomState} from '@src/common/socketEventClient';
import {Dispatch, Store} from 'redux';
import {ON_SET_ROOM_STATE, ON_SET_ROOMS_PLAYERS_NAME, ReduxAction, REFRESH} from '@src/client/actions/action-creators';
import {ENUM_ROUTE, IState} from '@src/client/reducers/reducer';
import {ENUM_SOCKET_EVENT_SERVER, IEventSubRoomsPlayersName, IEventSubRoomState} from '@src/common/socketEventServer';

// ON

const cbSetRoomState = (
  dispatch: Dispatch<ReduxAction>,
) => (
  arg: IEventSetRoomState,
) => {
  console.log(ENUM_SOCKET_EVENT_CLIENT.SET_ROOM_STATE, arg);

  dispatch(ON_SET_ROOM_STATE(arg));
};

const cbSetRoomsPlayersName = (
  dispatch: Dispatch<ReduxAction>,
) => (
  arg: IEventSetRoomsPlayersName,
) => {
  console.log(ENUM_SOCKET_EVENT_CLIENT.SET_ROOMS_PLAYERS_NAME, arg);

  dispatch(ON_SET_ROOMS_PLAYERS_NAME(arg));
};

const cbOnConnection = (
  store: Store<IState>,
) => () => {
  const state = store.getState();

  if (state.route === ENUM_ROUTE.HOME) {
    const sendSubRoomsPlayersName = (socket: SocketIOClient.Socket, arg: IEventSubRoomsPlayersName) => {
      socket.emit(ENUM_SOCKET_EVENT_SERVER.SUB_ROOMS_PLAYERS_NAME, arg);
    };

    sendSubRoomsPlayersName(state.socket, {});
  }

  if (state.route === ENUM_ROUTE.TETRIS_GAME) {
    const sendSubRoomState = (socket: SocketIOClient.Socket, arg: IEventSubRoomState) => {
      socket.emit(ENUM_SOCKET_EVENT_SERVER.SUB_ROOM_STATE, arg);
    };

    if (state.roomName !== undefined && state.playerName !== undefined) {
      sendSubRoomState(state.socket, {
        playerName: state.playerName,
        roomName: state.roomName,
      });
    }
  }

  store.dispatch(REFRESH());
};

const onAll = (store: Store<IState>) => () => {

  const socket = store.getState().socket;
  const dispatch = store.dispatch;

  socket.on('connect', cbOnConnection(store));

  socket.on(ENUM_SOCKET_EVENT_CLIENT.SET_ROOM_STATE, cbSetRoomState(dispatch));
  socket.on(ENUM_SOCKET_EVENT_CLIENT.SET_ROOMS_PLAYERS_NAME, cbSetRoomsPlayersName(dispatch));
};

export {
  onAll,
};
