import {EnumAction, ReduxAction} from '@src/client/actions/action-creators';
import {ENUM_SOCKET_EVENT_SERVER, IEventSetGameOption, IEventStartGame} from '@src/common/socketEventServer';

const sendStartGame = (socket: SocketIOClient.Socket, arg: IEventStartGame): void => {
  socket.emit(ENUM_SOCKET_EVENT_SERVER.START_GAME, arg);
};

const sendUpdateOptionGame = (socket: SocketIOClient.Socket, arg: IEventSetGameOption): void => {
  socket.emit(ENUM_SOCKET_EVENT_SERVER.START_GAME, arg);
};

const socketMiddleware = (store: any) => (next: any) => (action: ReduxAction) => {

  const state = store.getState();

  switch (action.type) {
    case EnumAction.SEND_START_GAME:
      if (state.socket !== undefined && state.roomName !== undefined) {
        sendStartGame(state.socket, {
          roomName: state.roomName,
        });
      }
      break;
    case EnumAction.SEND_UPDATE_OPTION_GAME:
      if (state.socket !== undefined && state.roomName !== undefined) {
        sendUpdateOptionGame(state.socket, {
          roomName: state.roomName,
          optionGame: action.optionGame,
        });
      }
      break;
    default:
      break;
  }

  return next(action);
};

export {socketMiddleware};
