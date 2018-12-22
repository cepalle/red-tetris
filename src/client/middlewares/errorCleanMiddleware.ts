import {CLEAN_ERROR, ReducerAction} from '../actions/action-creators';
import {logger_middleware} from '../util/logger-handler';

const errorCleanMiddleware = (store: any) => (next: any) => (action: ReducerAction) => {
  if (store.getState().error.type) {
    logger_middleware(['CLEAN_ERROR']);
    next(CLEAN_ERROR());
  }
  return next(action);
};

export {errorCleanMiddleware};
