import {animate} from "../util/animate-handler"

const animateMiddleware = store => next => action => {

  const result = next(action);
  const state = store.getState();

  if (state.SetAnimateTrue) {
    state.SetAnimateTrue = false;
    animate.value = true;
  }

  if (state.SetAnimateFalse) {
    state.SetAnimateFalse= false;
    animate.value = false;
  }

  return result;
};

export {animateMiddleware};
