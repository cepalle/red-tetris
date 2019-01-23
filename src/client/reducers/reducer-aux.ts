import {IState} from '@src/client/reducers/reducer';
import {IOnSetError, IOnSetRoomesPlayersName, IOnSetRoomeState, IRefresh} from '@src/client/actions/action-creators';

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

const reducerOnSetError = (state: IState, action: IOnSetError): IState => {
  return {
    ...state,
    errorMsg: action.arg.msg,
  };
};

const reducerRefresh = (state: IState, action: IRefresh): IState => {
  return {
    ...state,
  };
};

export {
  reducerOnSetRoomState,
  reducerOnSetRoomsPlayersName,
  reducerRefresh,
  reducerOnSetError,
};
