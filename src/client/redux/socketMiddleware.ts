import { EnumAction, ReduxAction } from './actions/action-creators';
import {
  ENUM_SOCKET_EVENT_SERVER,
  IEventServerMovePiece,
  IEventServerSetGameOption,
  IEventServerJoinRoom,
  IEventServerStartGame, IEventServerSubRoomsPlayersName, IEventServerQuitRoom, IEventServerUnSubRoomsPlayersName,
} from '../../common/socketEventServer';
import { IDataState } from "@src/client/redux/reducer";

const isPlaying = (state: IDataState): boolean => {
  if (state.playerName === undefined || state.roomState === undefined) {
    return false;
  }

  const player = state.roomState.players.find((p) => p.playerName === state.playerName);
  if (player === undefined) {
    return false;
  }

  return player.playing;
};

const sendJoinRoom = (socket: SocketIOClient.Socket, arg: IEventServerJoinRoom) => {
  socket.emit(ENUM_SOCKET_EVENT_SERVER.JOIN_ROOM, arg);
};

const sendQuitRoom = (socket: SocketIOClient.Socket, arg: IEventServerQuitRoom) => {
  socket.emit(ENUM_SOCKET_EVENT_SERVER.QUIT_ROOM, arg);
};

const sendSubRoomsPlayersName = (socket: SocketIOClient.Socket, arg: IEventServerSubRoomsPlayersName) => {
  socket.emit(ENUM_SOCKET_EVENT_SERVER.SUB_ROOMS_PLAYERS_NAME, arg);
};

const sendUnSubRoomsPlayersName = (socket: SocketIOClient.Socket, arg: IEventServerUnSubRoomsPlayersName) => {
  socket.emit(ENUM_SOCKET_EVENT_SERVER.UN_SUB_ROOMS_PLAYERS_NAME, arg);
};

const sendStartGame = (socket: SocketIOClient.Socket, arg: IEventServerStartGame): void => {
  socket.emit(ENUM_SOCKET_EVENT_SERVER.START_GAME, arg);
};

const sendUpdateOptionGame = (socket: SocketIOClient.Socket, arg: IEventServerSetGameOption): void => {
  socket.emit(ENUM_SOCKET_EVENT_SERVER.SET_GAME_OPTION, arg);
};

const sendMovePiece = (socket: SocketIOClient.Socket, arg: IEventServerMovePiece) => {
  socket.emit(ENUM_SOCKET_EVENT_SERVER.MOVE_PIECE, arg);
};

const sendRoomPlayerName = (socket: SocketIOClient.Socket, arg: IEventServerJoinRoom) => {
  socket.emit(ENUM_SOCKET_EVENT_SERVER.JOIN_ROOM, arg);
};

const socketMiddleware = (store: any) => (next: any) => (action: ReduxAction) => {

  const state: IDataState = store.getState();

  switch (action.type) {
    case EnumAction.SEND_ROOM_PLAYER_NAME:
      if (state.socket !== undefined
        && state.roomName !== undefined
        && state.playerName !== undefined
      ) {
        sendRoomPlayerName(state.socket, {
          roomName: state.roomName,
          playerName: state.playerName,
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
    case EnumAction.SEND_TOGGLE_OPTION_GAME:
      if (state.socket !== undefined
        && state.roomName !== undefined
        && state.roomState !== undefined
      ) {
        sendUpdateOptionGame(state.socket, {
          roomName: state.roomName,
          optionGame: {
            ...state.roomState.optionGame,
            ...(action.toToggle === 'addWallLine' ?
                { addWallLine: !state.roomState.optionGame.addWallLine } :
                { groundResizer: !state.roomState.optionGame.groundResizer }
            ),
          },
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
    case EnumAction.SEND_JOIN_ROOM:
      if (state.socket !== undefined) {
        sendJoinRoom(state.socket, {
          playerName: action.playerName,
          roomName: action.roomName,
        });
      }
      break;
    case EnumAction.SEND_QUIT_ROOM:
      if (state.socket !== undefined
        && state.roomName !== undefined
        && state.playerName !== undefined
      ) {
        sendQuitRoom(state.socket, {
          playerName: state.playerName,
          roomName: state.roomName,
        });
      }
      break;
    case EnumAction.SEND_SUB_ROOMS_PLAYERS_NAME:
      if (state.socket !== undefined) {
        sendSubRoomsPlayersName(state.socket, {});
      }
      break;
    case EnumAction.SEND_UN_SUB_ROOMS_PLAYERS_NAME:
      if (state.socket !== undefined) {
        sendUnSubRoomsPlayersName(state.socket, {});
      }
      break;
    default:
      break;
  }

  return next(action);
};

export { socketMiddleware };
