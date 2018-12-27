import {EnumAction, ReduxAction} from '@src/client/actions/action-creators';
import {
  ENUM_SOCKET_EVENT_SERVER,
  IEventMovePiece,
  IEventSetGameOption,
  IEventSubRoomState,
  IEventStartGame,
} from '@src/common/socketEventServer';
import {isPlaying} from '@src/client/reducers/isPlaying';

const sendStartGame = (socket: SocketIOClient.Socket, arg: IEventStartGame): void => {
  socket.emit(ENUM_SOCKET_EVENT_SERVER.START_GAME, arg);
};

const sendUpdateOptionGame = (socket: SocketIOClient.Socket, arg: IEventSetGameOption): void => {
  socket.emit(ENUM_SOCKET_EVENT_SERVER.START_GAME, arg);
};

const sendMovePiece = (socket: SocketIOClient.Socket, arg: IEventMovePiece) => {
  socket.emit(ENUM_SOCKET_EVENT_SERVER.MOVE_PIECE, arg);
};

const sendRoomPlayerName = (socket: SocketIOClient.Socket, arg: IEventSubRoomState) => {
  socket.emit(ENUM_SOCKET_EVENT_SERVER.SUB_ROOM_STATE, arg);
};

const socketMiddleware = (store: any) => (next: any) => (action: ReduxAction) => {

  const state = store.getState();

  switch (action.type) {
    case EnumAction.SEND_ROOM_PLAYER_NAME:
      if (state.socket !== undefined && state.roomName !== undefined) {
        sendRoomPlayerName(state.socket, {
          roomName: state.roomName,
          playerName: state.playerNames,
        });
      }
      break;
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
    case EnumAction.SEND_MOVE_PIECE:
      if (state.socket !== undefined && state.roomName !== undefined && isPlaying(state)) {
        sendMovePiece(state.socket, {
          roomName: state.roomName,
          move: action.move,
        });
      }
      break;
    default:
      break;
  }

  return next(action);
};

export {socketMiddleware};
