import {IState} from '@src/client/reducers/reducer';
import {IOnSetRoomesPlayersName, IOnSetRoomeState, IPieceMove} from '@src/client/actions/action-creators';
import {isPlaying} from '@src/client/reducers/isPlaying';

const reducerOnSetRoomState = (state: IState, action: IOnSetRoomeState): IState => {
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

const reducerPieceMove = (state: IState, action: IPieceMove): IState => {
  if (!isPlaying(state)) {
    return state;
  }
  return state; // TODO
};

export {
  reducerOnSetRoomState,
  reducerOnSetRoomsPlayersName,
  reducerPieceMove,
};
