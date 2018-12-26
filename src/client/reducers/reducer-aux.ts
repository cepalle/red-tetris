import {IState} from '@src/client/reducers/reducer';
import {IOnSetRoomesPlayersName, IOnSetRoomeState, IPieceMove, IPieceSwitch} from '@src/client/actions/action-creators';
import {isPlaying} from '@src/client/reducers/isPlaying';
import {updatePiecePos} from '@src/common/grid-piece-handler';

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

const reducerPieceMove = (state: IState, action: IPieceMove): IState => {
  if (!isPlaying(state)) {
    return state;
  }

  const room = state.roomState;
  if (room === undefined) {
    return state;
  }

  const player = room.players.find((p) => p.playerName === state.playerName);
  if (player === undefined) {
    return state;
  }
  if (player.flow.length === 0) {
    return state;
  }

  const {move} = action;

  const {pos, piecePlaced} = updatePiecePos(player.grid, state.posPiece, player.flow[0], move);

  return state; // TODO
};

export {
  reducerOnSetRoomState,
  reducerOnSetRoomsPlayersName,
  reducerPieceMove,
};
