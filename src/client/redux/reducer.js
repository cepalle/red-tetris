import {logger_reducer} from "../logger";
import {initialState} from "./initial-state";

const reducerPartsFlow = (state, data) => {
  logger_reducer(["partsFlow", data]);
  return Object.assign({}, state, {partsFlow: state.partsFlow.concat(data)});
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_PARTS_FLOW':
      return reducerPartsFlow(state, action.data);
    default:
      return state;
  }
};

export {reducer};
