import {EnumAction, ReduxAction} from '../actions/action-creators';
import {IRoomState} from '@src/server/RoomManager';
import {urlGetPlayerName, urlGetRoomName} from '@src/client/util/url-handler';
import {IRoomPlayersName} from '@src/common/socketEventClient';

interface IState {
  readonly roomState: IRoomState | undefined,
  readonly playerName: string | undefined,
  readonly roomName: string | undefined,
  readonly roomsPlayersName: IRoomPlayersName[],
}

const initialState: IState = {
  roomState: undefined,
  playerName: urlGetPlayerName(),
  roomName: urlGetRoomName(),
  roomsPlayersName: [],
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
