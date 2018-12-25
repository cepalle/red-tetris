import {EnumAction, ReduxAction} from '../actions/action-creators';
import {urlGetPlayerName, urlGetRoomName} from '@src/client/util/url-handler';
import {IRoomPlayersName} from '@src/common/socketEventClient';
import {IPos} from '@src/common/IType';
import {GRID_WIDTH} from '@src/common/grid';
import {IRoomState} from '@src/server/RoomManager';
import io from 'socket.io-client';
import {onAll} from '@src/client/util/socket-handler';

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
  const socket: SocketIOClient.Socket = io.connect('http://localhost:4433');

  onAll(socket);

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
    default:
      return state;
  }
};

export {
  reducer,
  EnumAction,
  IState,
};
