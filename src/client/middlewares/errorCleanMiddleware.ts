import {CLEAN_ERROR, ReduxAction} from '../actions/action-creators';
import {loggerMiddleware} from '../util/logger-handler';

const errorCleanMiddleware = (store: any) => (next: any) => (action: ReduxAction) => {
  if (store.getState().error.type) {
    loggerMiddleware(['CLEAN_ERROR']);
    next(CLEAN_ERROR());
  }
  return next(action);
};

export {errorCleanMiddleware};
