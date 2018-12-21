import {CLEAN_ERROR} from "../actions/action-creators";
import {logger_middleware} from "../util/logger-handler";

const errorCleanMiddleware = store => next => action => {
  if (store.getState().error.type) {
    logger_middleware(["CLEAN_ERROR"]);
    next(CLEAN_ERROR());
  }
  return next(action);
};

export {errorCleanMiddleware};
