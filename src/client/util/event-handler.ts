import {Store} from 'redux';
import {SEND_MOVE_PIECE, SEND_START_GAME} from '@src/client/redux/actions/action-creators';
import {IDataState} from '@src/client/redux/reducer';
import {isPlaying} from '@src/client/redux/isPlaying';
import {ENUM_PIECES_MOVE} from '@src/common/grid-piece-handler';

const keyEnter = 13;
const keySpace = 32;
const keyLeft = 37;
const keyUp = 38;
const keyRight = 39;
const keyDown = 40;
const keyS = 83;
const keyC = 67;

const eventHandler = (store: Store<IDataState>) => (event: any) => {

  const state = store.getState();
  const dispatch = store.dispatch;

  if (!isPlaying(state)) {
    if (event.keyCode === keyEnter) {
      event.preventDefault();
      dispatch(SEND_START_GAME());
    }
    return;
  }

  switch (event.keyCode) {
    case keyLeft:
      event.preventDefault();
      dispatch(SEND_MOVE_PIECE(ENUM_PIECES_MOVE.LEFT));
      break;

    case keyUp:
      event.preventDefault();
      dispatch(SEND_MOVE_PIECE(ENUM_PIECES_MOVE.ROT_RIGHT));
      break;

    case keyRight:
      event.preventDefault();
      dispatch(SEND_MOVE_PIECE(ENUM_PIECES_MOVE.RIGHT));
      break;

    case keyDown:
      event.preventDefault();
      dispatch(SEND_MOVE_PIECE(ENUM_PIECES_MOVE.DOWN));
      break;

    case keySpace:
      event.preventDefault();
      dispatch(SEND_MOVE_PIECE(ENUM_PIECES_MOVE.DROP));
      break;

    case keyS:
      event.preventDefault();
      dispatch(SEND_MOVE_PIECE(ENUM_PIECES_MOVE.SWITCH));
      break;

    case keyC:
      event.preventDefault();
      dispatch(SEND_MOVE_PIECE(ENUM_PIECES_MOVE.SWITCH));
      break;
  }
};

export {eventHandler};
