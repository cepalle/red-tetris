import {IState} from '@src/client/reducers/reducer';
import {IOnSetRoomesPlayersName, IOnSetRoomeState} from '@src/client/actions/action-creators';

const reducerOnSetRoomState = (state: IState, action: IOnSetRoomeState): IState => {
  // check collision piece
  return {
    ...state,
    roomState: action.arg.room,
  };
};

const reducerOnSetRoomsPlayersName = (state: IState, action: IOnSetRoomesPlayersName): IState => {
  return {
    ...state,
    roomsPlayersName: action.arg.roomsPlayersName,
  };
};

export {
  reducerOnSetRoomState,
  reducerOnSetRoomsPlayersName,
};
