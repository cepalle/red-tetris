const errorCleanMiddleware = store => next => action => {

  const state = store.getState();
  state.error = {};
  return next(action);
};

export {errorCleanMiddleware};
