import {logger_reducer} from "../logger";
import {initialState, initPlayerState} from "./initial-state";
import {isInUsers, isInPlayerStates} from "../utils";

const reducerPartsFlow = (state, data) => {
  logger_reducer(["partsFlow", data]);
  return Object.assign({}, state, {partsFlow: state.partsFlow.concat(data)});
};

const reducerError = (state, data) => {
  logger_reducer(["error", data]);
  return Object.assign({}, state, {error: Object.assign({}, data)});
};

const reducerUpdateUsers = (state, users) => {
  logger_reducer(["updateUsers", users]);

  let filterNotInUsers = state.playerStates.filter(el => isInUsers(users, el.playerName));
  for (let i = 0; i < users.length; i++) {
    if (!isInPlayerStates(filterNotInUsers, users[i].username)) {
      filterNotInUsers.push(initPlayerState(users[i].username))
    }
  }
  return Object.assign({}, state, {playerStates: filterNotInUsers});
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_PARTS_FLOW':
      return reducerPartsFlow(state, action.data);
    case 'ADD_ERROR':
      return reducerError(state, action.data);
    case 'UPDATE_USERS':
      return reducerUpdateUsers(state, action.data);
    default:
      return state;
  }
};

export {reducer};
