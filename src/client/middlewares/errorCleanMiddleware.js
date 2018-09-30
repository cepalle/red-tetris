import {cleanError} from "../actions/action-creators";
import {logger_middleware} from "../util/logger-handler";

const errorCleanMiddleware = store => next => action => {
  if (store.getState().error.type) {
    logger_middleware(["cleanError"]);
    next(cleanError());
  }
  return next(action);
};

export {errorCleanMiddleware};
