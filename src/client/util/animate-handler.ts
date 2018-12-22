import {logger} from './logger-handler';
import {Dispatch} from 'redux';
import {ENUM_PIECES_MOVE, PIECES_MOVE, ReduxAction} from '@src/client/actions/action-creators';

const animateClock = (dispatch: Dispatch<ReduxAction>, animate: boolean) => {
  if (animate) {
    dispatch(PIECES_MOVE(ENUM_PIECES_MOVE.DOWN));
  }
  logger(['animateClock']);
};

export {animateClock};
