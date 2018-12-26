import {EnumAction, ReduxAction} from '../actions/action-creators';
import {urlGetPlayerName, urlGetRoomName} from '@src/client/util/url-handler';
import {IPos} from '@src/common/IType';
import {GRID_WIDTH} from '@src/common/grid';
import {IRoomState} from '@src/server/RoomManager';
import io from 'socket.io-client';
import {onAll} from '@src/client/util/socket-handler';
import {IRoomPlayersName} from '@src/common/socketEventClient';
import {store} from '@src/client/middlewares/store';
import {reducerOnSetRoomsPlayersName, reducerOnSetRoomState, reducerPieceMove} from '@src/client/reducers/reducer-aux';

const SOCKET_URL = 'http://localhost:4433';

interface IState {
  readonly socket: SocketIOClient.Socket,
  readonly roomState: IRoomState | undefined,
  readonly playerName: string | undefined,
  readonly roomName: string | undefined,
  readonly roomsPlayersName: IRoomPlayersName[],
  readonly posPiece: IPos,
}

// socket in State
const initApp = (): IState => {
  const socket: SocketIOClient.Socket = io.connect(SOCKET_URL);

  onAll(socket, store.dispatch);

  return {
    socket: socket,
    roomState: undefined,
    playerName: urlGetPlayerName(),
    roomName: urlGetRoomName(),
    roomsPlayersName: [],
    posPiece: {x: Math.floor(GRID_WIDTH / 2), y: 0},
  };
};

const reducer = (state = initApp(), action: ReduxAction): IState => {
  switch (action.type) {
    case EnumAction.ON_SET_ROOM_STATE:
      return reducerOnSetRoomState(state, action);
    case EnumAction.ON_SET_ROOMS_PLAYERS_NAME:
      return reducerOnSetRoomsPlayersName(state, action);
    case EnumAction.PIECE_MOVE:
      return reducerPieceMove(state, action);
    default:
      return state;
  }
};

export {
  reducer,
  EnumAction,
  IState,
};
