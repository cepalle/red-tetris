import {ENUM_PIECES_MOVE, PIECES_MOVE, ReduxAction, SEND_START_GAME} from '../actions/action-creators';
import {Dispatch} from 'redux';

const keyEnter = 13;
const keySpace = 32;
const keyLeft = 37;
const keyUp = 38;
const keyRight = 39;
const keyDown = 40;
const keyS = 83;
const keyC = 67;

const eventHandler = (event: any, isInGame: boolean, dispatch: Dispatch<ReduxAction>) => {

  if (isInGame) {
    return;
  }

  switch (event.keyCode) {
    case keyLeft:
      event.preventDefault();
      dispatch(PIECES_MOVE(ENUM_PIECES_MOVE.LEFT));
      break;

    case keyUp:
      event.preventDefault();
      dispatch(PIECES_MOVE(ENUM_PIECES_MOVE.ROT_RIGHT));
      break;

    case keyRight:
      event.preventDefault();
      dispatch(PIECES_MOVE(ENUM_PIECES_MOVE.RIGHT));
      break;

    case keyDown:
      event.preventDefault();
      dispatch(PIECES_MOVE(ENUM_PIECES_MOVE.DOWN));
      break;

    case keySpace:
      event.preventDefault();
      dispatch(PIECES_MOVE(ENUM_PIECES_MOVE.DROP));
      break;

    case keyEnter:
      event.preventDefault();
      dispatch(SEND_START_GAME());
      break;

    case keyS:
      event.preventDefault();
      dispatch(PIECES_MOVE(ENUM_PIECES_MOVE.SWITCH));
      break;

    case keyC:
      event.preventDefault();
      dispatch(PIECES_MOVE(ENUM_PIECES_MOVE.SWITCH));
      break;
  }
};

export {eventHandler};
