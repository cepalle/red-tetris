import {EnumAction, ReduxAction} from '../actions/action-creators';
import {IRoomState} from '@src/server/RoomManager';
import {urlGetPlayerName, urlGetRoomName} from '@src/client/util/url-handler';
import {IRoomPlayersName} from '@src/common/socketEventClient';
import {IPos} from '@src/common/IType';
import {GRID_WIDTH} from '@src/common/grid';

interface IState {
  readonly roomState: IRoomState | undefined,
  readonly playerName: string | undefined,
  readonly roomName: string | undefined,
  readonly roomsPlayersName: IRoomPlayersName[],
  readonly posPiece: IPos,
}

const initialState: IState = {
  roomState: undefined,
  playerName: urlGetPlayerName(),
  roomName: urlGetRoomName(),
  roomsPlayersName: [],
  posPiece: {x: Math.floor(GRID_WIDTH / 2), y: 0},
};

const reducer = (state = initialState, action: ReduxAction): IState => {
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
