import {EnumAction, ReduxAction} from '@src/client/actions/action-creators';
import Socket = SocketIOClient.Socket;
import {ENUM_SOCKET_EVENT_SERVER} from '@src/common/socketEventServer';

const sendStartGame = (socket: Socket) => {
  socket.emit(ENUM_SOCKET_EVENT_SERVER.START_GAME, {});
};

const socketMiddleware = (store: any) => (next: any) => (action: ReduxAction) => {
  switch (action.type) {
    case EnumAction.SEND_START_GAME:
      sendStartGame(store.getState().socket);
      return next(action);
    default:
      break;
  }

  return next(action);
};

export {socketMiddleware};
