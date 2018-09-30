import {cleanError} from "../actions/action-creators";

const errorCleanMiddleware = store => next => action => {
  if (store.getState().error.type) {
    next(cleanError());
  }
  return next(action);
};

export {errorCleanMiddleware};
